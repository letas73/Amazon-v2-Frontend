import { FC } from 'react'
import { FaStar } from "react-icons/fa";
import styles from './PopularCategories.module.scss'
import PopularCategoriesItem from './popular-categories-item/PopularCategoriesItem';

const PopularCategories: FC = () => {
  return <div className={styles.section}>
    <div className={styles.header}>
      <h3 className={styles.title}>
        Popular categories
      </h3>
      <FaStar className={styles.icon} />
    </div>
    <ul className={styles.list}>
      <PopularCategoriesItem />
      <PopularCategoriesItem />
      <PopularCategoriesItem />
    </ul>
  </div>
}

export default PopularCategories