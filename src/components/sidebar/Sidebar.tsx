'use client'
import { FC } from 'react'
import { PiCirclesFour } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import CategoryItem from './category-item/CategoryItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '@/services/auth/auth.service';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import { removeUser } from '@/store/user/user';
import { useAuth } from '@/hooks/useAuth';
import categoriesService from '@/services/categories/categories.service';
import styles from './Sidebar.module.scss'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQueryCategories } from '@/hooks/actions/useQueryCategories';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAuth()
  const pathname = usePathname()
  const { data } = useQueryCategories()

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      dispatch(removeUser())
      toast.success('You have successfully logged out of your account', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  })

  const onClickLogout = () => {
    mutate()
  }

  return <div className={styles.sidebar}>
    {
      pathname.startsWith('/admin', 0) ? (
        <div className={styles.menu}>
          <Link href='/' className={styles.menuHome}>
            Go back to the home
          </Link>
          <div>
            <div className={styles.menuCaption}>
              Menu:
            </div>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href='/admin' className={styles.menuItemLink}>
                  Dashboard
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href='/admin/products' className={styles.menuItemLink}>
                  Products
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href='/admin/categories' className={styles.menuItemLink}>
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.list}>
          <div className={`${styles.item} ${styles.active}`}>
            <div className={styles.itemContent}>
              <PiCirclesFour className={styles.icon} />
              <div className={styles.text}>
                Categories
              </div>
            </div>
            <ul className={styles.listCategories}>
              {
                data.map((item) => (
                  <CategoryItem key={item.id} {...item} />
                ))
              }
            </ul>
          </div>
        </div>
      )
    }
    {
      isAuth && (
        <div className={styles.bottom}>
          <button onClick={onClickLogout} className={styles.logout}>
            <MdLogout className={styles.logoutIcon} />
            <div className={styles.logoutText}>
              Log out
            </div>
          </button>
        </div>
      )
    }
  </div>
}

export default Sidebar