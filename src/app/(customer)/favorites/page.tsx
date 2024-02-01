import { FC } from 'react'
import { Metadata } from 'next'
import Favorites from './Favorites'

export const revalidate = 10

export const metadata: Metadata = {
  title: 'Favorites | Amazon Store'
}

const page: FC = () => {
  return <div className='h-[100vh] p-8 w-full'>
    <Favorites />
  </div>
}

export default page