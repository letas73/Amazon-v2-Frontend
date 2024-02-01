'use client'
import { FC } from 'react'

import styles from './Filter.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeMaxPrice, changeMinPrice } from '@/store/filters/filters';
import { ICategory } from '@/types/category.types';
import CategoriesCheckbox from './CategoriesCheckbox';
import RatingCheckbox from './RatingCheckbox';

interface IProps {
  categories: ICategory[] | undefined
}

const Filter: FC<IProps> = ({ categories }) => {
  const dispatch = useAppDispatch()

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMinPrice(+e.target.value))
  }

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMaxPrice(+e.target.value))
  }

  return <div className={styles.filter}>
    <div className={styles.item}>
      <div className={styles.label}>
        Price from/to
      </div>
      <div className={styles.fields}>
        <input
          onChange={handleChangeMinPrice}
          type="number"
          placeholder='From'
          className={styles.input}
        />
        <div className={styles.line}>-</div>
        <input
          onChange={handleChangeMaxPrice}
          type="number"
          placeholder='To'
          className={styles.input}
        />
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.label}>
        Categories
      </div>
      <div className={styles.checkbox}>
        {
          categories && categories.map((category) => (
            <CategoriesCheckbox key={category.id} {...category} />
          ))
        }
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.label}>
        Reviews
      </div>
      <div className={styles.checkbox}>
        <RatingCheckbox rating={1} classType={styles.nthCount1} />
        <RatingCheckbox rating={2} classType={styles.nthCount2} />
        <RatingCheckbox rating={3} classType={styles.nthCount3} />
        <RatingCheckbox rating={4} classType={styles.nthCount4} />
        <RatingCheckbox rating={5} classType={styles.nthCount5} />
      </div>
    </div>
  </div>
}

export default Filter