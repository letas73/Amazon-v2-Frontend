import { FC, useRef } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from './AdminModal.module.scss'
import { IEditItem } from '@/app/(customer)/admin/categories/Categories';

interface IProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

const AdminModal: FC<IProps> = ({ title, children, onClose}) => {
  const handleClickCloseModal = () => {
    onClose()
  }

  return <div className={styles.admin}>
    <button onClick={handleClickCloseModal} className={styles.close}>
      <IoCloseCircleOutline className={styles.closeIcon} />
    </button>
    <div className={styles.title}>
      {title}
    </div>
    {children}
  </div>
}

export default AdminModal