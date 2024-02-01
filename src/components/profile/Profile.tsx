import { FC } from 'react'
import Image from 'next/image'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styles from './Profile.module.scss'

const Profile: FC = () => {
  return <div className={styles.profile}>
    <div className={styles.imageBlock}>
      <Image src='https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='avatar' width={38} height={38} className={styles.image} />
    </div>
    <MdOutlineKeyboardArrowDown className={styles.icon} />
  </div>
}

export default Profile