import type { APIRoute } from "astro";
import { TOKEN_STORAGE_KEY } from "../../../lib/api";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Clear auth token cookie
  cookies.delete(TOKEN_STORAGE_KEY, {
    path: "/",
  });

  return redirect("/");
};
