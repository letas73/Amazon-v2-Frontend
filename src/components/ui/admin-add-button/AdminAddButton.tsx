import { FC } from 'react'
import styles from './AdminAddButton.module.scss'

interface IProps {
  onClick: () => void
}

const AdminAddButton: FC<IProps> = ({ onClick }) => {
  return <button onClick={() => onClick()} className={styles.btn}>
    Add
  </button>
}

export default AdminAddButton