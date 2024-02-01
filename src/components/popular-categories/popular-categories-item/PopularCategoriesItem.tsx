import { FC } from 'react'
import Icon from '@/../../../assets/categories-icon/smartphone.svg'
import styles from './PopularCategoriesItem.module.scss'
import Image from 'next/image'

const PopularCategoriesItem: FC = () => {
  return <li className={styles.item}>
    <Image src={Icon} alt='category' width={50} height={50} className={styles.icon} />
  </li>
}

export default PopularCategoriesItem