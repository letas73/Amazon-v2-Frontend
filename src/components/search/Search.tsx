'use client'
import { FC, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import styles from './Search.module.scss'
import { useAppDispatch } from '@/store/hooks';
import { changeCategory, changeSearch } from '@/store/filters/filters';
import { useQuery } from '@tanstack/react-query';
import categoriesService from '@/services/categories/categories.service';
import { useOutside } from '@/hooks/useOutside';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryCategories } from '@/hooks/actions/useQueryCategories';

interface ICategoryState {
  id: number
  name: string
}

const Search: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { data } = useQueryCategories()
  const { isShow, ref, setIsShow } = useOutside(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [category, setCategory] = useState<ICategoryState | undefined>(undefined)

  const onClickOpenMenu = () => {
    setIsShow(!isShow)
  }

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClickCategory = (item: ICategoryState) => {
    setCategory(item)
    setIsShow(false)
  }

  const onClickSearch = () => {
    dispatch(changeCategory(category?.id))
    dispatch(changeSearch(searchTerm))
    if (pathname !== '/catalog') {
      router.push('/catalog')
    }
  }

  const handleClickAllCategories = () => {
    setCategory(undefined)
    setIsShow(false)
  }

  return <div className={styles.search}>
    <div className={styles.left}>
      <input
        type="search"
        placeholder='Search...'
        className={styles.input}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <div ref={ref} onClick={onClickOpenMenu} className={styles.categories}>
        <div className={styles.wrapper}>
          <span className={styles.value}>
            {
              category ? category.name : 'All categories'
            }
          </span>
          <MdOutlineKeyboardArrowDown className={styles.arrow} />
        </div>
        {
          isShow && (
            <div className={styles.categoriesList}>
              <div
                onClick={handleClickAllCategories}
                className={`${styles.categoriesItem} ${!category && styles.active} border-b border-white`}
              >
                All categories
              </div>
              {
                data.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.categoriesItem} ${item.id === category?.id && styles.active}`}
                    onClick={() => handleClickCategory({ id: item.id, name: item.name })}
                  >
                    {item.name}
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
    <button onClick={onClickSearch} className={styles.btn}>
      <FiSearch className={styles.icon} />
    </button>
  </div>
}

export default Search