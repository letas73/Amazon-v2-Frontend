import { Dispatch, FC, SetStateAction } from 'react'
import { FaStar } from "react-icons/fa";
import './Ratings.scss'
import { colorizeRatingStar } from '@/helpers/colorize-rating-star.helper';

interface IProps {
  rating: number
}

const Ratings: FC<IProps> = ({ rating }) => {
  const colorizeStar = colorizeRatingStar(rating)

  return <div className='rating'>
    <FaStar className={`rating__item ${colorizeStar}`} />
    <FaStar className={`rating__item ${colorizeStar}`} />
    <FaStar className={`rating__item ${colorizeStar}`} />
    <FaStar className={`rating__item ${colorizeStar}`} />
    <FaStar className={`rating__item ${colorizeStar}`} />
  </div>
}

export default Ratings