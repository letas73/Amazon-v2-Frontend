import { Metadata } from 'next'
import { FC } from 'react'
import styles from './Products.module.scss'
import Products from './Products'

export const metadata: Metadata = {
  title: 'Products | Amazon Store'
}

const page: FC = () => {
  return <div className={styles.page}>
    <Products />
  </div>
}

export default page