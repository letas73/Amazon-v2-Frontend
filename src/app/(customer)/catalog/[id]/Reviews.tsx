'use client'
import { IReviewWithUser } from '@/services/reviews/reviews.interface'
import { FC, useState } from 'react'
import styles from './page.module.scss'
import ReviewsItem from '@/components/reviews-item/ReviewsItem'
import AddReviewModal from '@/components/ui/add-review-modal/AddReviewModal'
import { useAuth } from '@/hooks/useAuth'

interface IProps {
  reviews: IReviewWithUser[]
}

const Reviews: FC<IProps> = ({ reviews }) => {
  const isAuth = useAuth()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleClickCloseModal = () => {
    setOpenModal(false)
  }

  return <div className={styles.reviews}>
    <h2 className={styles.reviewsTitle}>
      Reviews:
    </h2>
    {
      isAuth && (
        <button onClick={handleClickOpenModal} className={styles.reviewsLink}>
          Leave a review
        </button>
      )
    }
    <ul className={styles.reviewsList}>
      {
        reviews.length ? reviews.map((item) => (
          <ReviewsItem key={item.id} item={item} />
        )) : (
          <div className='font-bold text-[20px] text-center w-full'>
            This product has no reviews. Become the first
          </div>
        )
      }
    </ul>
    <div className={`${styles.modal} ${openModal && styles.active}`}>
      <div className={`${styles.modalOverlay} ${openModal && styles.active}`}>
      </div>
      <AddReviewModal open={openModal} onClose={handleClickCloseModal} />
    </div>
  </div>
}

export default Reviews