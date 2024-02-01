import { FC } from 'react'
import Image from 'next/image'
import { LuTrash } from "react-icons/lu";
import styles from './DropCart.module.scss'
import { IBasketItem } from '@/types/basket-item.types';
import Link from 'next/link';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import cartService from '@/services/cart/cart.service';

interface IProps {
  item: IBasketItem
  refetch: () => Promise<QueryObserverResult<IBasketItem[], Error>>
}

const DropCartItem: FC<IProps> = ({ item, refetch }) => {
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

  return <li className={styles.item}>
    <Link href={`/catalog/${item.productId}`} className={styles.left}>
      <Image src={`http://localhost:5000/${item.image}`} alt={item.title} width={80} height={80} className={styles.image} />
    </Link>
    <div className={styles.right}>
      <Link href={`/catalog/${item.productId}`} className={styles.title}>
        {item.title}
      </Link>
      <div className={styles.price}>
        ${item.price}
      </div>
      <div className={styles.itemBottom}>
        <div className={styles.counter}>
          <button className={styles.counterBtn}>
            -
          </button>
          <div className={styles.counterValue}>
            1
          </div>
          <button className={styles.counterBtn}>
            +
          </button>
        </div>
        <button onClick={handleClickRemoveItem} className={styles.remove}>
          <LuTrash className={styles.removeIcon} />
        </button>
      </div>
    </div>
  </li>
}

export default DropCartItem