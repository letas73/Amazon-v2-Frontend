'use client'
import { FC, useState } from 'react'
import styles from './CarouselImages.module.scss'
import Image from 'next/image'

interface IProps {
  images: string[]
}

const CarouselImages: FC<IProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<string>(images[0])

  const handleChangeImage = (value: string) => {
    setCurrentImage(value)
  }

  return <div className={styles.carousel}>
    <div className={styles.current}>
      <Image
        src={`http://localhost:5000/${currentImage}`}
        alt='product title'
        width={300}
        height={350}
        className={styles.currentImage}
      />
    </div>
    <div className={styles.list}>
      {
        images.map((image) => (
          <div
            key={image}
            className={`${styles.item} ${currentImage === image && styles.active}`}
            onClick={() => handleChangeImage(image)}
          >
            <Image
              src={`http://localhost:5000/${image}`}
              alt='product title'
              width={90}
              height={90}
              className={styles.itemImg}
            />
          </div>
        ))
      }
    </div>
  </div>
}

export default CarouselImages