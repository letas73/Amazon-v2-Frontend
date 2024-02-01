import { FC } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from './CartButton.module.scss'
import { useMutation } from '@tanstack/react-query';
import { AddCartItemDto } from '@/services/cart/cart.interface';
import cartService from '@/services/cart/cart.service';
import { useQueryBasketItem } from '@/hooks/actions/useQueryBasketItem';

interface IProps extends AddCartItemDto {}

const CartButton: FC<IProps> = ({ title, basketId, image, price, productId }) => {
  const { refetch } = useQueryBasketItem()

  const { mutate: addMutate } = useMutation({
    mutationKey: ['add-basket-item'],
    mutationFn: (dto: AddCartItemDto) => cartService.add(dto),
    onSuccess: () => {
      refetch()
    }
  })

  const handleClickItem = () => {
    const dto = { 
      title,
      price,
      image,
      basketId,
      productId
    }

    addMutate(dto)
  }

  return <button onClick={handleClickItem} className={styles.btn}>
    <MdOutlineShoppingCart className={styles.btnIcon} />
  </button>
}

export default CartButton