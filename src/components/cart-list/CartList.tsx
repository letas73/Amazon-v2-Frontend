import { FC } from 'react'
import CartItem from './cart-item/CartItem'

const CartList: FC = () => {
  return <ul className='flex flex-col w-full mb-10'>
    <CartItem />
    <CartItem />
    <CartItem />
  </ul>
}

export default CartList