'use client'
import { FC } from 'react'
import styles from './DropCart.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DropCartItem from './DropCartItem';
import { useQueryBasketItem } from '@/hooks/actions/useQueryBasketItem';
import { totalPrice } from '@/helpers/total-price';

interface IProps {
  onClose: () => void
}

const DropCart: FC<IProps> = ({ onClose }) => {
  const router = useRouter()
  const { data, refetch, length } = useQueryBasketItem()

  const handleClickCheckOut = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
    router.push('/cart')
  }

  return <div className={styles.cart}>
    <div className={styles.caption}>
      My cart
    </div>
    <ul className={styles.list}>
      {
        data.map((item) => (
          <DropCartItem key={item.id} item={item} refetch={refetch} />
        ))
      }
    </ul>
    <div className={styles.total}>
      <div className={styles.totalCaption}>
        Total:
      </div>
      <div className={styles.totalPrice}>
        {
          length ? (
            <span>
              ${totalPrice(data)}
            </span>
          ) : (
            '$0'
          )
        }
      </div>
    </div>
    <div className='flex items-center justify-center'>
      <Link onClick={handleClickCheckOut} href='/cart' className={styles.link}>
        Go to checkout
      </Link>
    </div>
  </div>
}

export default DropCart