'use client'
import { FC } from 'react'
import { RiDeleteRow, RiEdit2Line, RiShareBoxLine } from 'react-icons/ri'
import styles from './AdminCategoriesItem.module.scss'
import { ICategory } from '@/types/category.types'
import { useQueryCategories } from '@/hooks/actions/useQueryCategories'
import { useMutation } from '@tanstack/react-query'
import categoriesService from '@/services/categories/categories.service'
import { toast } from 'react-toastify'
import { IEditItem } from '@/app/(customer)/admin/categories/Categories'

interface IProps {
  item: ICategory
  onClickEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditItem: React.Dispatch<React.SetStateAction<IEditItem | null>>
}

const AdminCategoriesItem: FC<IProps> = ({ item, onClickEditModal, setEditItem }) => {
  const { refetch } = useQueryCategories()

  const { mutate } = useMutation({
    mutationKey: ['remove-category'],
    mutationFn: () => categoriesService.remove(item.id),
    onSuccess: () => {
      toast.success('The category has been successfully deleted', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
      refetch()
    }
  })

  const handleClickRemove = () => {
    mutate()
  }

  const handleClickEdit = () => {
    const editItem = {
      id: item.id,
      name: item.name
    }
    setEditItem(editItem)
    onClickEditModal(true)
  }

  return <li className={styles.item}>
    <div className={styles.title}>
      {item.name}
    </div>
    <div className={styles.data}>
      {item.createdAt}
    </div>
    <div className={styles.btns}>
      <button className={styles.btnsItem}>
        <RiShareBoxLine className={styles.btnsIcon} />
      </button>
      <button onClick={handleClickEdit} className={styles.btnsItem}>
        <RiEdit2Line className={styles.btnsIcon} />
      </button>
      <button onClick={handleClickRemove} className={styles.btnsItem}>
        <RiDeleteRow className={styles.btnsIcon} />
      </button>
    </div>
  </li>
}

export default AdminCategoriesItem