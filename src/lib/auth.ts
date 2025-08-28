// Auth context and utilities
import { apiService, saveToken, getToken, removeToken, type User } from './api'

export type { User }

export type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

export type RegisterStep = 
  | 'account' 
  | 'plan' 
  | 'payment' 
  | 'onboarding' 
  | 'questions' 
  | 'invite' 
  | 'complete'

export type OnboardingData = {
  usageType: 'personal' | 'work' | 'education'
  companySize?: string
  industry?: string
  workType?: string
  jobTitle?: string
}

export type PlanSelection = {
  planId: string
  period: 'monthly' | 'yearly'
  users: number
}

export type PaymentData = {
  email: string
  cardNumber: string
  expiryDate: string
  cvc: string
  holderName: string
  country: string
  zip: string
}

// Local storage keys (for non-sensitive data)
export const AUTH_STORAGE_KEYS = {
  REGISTER_STEP: 'plus_register_step',
  REGISTER_DATA: 'plus_register_data',
  ONBOARDING_DATA: 'plus_onboarding_data',
  PLAN_SELECTION: 'plus_plan_selection',
} as const

// Register flow utilities
export const registerSteps: RegisterStep[] = [
  'account',
  'plan', 
  'payment',
  'onboarding',
  'questions',
  'invite',
  'complete'
]

export function getNextStep(currentStep: RegisterStep): RegisterStep | null {
  const currentIndex = registerSteps.indexOf(currentStep)
  if (currentIndex === -1 || currentIndex === registerSteps.length - 1) {
    return null
  }
  return registerSteps[currentIndex + 1]
}

export function getPreviousStep(currentStep: RegisterStep): RegisterStep | null {
  const currentIndex = registerSteps.indexOf(currentStep)
  if (currentIndex <= 0) {
    return null
  }
  return registerSteps[currentIndex - 1]
}

export function saveRegisterProgress(step: RegisterStep, data?: any) {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEYS.REGISTER_STEP, step)
    if (data) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTER_DATA, JSON.stringify(data))
    }
  }
}

export function getRegisterProgress(): { step: RegisterStep; data: any } {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return { step: 'account', data: null }
  }
  
  const step = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTER_STEP) as RegisterStep || 'account'
  const dataStr = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTER_DATA)
  const data = dataStr ? JSON.parse(dataStr) : null
  
  return { step, data }
}

export function clearRegisterProgress() {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEYS.REGISTER_STEP)
    localStorage.removeItem(AUTH_STORAGE_KEYS.REGISTER_DATA)
    localStorage.removeItem(AUTH_STORAGE_KEYS.ONBOARDING_DATA)
    localStorage.removeItem(AUTH_STORAGE_KEYS.PLAN_SELECTION)
  }
}

// Auth utilities
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = getToken()
    if (!token) return null
    
    const result = await apiService.getProfile(token)
    if (result.success && result.data) {
      return result.data
    }
    
    // Token geçersizse kaldır
    if (!result.success) {
      removeToken()
    }
    
    return null
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const result = await apiService.login(email, password)
    
    if (result.success && result.data) {
      const token = result.data.session?.access_token
      const user = result.data.session?.user || result.data.user
      
      if (token) {
        saveToken(token)
        return { success: true, user }
      }
    }
    
    return { success: false, error: result.error || 'Login failed' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Login failed' }
  }
}

export async function signup(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const result = await apiService.signup(email, password)
    
    if (result.success && result.data) {
      const token = result.data.session?.access_token
      const user = result.data.session?.user || result.data.user
      
      if (token) {
        saveToken(token)
        return { success: true, user }
      }
    }
    
    return { success: false, error: result.error || 'Signup failed' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Signup failed' }
  }
}

export function logout() {
  removeToken()
  // Sayfayı yenileyerek kullanıcıyı login sayfasına yönlendir
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

// Subscription plans (moved from supabase.ts)
export const subscriptionPlans = [
  {
    id: 'community',
    name: 'Community',
    price: 0,
    period: 'forever',
    features: [
      'Free Design System on Figma',
      'Free UI Library',
      'Basic Blocks',
      'Limited access to PlusHub'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    period: 'monthly',
    yearlyPrice: 144,
    features: [
      'Pro Design System on Figma',
      'Pro UI Library',
      'Advanced Blocks',
      'Full access to PlusHub'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    period: 'monthly',
    yearlyPrice: 470,
    features: [
      'Pro Design System on Figma',
      'Pro UI Library',
      'Advanced Blocks',
      'Full access to PlusHub',
      'Full access to Plus UI Templates'
    ]
  }
]
