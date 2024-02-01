'use client'
import { FC, useEffect } from 'react'
import styles from './CatalogList.module.scss'
import CatalogItem from '../catalog-item/CatalogItem'
import { useMutation } from '@tanstack/react-query'
import productsService from '@/services/products/products.service'
import { EnumProductSort } from '@/types/sort.types'
import { useAppSelector } from '@/store/hooks'

interface IProps {
  sort: EnumProductSort
}

const CatalogList: FC<IProps> = ({ sort }) => {
  const { rating, category, minPrice, maxPrice, searchTerm } = useAppSelector((state) => state.filters)

  const { mutate, data } = useMutation({
    mutationKey: ['product-getAll'],
    mutationFn: () => productsService.getAll({ sort, rating, categoryId: category, minPrice, maxPrice, searchTerm })
  })

  useEffect(() => {
    mutate()
  }, [sort, rating, category, minPrice, maxPrice, searchTerm])

  return <ul className={styles.list}>
    {
      data ? data.map((item) => (
        <CatalogItem key={item.id} {...item} />
      )) : (
        <div>
          Products not found!
        </div>
      )
    }
  </ul>
}

export default CatalogList