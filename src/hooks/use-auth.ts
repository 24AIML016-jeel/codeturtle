'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/features/auth'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'
export function useAuth() {
  const session = authClient.useSession()
  const router = useRouter()
  const { setUser, clearUser } = useAuthStore()
  
  useEffect(() => {
    if (session.data) {
      setUser(session.data.user)
    } else if (session.data === null) {
      clearUser()
    }
  }, [session.data, setUser, clearUser])

  const signOut = async () => {
    try {
      await authClient.signOut()
      clearUser()
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  return {
    session: session.data,
    isLoading: session.isPending,
    isAuthenticated: !!session.data,
    signOut,
  }
}
export function useRequireAuth() {
  const { session, isLoading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login')
    }
    }, [isLoading, session, router]) 

  return { session, isLoading, signOut }
}
export function useRedirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const { session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && session) {
      router.replace(redirectTo)
    }
  }, [isLoading, session, router, redirectTo])
  
  return { isLoading }
}
