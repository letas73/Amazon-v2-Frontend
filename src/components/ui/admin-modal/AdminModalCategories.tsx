'use client'
import { FC, useEffect, useState } from 'react'
import styles from './AdminModal.module.scss'
import { useMutation } from '@tanstack/react-query'
import categoriesService from '@/services/categories/categories.service'
import { useQueryCategories } from '@/hooks/actions/useQueryCategories'
import { toast } from 'react-toastify'
import { IEditItem } from '@/app/(customer)/admin/categories/Categories'
import { UpdateCategoryDto } from '@/services/categories/categories.interface'

interface IProps {
  item: IEditItem | null
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminModalCategories: FC<IProps> = ({ item, onCloseModal }) => {
  const isEditing = !!item
  const { refetch } = useQueryCategories()
  const [name, setName] = useState<string>('')

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const { mutate: addMutate } = useMutation({
    mutationKey: ['add-category'],
    mutationFn: (name: string) => categoriesService.create(name),
    onSuccess: () => {
      toast.success('The category was successfully created', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
      refetch()
      setName('')
      onCloseModal(false)
    },
    onError: (e: any) => {
      toast.error(e.response.data.message[0], {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  })

  const { mutate: editMutate } = useMutation({
    mutationKey: ['edit-category'],
    mutationFn: (dto: UpdateCategoryDto) => categoriesService.update(dto),
    onSuccess: () => {
      toast.success('The category was successfully changed', {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
      refetch()
      setName('')
      onCloseModal(false)
    },
    onError: (e: any) => {
      toast.error(e.response.data.message[0], {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      editMutate({id: item.id, name})
    } else {
      addMutate(name)
    }
  }

  useEffect(() => {
    if (isEditing) {
      setName(item.name)
    } else {
      setName('')
    }
  }, [isEditing])

  return <form onSubmit={onSubmit} className={styles.form}>
    <div className={styles.formField}>
      <label className={styles.label}>
        Name
      </label>
      <input
        type="text"
        placeholder='Name'
        className={styles.input}
        value={name}
        onChange={handleChangeName}
      />
    </div>
    <div className={styles.submit}>
      <button className={styles.submitBtn}>
        {
          isEditing ? 'Edit' : 'Add'
        }
      </button>
    </div>
  </form>
}

export default AdminModalCategories