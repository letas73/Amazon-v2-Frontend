'use client'
import { FC, useState } from 'react'
import { styled } from '@mui/material/styles';
import { GrFormClose } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import Rating from '@mui/material/Rating';
import styles from './AddReviewModal.module.scss'
import { useProfile } from '@/hooks/useProfile';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import reviewsService from '@/services/reviews/reviews.service';
import { CreateReviewDto } from '@/services/reviews/reviews.interface';
import { toast } from 'react-toastify';

interface IProps {
  open: boolean
  onClose: () => void
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff9900',
  },
  '& .MuiRating-iconHover': {
    color: '#ff9900',
  },
  '& .css-dqr9h-MuiRating-label': {
    marginRight: '4px'
  },
  '& .MuiRating-iconEmpty': {
    color: '#b7b7b9'
  },
  '& .MuiRating-iconFocus': {
    transform: 'scale(1)'
  },
});

const AddReviewModal: FC<IProps> = ({ open, onClose }) => {
  const user = useProfile()
  const { id: productId } = useParams()
  const [valueRating, setValueRating] = useState<number>(0)
  const [text, setText] = useState<string>('')

  const { mutate } = useMutation({
    mutationKey: ['create-review'],
    mutationFn: (dto: CreateReviewDto) => reviewsService.create(dto),
    onSuccess: () => {
      onClose()
      toast.success('Thanks for the feedback!', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
      setValueRating(0)
      setText('')
    },
    onError(error: any) {
      toast.error(error.response.data.message[0], {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  })

  const handleChangeRating = (e: any) => {
    setValueRating(+e.target.value)
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleCloseModal = () => {
    onClose()
    setValueRating(0)
  }

  const onClickCreateReview = () => {
    if (user) {
      const dto: CreateReviewDto = {
        rating: valueRating,
        text,
        userId: user.id,
        productId: +productId
      }

      mutate(dto)
    } else {
      toast.error('To write a review, you need to log in', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  }

  return <div className={`${styles.modal} ${open && styles.active}`}>
    <button onClick={handleCloseModal} className={styles.close}>
      <GrFormClose className={styles.closeIcon} />
    </button>
    <h1 className={styles.title}>
      Leave a review
    </h1>
    <div className={styles.rating}>
      <div className='flex'>
        <StyledRating
          name="simple-controlled"
          value={valueRating}
          onChange={handleChangeRating}
          icon={<FaStar />}
          emptyIcon={<FaStar />}
          size='small'
        />
      </div>
    </div>
    <textarea
      placeholder='Your text here...'
      className={styles.textarea}
      value={text}
      onChange={handleChangeText}
    />
    <div className='flex items-center justify-center'>
      <button onClick={onClickCreateReview} className={styles.btn}>
        Leave
      </button>
    </div>
  </div>
}

export default AddReviewModal