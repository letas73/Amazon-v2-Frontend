'use client'
import { FC } from 'react'
import styles from './CategoryItem.module.scss'
import { ICategory } from '@/types/category.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { changeCategory } from '@/store/filters/filters'
import { useRouter } from 'next/navigation'

interface IProps extends ICategory {}

const CategoryItem: FC<IProps> = ({ id, name }) => {
  const dispatch = useAppDispatch()
  const categoryStore = useAppSelector((state) => state.filters.category)
  const router = useRouter()

  const onClickCategory = () => {
    dispatch(changeCategory(id))
    router.push('/catalog')
  }

  return <li
    onClick={onClickCategory}
    className={`${styles.item} ${categoryStore === id && styles.active}`}
  >
    {name}
  </li>
}

export default CategoryItem