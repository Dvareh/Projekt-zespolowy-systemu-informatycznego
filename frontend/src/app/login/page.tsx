'use client'

import React, { useState } from 'react'
import { LoginForm } from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import {
  AuthPage,
  PageWrapper,
  BackLink,
} from '@/components/Authlayout'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')
    try {
      console.log('Login data:', data)
    } catch (err: any) {
      setError(err?.message ?? 'Błąd logowania. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthPage>
      <Navbar />
      <PageWrapper>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <BackLink href="/#">Powrót do katalogu</BackLink>
      </PageWrapper>
    </AuthPage>
  )
}
