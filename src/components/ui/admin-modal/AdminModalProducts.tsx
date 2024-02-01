'use client'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from './AdminModal.module.scss'
import { useOutside } from '@/hooks/useOutside';
import { IEditProductItem } from '@/app/(customer)/admin/products/Products';
import { useQueryCategories } from '@/hooks/actions/useQueryCategories';
import uploadFileService from '@/services/upload-file.service';
import { useMutation } from '@tanstack/react-query';
import { ProductCreateDto, ProductUpdateDto } from '@/services/products/products.interface';
import productsService from '@/services/products/products.service';
import { useQueryProducts } from '@/hooks/actions/useQueryProducts';
import { toast } from 'react-toastify';

interface IProps {
  item: IEditProductItem | null
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  visibleModal: boolean
}

export interface CategoryState {
  id: number
  name: string
}

const AdminModalProducts: FC<IProps> = ({ item, onCloseModal, visibleModal }) => {
  const isEditing = !!item
  const { data: categories } = useQueryCategories()
  const { refetch } = useQueryProducts()
  const { isShow, ref, setIsShow } = useOutside(false)

  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [imagesUrl, setImagesUrl] = useState<string[]>([''])
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<CategoryState | null>(null)

  const inputFileRef = useRef(null)

  const handleClickShowSelect = () => {
    setIsShow(!isShow)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  const handleChangeDescr = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleChangeCategory = (categoryId: number, name: string) => {
    const categoryItem: CategoryState = {
      id: categoryId,
      name
    }
    setCategory(categoryItem)
    setIsShow(false)
  }

  const handleChangeImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const files = e.target.files

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
    }

    const filesData = await uploadFileService.upload(formData)
    setImagesUrl(filesData)
  }

  const handleClickInputFile = () => {
    if (inputFileRef) {
      // @ts-ignore
      inputFileRef.current.click()
    }
  }

  const { mutate: createMutate } = useMutation({
    mutationKey: ['create-product'],
    mutationFn: (dto: ProductCreateDto) => productsService.create(dto),
    onSuccess: () => {
      refetch()
      setTitle('')
      setPrice('')
      setDescription('')
      setImagesUrl([])
      setCategory(null)
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
    mutationKey: ['edit-product'],
    mutationFn: (dto: ProductUpdateDto) => productsService.update(dto),
    onSuccess: () => {
      refetch()
      setTitle('')
      setPrice('')
      setDescription('')
      setImagesUrl([])
      setCategory(null)
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
      const updateDto: ProductUpdateDto = {
        id: item.id,
        body: {
          title,
          price: Number(price),
          description,
          images: imagesUrl,
          categoryId: category?.id
        }
      }
      editMutate(updateDto)
    } else {
      if (category) {
        const createDto: ProductCreateDto = {
          title,
          price: Number(price),
          description,
          categoryId: category.id,
          images: imagesUrl
        }
        createMutate(createDto)
      }
    }
  }

  useEffect(() => {
    if (!visibleModal) {
      setTitle('')
      setPrice('')
      setDescription('')
      setImagesUrl([])
      setCategory(null)
    }
  }, [visibleModal])

  useEffect(() => {
    if (isEditing) {
      setTitle(item.title)
      setPrice(String(item.price))
      setDescription(item.description)
      setImagesUrl(item.images)
      setCategory(item.category)
    }
  }, [isEditing])

  return <form onSubmit={onSubmit} className={styles.form}>
    <div className={styles.formField}>
      <label className={styles.label}>
        Title
      </label>
      <input
        type="text"
        placeholder='Title'
        className={styles.input}
        value={title}
        onChange={handleChangeTitle}
      />
    </div>
    <div className={styles.formField}>
      <label className={styles.label}>
        Price
      </label>
      <input
        type="number"
        placeholder='Price'
        className={styles.input}
        value={price}
        onChange={handleChangePrice}
      />
    </div>
    <div className={styles.formField}>
      <div className={styles.label}>
        Category
      </div>
      <div ref={ref} className={styles.select}>
        <button onClick={handleClickShowSelect} type='button' className={styles.selectBtn}>
          <span className={styles.selectValue}>
            {
              category ? category.name : 'Select category'
            }
          </span>
          {
            isShow ? (
              <IoIosArrowUp className={styles.selectArrow} />
            ) : (
              <IoIosArrowDown className={styles.selectArrow} />
            )
          }
        </button>
        <div className={`${styles.selectList} ${isShow && styles.active}`}>
          {
            categories.map((item) => (
              <div
                key={item.id}
                className={styles.selectListItem}
                onClick={() => handleChangeCategory(item.id, item.name)}
              >
                {item.name}
              </div>
            ))
          }
        </div>
      </div>
    </div>
    <div className={styles.formField}>
      <label className={styles.label}>
        Product description
      </label>
      <textarea
        placeholder='Product description'
        className={styles.textarea}
        value={description}
        onChange={handleChangeDescr}
      />
    </div>
    <div className={styles.formField}>
      <label className={styles.label}>
        Images
      </label>
      <input
        ref={inputFileRef}
        type='file'
        onChange={handleChangeImages}
        hidden
        multiple
      />
      <button type='button' onClick={handleClickInputFile} className={styles.fileBtn}>
        Select files
      </button>
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

export default AdminModalProducts