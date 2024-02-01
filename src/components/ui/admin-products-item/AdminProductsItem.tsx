'use client'
import { Dispatch, FC, SetStateAction } from 'react'
import Link from 'next/link'
import { RiShareBoxLine, RiEdit2Line, RiDeleteRow } from "react-icons/ri";
import styles from './AdminProductsItem.module.scss'
import { IProduct } from '@/types/product.types';
import { useQueryProducts } from '@/hooks/actions/useQueryProducts';
import { useMutation } from '@tanstack/react-query';
import productsService from '@/services/products/products.service';
import { toast } from 'react-toastify';
import { IEditProductItem } from '@/app/(customer)/admin/products/Products';

interface IProps {
  item: IProduct
  onClickEditModal: Dispatch<SetStateAction<boolean>>
  setEditItem: Dispatch<SetStateAction<IEditProductItem | null>>
}

const AdminProductsItem: FC<IProps> = ({ item, onClickEditModal, setEditItem }) => {
  const { refetch } = useQueryProducts()

  const { mutate } = useMutation({
    mutationKey: ['remove-product'],
    mutationFn: (id: number) => productsService.remove(id),
    onSuccess: () => {
      toast.success('The product has been successfully deleted', {
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
    mutate(item.id)
  }

  const handleClickOpenEditModal = () => {
    const editItem: IEditProductItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: {
        id: item.categoryId,
        name: item.category.name
      },
      images: item.images
    }
    onClickEditModal(true)
    setEditItem(editItem)
  }

  return <li className={styles.item}>
    <div className={styles.title}>
      {item.title}
    </div>
    <div className={styles.category}>
      {item.category.name}
    </div>
    <div className={styles.data}>
      {item.createdAt}
    </div>
    <div className={styles.btns}>
      <Link href={`/catalog/${item.id}`} className={styles.btnsItem}>
        <RiShareBoxLine className={styles.btnsIcon} />
      </Link>
      <button onClick={handleClickOpenEditModal} className={styles.btnsItem}>
        <RiEdit2Line className={styles.btnsIcon} />
      </button>
      <button onClick={handleClickRemove} className={styles.btnsItem}>
        <RiDeleteRow className={styles.btnsIcon} />
      </button>
    </div>
  </li>
}

export default AdminProductsItem