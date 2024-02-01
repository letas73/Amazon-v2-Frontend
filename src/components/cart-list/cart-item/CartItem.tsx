import { FC } from 'react'
import styles from './CartItem.module.scss'
import Image from 'next/image'

const CartItem: FC = () => {
  return <li className={styles.item}>
    <div className={styles.left}>
      <Image
        src='https://c.dns-shop.ru/thumb/st4/fit/200/200/f3c07e9d8dd6a9de9e0e28ccb83f115b/9567d18107af5c3d1264b429db988c4bc63a8089d4cb76add0236817adeb3af8.jpg'
        alt='product title'
        width={100}
        height={100}
        className={styles.img}
      />
      <div>
        <div className={styles.title}>
          Apple iPhone 12 (white)
        </div>
        <div className={styles.brand}>
          Brand
        </div>
      </div>
    </div>
    <div className={styles.price}>
      $899,00
    </div>
  </li>
}

export default CartItem