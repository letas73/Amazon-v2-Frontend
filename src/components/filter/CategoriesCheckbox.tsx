'use client'
import { FC } from 'react'
import styles from './Filter.module.scss'
import { IoIosCheckmark } from 'react-icons/io'
import { ICategory } from '@/types/category.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { changeCategory } from '@/store/filters/filters'

interface IProps extends ICategory {}

const CategoriesCheckbox: FC<IProps> = ({ id, name }) => {
  const dispatch = useAppDispatch()
  const categoryStore = useAppSelector((state) => state.filters.category)

  const onClickCheckbox = () => {
    dispatch(changeCategory(id))
  }

  return <div className={styles.checkboxItem}>
    <div onClick={onClickCheckbox} className={`${styles.checkboxInput} ${categoryStore === id && styles.checked}`}>
      <IoIosCheckmark className={styles.checkboxIcon} />
    </div>
    <div className={styles.checkboxValue}>
      {name}
    </div>
  </div>
}

export default CategoriesCheckbox