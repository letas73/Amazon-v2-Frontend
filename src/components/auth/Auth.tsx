'use client'
import { FC, useState } from 'react'
import styles from './Auth.module.scss'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Link from 'next/link'

const Auth: FC = () => {
  const [typeForm, setTypeForm] = useState<'login' | 'register'>('login')

  const changeTypeForm = (type: 'login' | 'register') => {
    setTypeForm(type)
  }

  return <div className={styles.auth}>
    <Link href='/' className={styles.link}>
      Go back
    </Link>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {
          typeForm === 'login' ? 'Sign In' : 'Register'
        }
      </h1>
      {
        typeForm === 'login' && <LoginForm />
      }
      {
        typeForm === 'register' && <RegisterForm />
      }
      {
        typeForm === 'login' && (
          <button onClick={() => changeTypeForm('register')} className={styles.btn}>
            Register
          </button>
        )
      }
      {
        typeForm === 'register' && (
          <button onClick={() => changeTypeForm('login')} className={styles.btn}>
            Sign In
          </button>
        )
      }
    </div>
  </div>
}

export default Auth