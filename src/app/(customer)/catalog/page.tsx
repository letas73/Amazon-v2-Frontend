'use client'
import { FC, useState } from 'react'
import styles from './page.module.scss'
import Sort from '@/components/sort/Sort';
import Filter from '@/components/filter/Filter';
import CatalogList from '@/components/catalog-list/CatalogList';
import { EnumProductSort } from '@/types/sort.types';
import { useQuery } from '@tanstack/react-query';
import categoriesService from '@/services/categories/categories.service';

const Catalog: FC = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [sortType, setSortType] = useState<EnumProductSort>(EnumProductSort.NEWEST)

  const { data } = useQuery({
    queryKey: ['getAll'],
    queryFn: () => categoriesService.getAll()
  })

  const toggleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  return <div className={styles.catalog}>
    <div className={styles.header}>
      <h1 className={styles.title}>
        Catalog
      </h1>
      <Sort sortType={sortType} setSortType={setSortType} />
    </div>
    <button onClick={toggleOpenFilter} className={styles.btnFilter}>
      {
        openFilter ? 'Close filters' : 'Open Filters'
      }
    </button>
    <div className={styles.content}>
      {
        openFilter && <Filter categories={data} />
      }
      <CatalogList sort={sortType} />
    </div>
  </div>
}

export default Catalog