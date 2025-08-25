// Auth context and utilities
export type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}

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

// Local storage keys
export const AUTH_STORAGE_KEYS = {
  REGISTER_STEP: 'plus_register_step',
  REGISTER_DATA: 'plus_register_data',
  ONBOARDING_DATA: 'plus_onboarding_data',
  PLAN_SELECTION: 'plus_plan_selection',
  USER_SESSION: 'plus_user_session'
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
