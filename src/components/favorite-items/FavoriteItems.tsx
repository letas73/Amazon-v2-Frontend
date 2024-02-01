import { FC } from 'react'
import Image from 'next/image';
import { IFavoriteItem } from '@/types/favorite-item.types'
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from './FavoriteItems.module.scss'
import FavoriteButton from '../ui/favorite-button/FavoriteButton';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { averageRating } from '@/helpers/averageRating.helper';
import Ratings from '../ui/ratings/Ratings';
import CartButton from '../ui/cart-button/CartButton';

interface IProps {
  item: IFavoriteItem
}

const FavoriteItems: FC<IProps> = ({ item }) => {
  const user = useProfile()
  const averageValueRating = averageRating(item.product.reviews)

  if (!user) {
    return null
  }

  return <li className={styles.item}>
    <div className={styles.header}>
      <div className={styles.btns}>
        <FavoriteButton
          title={item.title}
          price={item.price}
          image={item.image}
          productId={item.product.id}
          favoriteId={item.favoriteId}
        />
        <CartButton
          title={item.title}
          price={item.price}
          image={item.image}
          productId={item.productId}
          basketId={user.basket.id}
        />
      </div>
      <Link href={`/catalog/${item.product.id}`}>
        <Image src={item.image ? `http://localhost:5000/${item.image}` : ''} alt={item.title} width={200} height={200} className={styles.image} />
      </Link>
    </div>
    <div className={styles.content}>
      <Link href={`/catalog/${item.product.id}`} className={styles.title}>
        {item.title}
      </Link>
      <div className={styles.brand}>
        {item.product.category.name}
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
          ({item.product.reviews.length} reviews)
        </div>
      </div>
      <div className={styles.price}>
        <div className={styles.priceNew}>
          ${item.price}
        </div>
      </div>
    </div>
  </li>
}

export default FavoriteItems