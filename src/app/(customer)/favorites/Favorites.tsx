'use client'
import { FC } from 'react'
import styles from './Favorites.module.scss'
import FavoriteItems from '@/components/favorite-items/FavoriteItems'
import { useQueryFavoriteItems } from '@/hooks/actions/useQueryFavoriteItems'

const Favorites: FC = () => {
  const { data: items, length } = useQueryFavoriteItems()

  return <div className={styles.wrapper}>
    <h1 className={styles.title}>
      Favorites products
    </h1>
    <ul className={styles.list}>
      {
        length ? items.map((item) => (
          <FavoriteItems key={item.id} item={item} />
        )) : (
          <div>
            Products not found!
          </div>
        )
      }
    </ul>
  </div>
}

export default Favorites