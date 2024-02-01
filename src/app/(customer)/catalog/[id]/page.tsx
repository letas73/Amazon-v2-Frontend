import { FC } from 'react'
import Link from 'next/link';
import CarouselImages from '@/components/carousel-images/CarouselImages';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md"
import { FaLock } from "react-icons/fa6";
import styles from './page.module.scss'
import { Metadata } from 'next';
import productsService from '@/services/products/products.service';
import reviewsService from '@/services/reviews/reviews.service';
import { averageRating } from '@/helpers/averageRating.helper';
import Ratings from '@/components/ui/ratings/Ratings';
import Reviews from './Reviews';

type IProps = {
  params: {
    id: string
  }
}

export const revalidate = 10

const getStaticParams = async (id: number) => {
  const product = await productsService.getById(id)

  const reviews = await reviewsService.getByProductId(id)

  return {
    product,
    reviews
  }
}

export const generateMetadata = async ({ params: { id } }: IProps): Promise<Metadata> => {
  const data = await productsService.getById(+id)

  return {
    title: data.title
  }
}

const CatalogId: FC<IProps> = async ({ params }) => {
  const { product, reviews } = await getStaticParams(+params.id)
  const averageValueRating = averageRating(product.reviews)

  return <div className={styles.body}>
    <div className='mb-[80px]'>
      <h1 className={styles.title}>
        {product.title}
      </h1>
      {
        <Ratings rating={averageValueRating} />
      }
      <Link href='' className={styles.link}>
        <span className={styles.reviews}>
          {product.reviews.length} Reviews
        </span>
        <MdKeyboardArrowRight className={styles.arrow} />
      </Link>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <CarouselImages images={product.images} />
          <div className={styles.descr}>
            <div className={styles.descrCaption}>
              Description:
            </div>
            <p className={styles.descrText}>
              {product.description}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className='flex items-start justify-between mb-4'>
            <div className={styles.price}>
              ${product.price}
            </div>
            <button className={styles.favoriteBtn}>
              <MdFavoriteBorder className={styles.favoriteBtnIcon} />
            </button>
          </div>
          <div className='flex items-center mb-2'>
            <div className={styles.shipping}>
              $6,88 Shipping
            </div>
            <div className={styles.details}>
              Details
            </div>
          </div>
          <div className='text-[14px] text-secondary mb-4'>
            Sales taxes may apple at checkout
          </div>
          <div className='flex items-center mb-4'>
            <div className='text-[14px] text-secondary mr-2'>
              Delivery
            </div>
            <div className={styles.date}>
              Thursday, June 10
            </div>
          </div>
          <button className={styles.cartBtn}>
            Add to cart
          </button>
          <div className='flex items-center'>
            <FaLock className='text-secondary mr-1' />
            <div className='text-secondary text-[14px] font-medium'>
              Secure transaction
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.similar}>
      <h2 className={styles.similarTitle}>
        Similar products:
      </h2>
      <ul className={styles.similarList}>
        {/* <CatalogItem /> */}
      </ul>
    </div>
    <Reviews reviews={reviews} />
  </div>
}

export default CatalogId