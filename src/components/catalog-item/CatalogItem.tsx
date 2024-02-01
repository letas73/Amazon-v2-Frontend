'use client'
import { FC } from 'react'
import Image from 'next/image';
import styles from './CatalogItem.module.scss'
import Link from 'next/link';
import { IProduct } from '@/types/product.types';
import { averageRating } from '@/helpers/averageRating.helper';
import Ratings from '../ui/ratings/Ratings';
import FavoriteButton from '../ui/favorite-button/FavoriteButton';
import { useProfile } from '@/hooks/useProfile';
import CartButton from '../ui/cart-button/CartButton';

interface IProps extends IProduct {}

const CatalogItem: FC<IProps> = ({ id, images, price, title, category, reviews }) => {
  const user = useProfile()
  const averageValueRating = averageRating(reviews)

  return <li className={styles.item}>
    <div className={styles.header}>
      {
        user && (
          <div className={styles.btns}>
            <FavoriteButton
              title={title}
              price={price}
              image={images[0]}
              productId={id}
              favoriteId={user.favorite.id}
            />
            <CartButton
              title={title}
              price={price}
              image={images[0]}
              productId={id}
              basketId={user.basket.id}
            />
          </div>
        )
      }
      <Link href={`/catalog/${id}`}>
        <Image src={images ? `http://localhost:5000/${images[0]}` : ''} alt='product title' width={200} height={200} className={styles.image} />
      </Link>
    </div>
    <div className={styles.content}>
      <Link href={`/catalog/${id}`} className={styles.title}>
        {title}
      </Link>
      <div className={styles.brand}>
        {category.name}
      </div>
      <div className={styles.reviews}>
        <div className={styles.reviewsLeft}>
          {
            <Ratings rating={averageValueRating} />
          }
          <div className={styles.reviewsScore}>
            {averageValueRating}
          </div>
        </div>
        <div className={styles.reviewsText}>
          ({reviews.length} reviews)
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceNew}>
          ${price}
        </div>
      </div>
    </div>
  </li>
}

export default CatalogItem