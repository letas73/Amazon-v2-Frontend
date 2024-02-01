import { FC } from 'react'
import fireIcon from './fire.svg'
import styles from './HotDeals.module.scss'
import Image from 'next/image'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import CatalogItem from '../catalog-item/CatalogItem';

const HotDeals: FC = () => {
  return <div className={styles.section}>
    <div className={styles.header}>
      <div className={styles.headerRight}>
        <h3 className={styles.title}>
          Hot deals
        </h3>
        <Image src={fireIcon} alt='hot deals' width={22} height={22} />
      </div>
      <div className={styles.slider}>
        <button className={`${styles.sliderBtn} ${styles.disabled}`}>
          <FaLongArrowAltLeft className={styles.sliderIcon} />
        </button>
        <button className={styles.sliderBtn}>
          <FaLongArrowAltRight className={styles.sliderIcon} />
        </button>
      </div>
    </div>
    <ul className={styles.carousel}>
      {/* <CatalogItem />
      <CatalogItem />
      <CatalogItem />
      <CatalogItem /> */}
    </ul>
  </div>
}

export default HotDeals