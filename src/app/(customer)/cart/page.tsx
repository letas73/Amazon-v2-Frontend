import { Metadata } from 'next'
import { FC } from 'react'
import Cart from './Cart'

export const metadata: Metadata = {
  title: 'Cart | Amazon Store'
}

const CartPage: FC = () => {
  return <div className='h-[100vh] w-full p-8'>
    <Cart />
  </div>
}

export default CartPage