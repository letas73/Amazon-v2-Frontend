'use client'
import { FC, useEffect, useState } from 'react'
import { useOutside } from '@/hooks/useOutside'
import AdminAddButton from '@/components/ui/admin-add-button/AdminAddButton'
import AdminModal from '@/components/ui/admin-modal/AdminModal'
import AdminModalCategories from '../../../../components/ui/admin-modal/AdminModalCategories'
import styles from './Categories.module.scss'
import AdminCategoriesItem from '@/components/ui/admin-categories-item/AdminCategoriesItem'
import { useQueryCategories } from '@/hooks/actions/useQueryCategories'

export interface IEditItem {
  id: number,
  name: string
}

const Categories: FC = () => {
  const { data } = useQueryCategories()
  const { isShow, setIsShow, ref } = useOutside(false)
  const [editItem, setEditItem] = useState<IEditItem | null>(null)

  const handleClickOpenModal = () => {
    setIsShow(true)
  }

  const handleCloseModal = () => {
    setIsShow(false)
  }

  useEffect(() => {
    if (!isShow) setEditItem(null)
  }, [isShow])

  return <div className={styles.products}>
    <div className={styles.header}>
      <h1 className={styles.title}>
        Categories
      </h1>
      <AdminAddButton onClick={handleClickOpenModal} />
    </div>
    <ul className={styles.list}>
      {
        data.map((item) => (
          <AdminCategoriesItem
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
          title={editItem ? 'Edit category' : 'Add category'}
          onClose={handleCloseModal}
        >
          <AdminModalCategories item={editItem} onCloseModal={setIsShow} />
        </AdminModal>
      </div>
    </div>
  </div>
}

export default Categories