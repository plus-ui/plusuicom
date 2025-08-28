import { defineMiddleware } from 'astro:middleware';
import { apiService, TOKEN_STORAGE_KEY } from './lib/api';

// Token cache to avoid repeated API calls
const tokenCache = new Map<string, { user: any; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 dakika cache

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, redirect } = context;
  const url = new URL(request.url);
  const startTime = performance.now();
  
  console.log(`🚀 [Middleware] ${request.method} ${url.pathname} başladı`);
  
  // Protected routes - only authenticate these routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));
  
  // Skip auth check for non-protected routes
  if (!isProtectedRoute) {
    const response = await next();
    const endTime = performance.now();
    console.log(`🏁 [Middleware] ${request.method} ${url.pathname} tamamlandı (korumasız): ${(endTime - startTime).toFixed(2)}ms`);
    return response;
  }
  
  // This is a protected route, check authentication
  const authToken = cookies.get(TOKEN_STORAGE_KEY);
  
  if (!authToken) {
    return redirect('/login');
  }
  
  try {
    const token = authToken.value;
    const now = Date.now();
    
    // Check cache first
    const cached = tokenCache.get(token);
    if (cached && cached.expiry > now) {
      console.log(`💾 [Middleware] Cache'den kullanıcı bilgisi alındı: ${cached.user?.email || 'unknown'}`);
      context.locals.user = cached.user;
    } else {
      // Cache expired or doesn't exist, make API call
      const apiStartTime = performance.now();
      console.log(`📡 [Middleware] API çağrısı başlıyor: /profile/me`);
      
      // Verify token with backend
      const result = await apiService.getProfile(token);
      
      const apiEndTime = performance.now();
      console.log(`📡 [Middleware] API çağrısı tamamlandı: ${(apiEndTime - apiStartTime).toFixed(2)}ms`);
      
      if (!result.success) {
        console.log(`❌ [Middleware] Token geçersiz, login'e yönlendiriliyor`);
        // Clear invalid token and redirect to login
        tokenCache.delete(token);
        cookies.delete(TOKEN_STORAGE_KEY, { path: '/' });
        return redirect('/login');
      }
      
      // Store user data in locals to be accessed by pages
      context.locals.user = result.data || null;
      
      // Cache the result
      tokenCache.set(token, {
        user: result.data,
        expiry: now + CACHE_DURATION
      });
      
      console.log(`✅ [Middleware] Kullanıcı doğrulandı ve cache'lendi: ${result.data?.email || 'unknown'}`);
    }
    
    // Token is valid, continue to the protected route
  } catch (error) {
    console.error(`💥 [Middleware] API çağrısında hata:`, error);
    // Clear cookies and redirect to login on error
    cookies.delete(TOKEN_STORAGE_KEY, { path: '/' });
    return redirect('/login');
  }
  
  const response = await next();
  const endTime = performance.now();
  console.log(`🏁 [Middleware] ${request.method} ${url.pathname} tamamlandı: ${(endTime - startTime).toFixed(2)}ms`);
  
  return response;
});
