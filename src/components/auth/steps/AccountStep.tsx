import { useState } from 'react'
import FormInput from '../FormInput'
import SocialButton from '../SocialButton'
import { authService } from '../../../lib/supabase'

interface AccountStepProps {
  data: any
  onComplete: (data: any) => void
  onBack?: () => void
}

export default function AccountStep({ data, onComplete }: AccountStepProps) {
  const [formData, setFormData] = useState({
    email: data?.email || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    password: data?.password || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: authData, error } = await authService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      )
      
      if (error) {
        setError((error as any)?.message || 'Kayıt olurken bir hata oluştu')
        return
      }

      // Save account data and proceed to next step
      onComplete({
        ...formData,
        userId: authData.user?.id
      })
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialRegister = async (provider: 'google' | 'github') => {
    setLoading(true)
    try {
      const { data, error } = await authService.signInWithOAuth(provider)
      
      if (error) {
        setError((error as any)?.message || 'OAuth kaydı başarısız oldu')
        return
      }

      // In a real implementation, handle OAuth flow
      console.log(`OAuth URL: ${data.url}`)
      // For demo, proceed to next step with mock data
      onComplete({
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        provider
      })
    } catch (err) {
      setError('OAuth kaydı sırasında hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.firstName && formData.lastName && formData.password

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your free account
        </h1>
      </div>

      {/* Social registration buttons */}
      <div className="space-y-3">
        <SocialButton 
          provider="google" 
          onClick={() => handleSocialRegister('google')}
          disabled={loading}
        />
        <SocialButton 
          provider="github" 
          onClick={() => handleSocialRegister('github')}
          disabled={loading}
        />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          required
          icon="email"
        />

        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Name"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
            required
          />
          
          <FormInput
            label="Surname"
            type="text"
            placeholder="Enter your surname"
            value={formData.lastName}
            onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
            required
          />
        </div>

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
          required
        />

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`
            w-full flex items-center justify-center px-4 py-2.5 border border-transparent 
            rounded-lg text-sm font-medium text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:ring-offset-2 transition-colors duration-200
            ${loading || !isFormValid 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'
            }
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </>
          ) : (
            <>
              Continue
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Terms and privacy */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to Plus UI's{' '}
          <a href="/terms" className="text-indigo-600 hover:text-indigo-500 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 underline">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Login link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
