// Backend API service
const API_BASE_URL = 'https://plus-ui-backend.onrender.com'

export type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
}

export type AuthResponse = {
  user: {
    id: string
    email: string
    [key: string]: any
  }
  session: {
    access_token: string
    refresh_token: string
    user: User
    [key: string]: any
  }
}

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
}

class ApiService {
  private baseUrl = API_BASE_URL

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const startTime = performance.now();
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log(`🌐 [API] ${options.method || 'GET'} ${url} başlıyor...`);
    
    try {
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      }

      const fetchStartTime = performance.now();
      const response = await fetch(url, config);
      const fetchEndTime = performance.now();
      
      console.log(`📡 [API] Fetch tamamlandı: ${(fetchEndTime - fetchStartTime).toFixed(2)}ms (Status: ${response.status})`);
      
      const parseStartTime = performance.now();
      const data = await response.json();
      const parseEndTime = performance.now();
      
      console.log(`📝 [API] JSON parse tamamlandı: ${(parseEndTime - parseStartTime).toFixed(2)}ms`);

      const totalTime = performance.now() - startTime;
      
      if (!response.ok) {
        console.error(`❌ [API] Request başarısız: ${url} - ${response.status} (${totalTime.toFixed(2)}ms)`);
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`
        }
      }

      console.log(`✅ [API] Request başarılı: ${url} (${totalTime.toFixed(2)}ms)`);
      return {
        success: true,
        data
      }
    } catch (error) {
      const totalTime = performance.now() - startTime;
      console.error(`💥 [API] Network hatası: ${url} (${totalTime.toFixed(2)}ms)`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      }
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  async signup(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  async getProfile(token: string): Promise<ApiResponse<User>> {
    return this.request<User>('/profile/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async updateApiKey(token: string, apiKey: string): Promise<ApiResponse<any>> {
    return this.request('/profile/api-key', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ api_key: apiKey })
    })
  }
}

export const apiService = new ApiService()

// Token utilities
export const TOKEN_STORAGE_KEY = 'plus_auth_token'

export function saveToken(token: string) {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  }
  return null
}

export function removeToken() {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
}

// Cookie utilities for server-side
export function setTokenCookie(response: Response, token: string) {
  const cookie = `${TOKEN_STORAGE_KEY}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}` // 7 days
  response.headers.set('Set-Cookie', cookie)
}

export function getTokenFromCookie(request: Request): string | null {
  const cookie = request.headers.get('Cookie')
  if (!cookie) return null
  
  const match = cookie.match(new RegExp(`${TOKEN_STORAGE_KEY}=([^;]+)`))
  return match ? match[1] : null
}
