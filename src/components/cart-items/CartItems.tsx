import { FC } from 'react'
import Image from 'next/image';
import { IBasketItem } from '@/types/basket-item.types'
import FavoriteButton from '../ui/favorite-button/FavoriteButton'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import styles from './CartItems.module.scss'
import Link from 'next/link';
import Ratings from '../ui/ratings/Ratings';
import { averageRating } from '@/helpers/averageRating.helper';
import { useProfile } from '@/hooks/useProfile';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import cartService from '@/services/cart/cart.service';

interface IProps {
  item: IBasketItem,
  refetch: () => Promise<QueryObserverResult<IBasketItem[], Error>>
}

const CartItems: FC<IProps> = ({ item, refetch }) => {
  const averageValueRating = averageRating(item.product.reviews)
  const user = useProfile()

  const { mutate } = useMutation({
    mutationKey: ['remove-basket-item'],
    mutationFn: () => cartService.remove(item.id),
    onSuccess: () => {
      refetch()
    }
  })

  const handleClickRemoveItem = () => {
    mutate()
  }

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
          favoriteId={user.favorite.id}
        />
        <button onClick={handleClickRemoveItem}>
          <MdOutlineRemoveShoppingCart className='w-[22px] h-[22px]' />
        </button>
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

export default CartItems