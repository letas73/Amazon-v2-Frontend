'use client'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import styles from './Sort.module.scss'
import { useOutside } from '@/hooks/useOutside';
import { EnumProductSort } from '@/types/sort.types';

interface IProps {
  sortType: EnumProductSort
  setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const Sort: FC<IProps> = ({ sortType, setSortType }) => {
  const { isShow, ref, setIsShow } = useOutside(false)

  const toggleSetIsShow = () => {
    setIsShow(!isShow)
  }

  const selectHighPrice = () => {
    setSortType(EnumProductSort.HIGH_PRICE)
    setIsShow(false)
  }

  const selectLowPrice = () => {
    setSortType(EnumProductSort.LOW_PRICE)
    setIsShow(false)
  }

  const selectNewest = () => {
    setSortType(EnumProductSort.NEWEST)
    setIsShow(false)
  }

  const selectOldest = () => {
    setSortType(EnumProductSort.OLDEST)
    setIsShow(false)
  }

  return <div ref={ref} className={styles.sort}>
    <div className={styles.sortLeft}>
      <div className={styles.sortCaption}>
        Sort by:
      </div>
      <div className={styles.sortValue}>
        {
          sortType === EnumProductSort.HIGH_PRICE && 'High price'
          || sortType === EnumProductSort.LOW_PRICE && 'Low price'
          || sortType === EnumProductSort.NEWEST && 'Newest'
          || sortType === EnumProductSort.OLDEST && 'Oldest'
        }
      </div>
    </div>
    <button onClick={toggleSetIsShow} className={styles.sortBtn}>
      <TiArrowSortedDown className={styles.sortIcon} />
    </button>
    {
      isShow && (
        <div className={styles.menu}>
          <div
            onClick={selectHighPrice}
            className={`${styles.menuItem} ${sortType === EnumProductSort.HIGH_PRICE && styles.active}`}
          >
            High price
          </div>
          <div 
            onClick={selectLowPrice} 
            className={`${styles.menuItem} ${sortType === EnumProductSort.LOW_PRICE && styles.active}`}
          >
            Low price
          </div>
          <div
            onClick={selectNewest}
            className={`${styles.menuItem} ${sortType === EnumProductSort.NEWEST && styles.active}`}
          >
            Newest
          </div>
          <div
            onClick={selectOldest}
            className={`${styles.menuItem} ${sortType === EnumProductSort.OLDEST && styles.active}`}
          >
            Oldest
          </div>
        </div>
      )
    }
  </div>
}

export default Sort