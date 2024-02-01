import { Metadata } from 'next'
import { FC } from 'react'
import styles from './page.module.scss'
import DashboardList from '@/components/dashboard-list/DashboardList'

export const metadata: Metadata = {
  title: 'Dashboard | Amazon Store'
}

const AdminPage: FC = () => {
  return <div className={styles.page}>
    <h1 className={styles.title}>
      Dashboard
    </h1>
    <DashboardList />
  </div>
}

export default AdminPage