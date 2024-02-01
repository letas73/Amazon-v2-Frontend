'use client'
import { FC } from 'react'
import styles from './Auth.module.scss'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { FormDataLogin } from '@/services/auth/auth.types'
import authService from '@/services/auth/auth.service'
import { saveTokenStorage } from '@/helpers/tokens.helper'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/store/hooks'
import { saveUser } from '@/store/user/user'

const LoginForm: FC = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: FormDataLogin) => authService.login(data),
    onSuccess(data) {
      saveTokenStorage(data.accessToken)
      dispatch(saveUser(data.user))
      reset()
      router.push('/')
    },
    onError(error: any) {
      toast.error(error.response.data.message, {
        style: {
          color: '#ff9900',
          backgroundColor: '#161d25',
          fontWeight: 500
        }
      })
    }
  })

  const onSubmit = (values: FormDataLogin) => {
    mutate(values)
  }

  return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
    <div className={styles.item}>
      <label className={styles.label}>
        Email
      </label>
      <input
        type="email"
        placeholder='Email'
        className={styles.input}
        {...register('email', { required: 'Email cannot be empty' })}
      />
      <div className={styles.error}>
        {errors.email?.message}
      </div>
    </div>
    <div className={styles.item}>
      <label className={styles.label}>
        Password
      </label>
      <input
        type="password"
        placeholder='Password'
        className={styles.input}
        {...register('password', { required: 'Password cannot be empty' })}
      />
      <div className={styles.error}>
        {errors.password?.message}
      </div>
    </div>
    <button className={styles.submit}>
      Lets go
    </button>
  </form>
}

export default LoginForm