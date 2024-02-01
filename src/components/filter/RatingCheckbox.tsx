'use client'
import { FC } from 'react'
import { FaStar } from "react-icons/fa";
import { IoIosCheckmark } from 'react-icons/io'
import styles from './Filter.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeRating } from '@/store/filters/filters';

interface IProps {
  rating: number
  classType: string
}

const RatingCheckbox: FC<IProps> = ({ rating, classType }) => {
  const dispatch = useAppDispatch()
  const ratingStore = useAppSelector((state) => state.filters.rating)

  const onClickCheckbox = () => {
    dispatch(changeRating(rating))
  }

  return <div className={styles.checkboxItem}>
    <div
      onClick={onClickCheckbox}
      className={`${styles.checkboxInput} ${ratingStore === rating && styles.checked}`}
    >
      <IoIosCheckmark className={styles.checkboxIcon} />
    </div>
    <div className={`${styles.checkboxReviews}`}>
      <FaStar className={`${styles.checkboxReviewsIcon} ${classType}`} />
      <FaStar className={`${styles.checkboxReviewsIcon} ${classType}`} />
      <FaStar className={`${styles.checkboxReviewsIcon} ${classType}`} />
      <FaStar className={`${styles.checkboxReviewsIcon} ${classType}`} />
      <FaStar className={`${styles.checkboxReviewsIcon} ${classType}`} />
    </div>
  </div>
}

export default RatingCheckbox