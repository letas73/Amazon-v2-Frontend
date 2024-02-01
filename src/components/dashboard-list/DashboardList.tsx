'use client'
import { FC } from 'react'
import styles from './DashboardList.module.scss'
import { useQuery } from '@tanstack/react-query'
import adminService from '@/services/admin/admin.service'

const DashboardList: FC = () => {
  const { data } = useQuery({
    queryKey: ['get-admin-data'],
    queryFn: () => adminService.getData()
  })

  return <ul className={styles.list}>
    <li className={styles.item}>
      <div className={styles.title}>
        Orders
      </div>
      <div className={styles.value}>
        {
          data ? data.orders : 0
        }
      </div>
    </li>
    <li className={styles.item}>
      <div className={styles.title}>
        Reviews
      </div>
      <div className={styles.value}>
        {
          data ? data.reviews : 0
        }
      </div>
    </li>
    <li className={styles.item}>
      <div className={styles.title}>
        Users
      </div>
      <div className={styles.value}>
        {
          data ? data.users : 0
        }
      </div>
    </li>
    <li className={styles.item}>
      <div className={styles.title}>
        Total Amount
      </div>
      <div className={styles.value}>
        ${
          data ? data.totalAmount : 0
        }
      </div>
    </li>
  </ul>
}

export default DashboardList