import type { APIRoute } from "astro";
import { apiService, TOKEN_STORAGE_KEY } from "../../../lib/api";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  try {
    const result = await apiService.signup(email, password);

    if (!result.success) {
      return new Response(result.error || "Signup failed", { status: 400 });
    }

    if (result.data?.session?.access_token) {
      // Set the token as a cookie
      cookies.set(TOKEN_STORAGE_KEY, result.data.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return redirect("/dashboard");
    }

    return new Response("Signup failed", { status: 400 });
  } catch (error) {
    return new Response("An unexpected error occurred", { status: 500 });
  }
};
