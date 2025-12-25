import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export const authenticateWithGithub = async () => {
  try {
    toast.loading('Signing in with GitHub...');
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    });
    toast.success('Redirecting to GitHub...');
  } catch (error) {
    toast.error(error?.message || 'Failed to sign in with GitHub');
    throw error;
  }
}