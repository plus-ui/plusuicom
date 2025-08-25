import { useState } from "react";
import FormInput from "./FormInput";
import SocialButton from "./SocialButton";
import { authService } from "../../lib/supabase";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authService.signIn(
        formData.email,
        formData.password,
      );

      if (error) {
        setError((error as any)?.message || "Giriş yapılırken bir hata oluştu");
        return;
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Beklenmeyen bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      const { data, error } = await authService.signInWithOAuth(provider);

      if (error) {
        setError((error as any)?.message || "OAuth girişi başarısız oldu");
        return;
      }

      // In a real implementation, redirect to OAuth URL
      console.log(`OAuth URL: ${data.url}`);
      // For demo, redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("OAuth girişi sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-color-default mb-16 text-3xl font-semibold">
          Log in to your account
        </h1>
      </div>

      {/* Social login buttons */}
      <div className="space-y-3">
        {/* <SocialButton 
          provider="google" 
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
        />
        <SocialButton 
          provider="github" 
          onClick={() => handleSocialLogin('github')}
          disabled={loading}
        /> */}
        <plus-button
          kind="outlined"
          full-width
          onClick={() => handleSocialLogin("google")}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon icon="logos:google-icon" className="h-5 w-5" />
            <span>Continue with Google</span>
          </div>
        </plus-button>
        <plus-button
          kind="outlined"
          full-width
          onClick={() => handleSocialLogin("github")}
        >
          <div className="flex items-center justify-center gap-2">
            <Icon icon="logos:github-icon" className="h-5 w-5" />
            <span>Continue with GitHub</span>
          </div>
        </plus-button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          required
          icon="email"
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, password: value }))
          }
          required
        />

        <button
          type="submit"
          disabled={loading || !formData.email || !formData.password}
          className={`flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${
            loading || !formData.email || !formData.password
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          } `}
        >
          {loading ? (
            <>
              <svg
                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              Continue
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </button>
      </form>

     
    </div>
  );
}
