import { FC } from 'react'
import Image from 'next/image'
import { FaStar } from "react-icons/fa";
import styles from './ReviewsItem.module.scss'
import { IReviewWithUser } from '@/services/reviews/reviews.interface';

interface IProps {
  item: IReviewWithUser
}

const ReviewsItem: FC<IProps> = ({ item }) => {
  return <div className={styles.item}>
    <div className={styles.top}>
      <div className={styles.avatar}>
        <Image
          src={item.user.avatarImg ? `http://localhost:5000/${item.user.avatarImg}` : ''}
          alt='avatar'
          width={40}
          height={40}
          className={styles.avatarImg}
        />
      </div>
      <div className={styles.username}>
        {item.user.username}
      </div>
    </div>
    <div className={styles.rating}>
      <FaStar className={`${styles.ratingIcon} ${styles.nthStar4}`} />
      <FaStar className={`${styles.ratingIcon} ${styles.nthStar4}`} />
      <FaStar className={`${styles.ratingIcon} ${styles.nthStar4}`} />
      <FaStar className={`${styles.ratingIcon} ${styles.nthStar4}`} />
      <FaStar className={`${styles.ratingIcon} ${styles.nthStar4}`} />
    </div>
    <p className={styles.text}>
      {item.text}
    </p>
  </div>
}

export default ReviewsItem