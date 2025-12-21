import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


interface GithubAccount {
  id: string
  providerId: string
  accountId: string
}

interface GithubUser {
  id: number
  login: string
  name: string | null
  email: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  private: boolean
  fork: boolean
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}


export const githubKeys = {
  account: ['github', 'account'] as const,
  user: ['github', 'user'] as const,
  repos: (page?: number, perPage?: number) => ['github', 'repos', page, perPage] as const,
  repo: (owner: string, repo: string) => ['github', 'repo', owner, repo] as const,
}


export function useGithubAccount() {
  return useQuery({
    queryKey: githubKeys.account,
    queryFn: async (): Promise<GithubAccount | null> => {
      const res = await fetch('/api/user/github-account')
      if (!res.ok) {
        if (res.status === 404) return null
        throw new Error('Failed to check GitHub account')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData,
  })
}

export function useGithubUser() {
  return useQuery({
    queryKey: githubKeys.user,
    queryFn: async (): Promise<GithubUser> => {
      const res = await fetch('/api/user/github-user')
      if (!res.ok) {
        throw new Error('Failed to fetch GitHub user')
      }
      return res.json()
    },
    enabled: false,
    placeholderData: (previousData) => previousData,
  })
}

export function useGithubRepos(page = 1, perPage = 30) {
  return useQuery({
    queryKey: githubKeys.repos(page, perPage),
    queryFn: async (): Promise<GithubRepo[]> => {
      const res = await fetch(`/api/user/github-repos?page=${page}&per_page=${perPage}`)
      if (!res.ok) {
        throw new Error('Failed to fetch GitHub repositories')
      }
      return res.json()
    },
    enabled: false,
    placeholderData: (previousData) => previousData,
  })
}

export function useGithubRepo(owner: string, repo: string) {
  return useQuery({
    queryKey: githubKeys.repo(owner, repo),
    queryFn: async (): Promise<GithubRepo> => {
      const encodedOwner = encodeURIComponent(owner)
      const encodedRepo = encodeURIComponent(repo)
      const res = await fetch(`/api/user/github-repo/${encodedOwner}/${encodedRepo}`)
      if (!res.ok) {
        throw new Error('Failed to fetch GitHub repository')
      }
      return res.json()
    },
    enabled: !!owner && !!repo,
    placeholderData: (previousData) => previousData,
  })
}


export function useLinkGithubAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch('/api/user/github-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (!res.ok) {
        throw new Error('Failed to link GitHub account')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: githubKeys.account })
      toast.success('GitHub account linked successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to link GitHub account')
    },
  })
}

export function useUnlinkGithubAccount() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/user/github-unlink', {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to unlink GitHub account')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: githubKeys.account })
      queryClient.removeQueries({ queryKey: githubKeys.user })
      // Remove any paginated repos queries (match by key prefix)
      queryClient.removeQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'github' &&
          query.queryKey[1] === 'repos',
      })
      toast.success('GitHub account unlinked successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to unlink GitHub account')
    },
  })
}

export function useSyncGithubRepos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/user/github-sync-repos', {
        method: 'POST',
      })
      if (!res.ok) {
        throw new Error('Failed to sync GitHub repositories')
      }
      return res.json()
    },
    onSuccess: () => {
      // Invalidate all paginated repos queries
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'github' &&
          query.queryKey[1] === 'repos',
      })
      toast.success('GitHub repositories synced successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to sync GitHub repositories')
    },
  })
}


export function useGithubAuthUrl() {
  return useQuery({
    queryKey: ['github', 'auth-url'],
    queryFn: async (): Promise<{ url: string }> => {
      const res = await fetch('/api/user/github-auth-url')
      if (!res.ok) {
        throw new Error('Failed to get GitHub auth URL')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  })
}
