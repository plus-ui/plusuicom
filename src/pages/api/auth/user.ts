import type { APIRoute } from "astro";
import { apiService, TOKEN_STORAGE_KEY } from "../../../lib/api";

export const GET: APIRoute = async ({ cookies }) => {
  const authToken = cookies.get(TOKEN_STORAGE_KEY);
  
  if (!authToken) {
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  try {
    const result = await apiService.getProfile(authToken.value);
    
    if (!result.success || !result.data) {
      return new Response(JSON.stringify({ user: null }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Map backend user format to our User type
    const user = {
      id: result.data.id,
      email: result.data.email,
      firstName: result.data.user_metadata?.first_name,
      lastName: result.data.user_metadata?.last_name,
      avatar: result.data.user_metadata?.avatar_url,
    };
    
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ user: null }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
