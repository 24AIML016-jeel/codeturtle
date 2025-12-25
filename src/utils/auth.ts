import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export const authenticateWithGithub = async () => {
  return toast.promise(
    authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    }),
    {
      loading: 'Signing in with GitHub...',
      success: 'Redirecting to GitHub...',
      error: (err) => err?.message || 'Failed to sign in with GitHub'
    }
  )
}