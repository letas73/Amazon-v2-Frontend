'use client'
import { useEffect, useRef, useState } from "react"

export const useOutside = (initialValue: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(initialValue)
  const ref = useRef(null)

  const handleClickOutside = (e: any) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { isShow, ref, setIsShow }
}