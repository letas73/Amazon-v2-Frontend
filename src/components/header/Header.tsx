'use client'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../search/Search'
import Profile from '../profile/Profile'
import logoImage from './logo.png'
import DropCart from './drop-cart/DropCart'
import { useAuth } from '@/hooks/useAuth'
import { useAdmin } from '@/hooks/useAdmin'
import { useQueryFavoriteItems } from '@/hooks/actions/useQueryFavoriteItems'
import { useOutside } from '@/hooks/useOutside'
import { useQueryBasketItem } from '@/hooks/actions/useQueryBasketItem'
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import styles from './Header.module.scss'
import { usePathname } from 'next/navigation'

const Header: FC = () => {
  const isAuth = useAuth()
  const isAdmin = useAdmin()
  const pathname = usePathname()
  const { length: favoriteItemsLength } = useQueryFavoriteItems()
  const { length: basketItemsLength } = useQueryBasketItem()
  const { isShow, ref, setIsShow } = useOutside(false)

  const toggleClickOnCart = () => {
    setIsShow(!isShow)
  }

  const handleCloseCart = () => {
    setIsShow(false)
  }

  return <header className={styles.header}>
    {
      pathname.startsWith('/admin', 0) ? (
        <div className={styles.logoAdmin}>
          Admin Panel
        </div>
      ) : (
        <Link href='/' className={styles.imageBlock}>
          <Image src={logoImage} alt='Amazon' width={100} height={50} className={styles.image} />
        </Link>
      )
    }
    <div className={styles.right}>
      <Search />
      {
        isAuth ? (
          <div className={styles.menu}>
            <div className={styles.btns}>
              {
                isAdmin && (
                  <Link href='/admin' className={styles.btn}>
                    <MdOutlineAdminPanelSettings className={styles.btnIcon} />
                  </Link>
                )
              }
              <Link href='/favorites' className={styles.btn}>
                <div className={styles.count}>
                  <div className={styles.countValue}>
                    {favoriteItemsLength}
                  </div>
                </div>
                <MdFavoriteBorder className={styles.btnIcon} />
              </Link>
              <div ref={ref} className={styles.menuWrapper}>
                <button onClick={toggleClickOnCart} className={styles.btn}>
                  <div className={styles.count}>
                    <div className={styles.countValue}>
                      {basketItemsLength}
                    </div>
                  </div>
                  <MdOutlineShoppingCart className={styles.btnIcon} />
                </button>
                <div className={`${styles.menuCart} ${isShow && styles.active}`}>
                  <DropCart onClose={handleCloseCart} />
                </div>
              </div>
            </div>
            <Profile />
          </div>
        ) : (
          <Link href='/auth' className={styles.login}>
            Sign In
          </Link>
        )
      }
    </div>
  </header>
}

export default Header