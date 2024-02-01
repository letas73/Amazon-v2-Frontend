'use client'
import { FC } from 'react'
import styles from './Cart.module.scss'
import Link from 'next/link'
import { useQueryBasketItem } from '@/hooks/actions/useQueryBasketItem'
import CartItems from '@/components/cart-items/CartItems'
import { totalPrice } from '@/helpers/total-price'

const Cart: FC = () => {
  const { data, refetch, length } = useQueryBasketItem()

  return <div className={styles.cart}>
    <div className={styles.left}>
      <h1 className={styles.title}>
        Basket
      </h1>
      <ul className={styles.list}>
        {
          data.map((item) => (
            <CartItems key={item.id} item={item} refetch={refetch} />
          ))
        }
      </ul>
    </div>
    <div className='flex items-center justify-end shrink-0'>
      <div className='mr-5'>
        <div className='text-secondary mb-2'>
          Total Cost
        </div>
        <div className='font-bold text-[22px]'>
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
      <Link href='/order' className='inline-block text-primary rounded-lg bg-white font-bold text-[18px] py-4 px-8'>
        Place order
      </Link>
    </div>
  </div>
}

export default Cart