'use client'
import { FC } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import styles from './FavoriteButton.module.scss'
import { AddFavoriteDto } from '@/services/favorites/favorites.interface';
import { useMutation } from '@tanstack/react-query';
import favoritesService from '@/services/favorites/favorites.service';
import { useQueryFavoriteItems } from '@/hooks/actions/useQueryFavoriteItems';

interface IProps extends AddFavoriteDto { }

const FavoriteButton: FC<IProps> = ({ title, favoriteId, image, price, productId }) => {
  const { refetch } = useQueryFavoriteItems()
  const { data } = useQueryFavoriteItems()
  const findItem = data.find((item) => item.productId === productId)

  const { mutate: addMutate } = useMutation({
    mutationKey: ['add-favorite-item'],
    mutationFn: (dto: AddFavoriteDto) => favoritesService.add(dto),
    onSuccess() {
      refetch()
    }
  })

  const { mutate: removeMutate } = useMutation({
    mutationKey: ['remove-favorite-item'],
    mutationFn: (id: number) => favoritesService.remove(id),
    onSuccess() {
      refetch()
    }
  })

  const handleClickAddFavorite = () => {
    if (findItem) {
      removeMutate(findItem.id)
    } else {
      const dto = {
        title,
        favoriteId,
        image,
        price,
        productId
      }

      addMutate(dto)
    }
  }

  return <button onClick={handleClickAddFavorite} className={styles.btn}>
    {
      findItem ? (
        <MdFavorite className={`${styles.btnIcon} text-primary`} />
      ) : (
        <MdFavoriteBorder className={styles.btnIcon} />
      )
    }
  </button>
}

export default FavoriteButton