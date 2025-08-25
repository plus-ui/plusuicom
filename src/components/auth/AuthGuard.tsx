import { useEffect, useState } from 'react'
import { authService } from '../../lib/supabase'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export default function AuthGuard({ 
  children, 
  redirectTo = '/login', 
  requireAuth = true 
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const { data } = await authService.getUser()
      const isLoggedIn = !!data.user
      
      setIsAuthenticated(isLoggedIn)
      
      if (requireAuth && !isLoggedIn) {
        window.location.href = redirectTo
        return
      }
      
      if (!requireAuth && isLoggedIn) {
        window.location.href = '/dashboard'
        return
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
      
      if (requireAuth && typeof window !== 'undefined') {
        window.location.href = redirectTo
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect
  }

  if (!requireAuth && isAuthenticated) {
    return null // Will redirect
  }

  return <>{children}</>
}
