'use client'
import { useQuery } from '@tanstack/react-query'
interface Account {
  id: string
  providerId: string
  accountId: string
}
export function useGithubAccount() {
  return useQuery({
    queryKey: ['github-account'],
    queryFn: async () => {
      const res = await fetch('/api/user/github-account')
      if (!res.ok) {
        if (res.status === 404) return null
        throw new Error('Failed to check GitHub account')
      }
      return res.json() as Promise<Account>
    },
  })
}
