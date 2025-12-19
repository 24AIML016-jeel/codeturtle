'use client'
import { ReactNode } from 'react'
import { useRequireGithub } from '@/hooks/use-require-github'
import { GithubLinkDialog } from './link-dialog'
interface GithubFeatureWrapperProps {
  children: (requireGithub: (featureName: string, callback: () => void) => boolean, hasGithub: boolean) => ReactNode
}
export function GithubFeatureWrapper({ children }: GithubFeatureWrapperProps) {
  const { requireGithub, hasGithub, showDialog, setShowDialog, requestedFeature } = useRequireGithub()
  return (
    <>
      {children(requireGithub, hasGithub)}
      <GithubLinkDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        feature={requestedFeature}
      />
    </>
  )
}
