'use client'

import React, { useState } from 'react'
import { RegisterForm } from '@/components/RegisterForm'
import Navbar from '@/components/Navbar'
import {
  AuthPage,
  PageWrapper,
  BackLink,
} from '../../components/Authlayout'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (data: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setIsLoading(true)
    setError('')
    try {
      console.log('Register data:', data)
    } catch (err: any) {
      setError(err?.message ?? 'Błąd rejestracji. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthPage>
      <Navbar />
      <PageWrapper>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
        <BackLink href="/#">Powrót do katalogu</BackLink>
      </PageWrapper>
    </AuthPage>
  )
}
