# GitHub Feature Protection

Reusable components and hooks to protect GitHub-specific features and prompt users to link their GitHub account.

## Usage

### Option 1: Using the Wrapper Component (Recommended)

```tsx
import { GithubFeatureWrapper } from '@/components/github/feature-wrapper'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <GithubFeatureWrapper>
      {(requireGithub, hasGithub) => (
        <div>
          <Button 
            onClick={() => requireGithub(
              'Feature Name',
              () => {
                // Your GitHub feature logic here
                console.log('Running GitHub feature')
              }
            )}
          >
            GitHub Feature
          </Button>
          
          {hasGithub && <p>GitHub is connected!</p>}
        </div>
      )}
    </GithubFeatureWrapper>
  )
}
```

### Option 2: Using the Hook Directly

```tsx
import { useRequireGithub } from '@/hooks/use-require-github'
import { GithubLinkDialog } from '@/components/github/link-dialog'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  const { requireGithub, hasGithub, showDialog, setShowDialog, requestedFeature } = useRequireGithub()

  return (
    <>
      <Button 
        onClick={() => requireGithub(
          'Sync Repositories',
          () => {
            // Your logic here
            syncGithubRepos()
          }
        )}
      >
        Sync GitHub Repos
      </Button>

      <GithubLinkDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        feature={requestedFeature}
      />
    </>
  )
}
```

### Option 3: Query Hook Only (Check Status)

```tsx
import { useGithubAccount } from '@/hooks/queries/use-github-account'

export function MyComponent() {
  const { data: githubAccount, isLoading } = useGithubAccount()

  if (isLoading) return <div>Loading...</div>
  if (!githubAccount) return <div>No GitHub linked</div>

  return <div>GitHub Account ID: {githubAccount.accountId}</div>
}
```

## API

### `useRequireGithub()`

Returns:
- `requireGithub(featureName: string, callback: () => void)` - Execute callback if GitHub is linked, show dialog otherwise
- `hasGithub: boolean` - Whether GitHub account is linked
- `isLoading: boolean` - Loading state
- `showDialog: boolean` - Dialog visibility state
- `setShowDialog: (boolean) => void` - Control dialog visibility
- `requestedFeature: string` - Name of the feature that triggered the dialog

### `GithubFeatureWrapper`

Props:
- `children: (requireGithub, hasGithub) => ReactNode` - Render prop with access to `requireGithub` function and `hasGithub` status

### `useGithubAccount()`

Returns React Query result with:
- `data: { id, providerId, accountId } | null`
- `isLoading: boolean`
- `error: Error | null`
