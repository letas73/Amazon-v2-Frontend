'use client'
import { FC, useEffect, useState } from 'react'
import AdminProductsItem from '@/components/ui/admin-products-item/AdminProductsItem'
import AdminAddButton from '@/components/ui/admin-add-button/AdminAddButton'
import AdminModal from '@/components/ui/admin-modal/AdminModal'
import AdminModalProducts, { CategoryState } from '@/components/ui/admin-modal/AdminModalProducts'
import { useOutside } from '@/hooks/useOutside'
import styles from './Products.module.scss'
import { useQueryProducts } from '@/hooks/actions/useQueryProducts'

export interface IEditProductItem {
  id: number
  title: string
  price: number
  images: string[]
  description: string
  category: CategoryState
}

const Products: FC = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const { data } = useQueryProducts()
  const [editItem, setEditItem] = useState <IEditProductItem | null>(null)

  const handleClickOpenModal = () => {
    setIsShow(true)
  }

  const handleCloseModal = () => {
    setIsShow(false)
  }

  useEffect(() => {
    if(!isShow) setEditItem(null)
  }, [isShow])

  return <div className={styles.products}>
    <div className={styles.header}>
      <h1 className={styles.title}>
        Products
      </h1>
      <AdminAddButton onClick={handleClickOpenModal} />
    </div>
    <ul className={styles.list}>
      {
        data.map((item) => (
          <AdminProductsItem
            key={item.id}
            item={item}
            onClickEditModal={setIsShow}
            setEditItem={setEditItem}
          />
        ))
      }
    </ul>
    <div className={`${styles.modal} ${isShow && styles.active}`}>
      <div className={styles.overlay}></div>
      <div ref={ref} className={styles.modalBody}>
        <AdminModal
          title={editItem ? 'Edit product' : 'Add product'}
          onClose={handleCloseModal}
        >
          <AdminModalProducts
            item={editItem}
            onCloseModal={setIsShow}
            visibleModal={isShow}
          />
        </AdminModal>
      </div>
    </div>
  </div>
}

export default Products