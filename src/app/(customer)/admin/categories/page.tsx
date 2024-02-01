import { Metadata } from 'next'
import { FC } from 'react'
import Categories from './Categories'
import styles from './Categories.module.scss'

export const metadata: Metadata = {
  title: 'Categories | Amazon Store'
}

const page: FC = () => {
  return <div className={styles.page}>
    <Categories />
  </div>
}

export default page