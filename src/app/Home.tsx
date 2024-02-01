import { FC } from 'react'
import styles from '@/app/page.module.scss'
import Link from 'next/link'
import PopularCategories from '@/components/popular-categories/PopularCategories'
import HotDeals from '@/components/hot-deals/HotDeals'

const Home: FC = () => {
  return <main className={styles.main}>
    <div className={styles.section}>
      <h2 className={styles.title}>
        Free Delivery!
      </h2>
      <p className={styles.descr}>
        Dont miss it out! Only today, get free Next Day delivery on all of your orders.
      </p>
      <Link href='/catalog' className={styles.link}>
        Browse products
      </Link>
    </div>
    {/* <PopularCategories /> */}
    <HotDeals />
  </main>
}

export default Home