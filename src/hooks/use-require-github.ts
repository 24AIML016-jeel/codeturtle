'use client'
import { useState, useCallback } from 'react'
import { useGithubAccount } from './queries/use-github-account'
export function useRequireGithub() {
  const { data: githubAccount, isLoading } = useGithubAccount()
  const [showDialog, setShowDialog] = useState(false)
  const [requestedFeature, setRequestedFeature] = useState('')
  const requireGithub = useCallback((featureName: string, callback: () => void) => {
    if (!githubAccount && !isLoading) {
      setRequestedFeature(featureName)
      setShowDialog(true)
      return false
    }
    callback()
    return true
  }, [githubAccount, isLoading])
  const hasGithub = !!githubAccount && !isLoading
  return {
    requireGithub,
    hasGithub,
    isLoading,
    showDialog,
    setShowDialog,
    requestedFeature,
  }
}
