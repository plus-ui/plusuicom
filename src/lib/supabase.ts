import { createClient } from '@supabase/supabase-js'

// Mock Supabase configuration for development
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://mock-supabase-url.supabase.co'
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock auth functions for development
export const authService = {
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    // Mock implementation
    console.log('Mock signup:', { email, firstName, lastName })
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    const user = {
      id: '1',
      email,
      user_metadata: { first_name: firstName, last_name: lastName }
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('plus_user_session', JSON.stringify(user))
    }
    
    return {
      data: { user },
      error: null
    }
  },

  async signIn(email: string, password: string) {
    // Mock implementation
    console.log('Mock signin:', { email })
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    const user = {
      id: '1',
      email,
      user_metadata: { first_name: 'Test', last_name: 'User' }
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('plus_user_session', JSON.stringify(user))
    }
    
    return {
      data: { user },
      error: null
    }
  },

  async signInWithOAuth(provider: 'google' | 'github') {
    // Mock implementation
    console.log('Mock OAuth signin:', { provider })
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    return {
      data: { url: `https://mock-oauth-url.com/${provider}` },
      error: null
    }
  },

  async signOut() {
    console.log('Mock signout')
    
    // Remove from localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('plus_user_session')
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    return { error: null }
  },

  async getUser() {
    // Mock implementation - check localStorage for user session
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return { data: { user: null }, error: null }
    }
    
    const userSession = localStorage.getItem('plus_user_session')
    if (userSession) {
      try {
        const user = JSON.parse(userSession)
        return { data: { user }, error: null }
      } catch {
        localStorage.removeItem('plus_user_session')
      }
    }
    
    return { data: { user: null }, error: null }
  }
}

// Mock subscription plans
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
