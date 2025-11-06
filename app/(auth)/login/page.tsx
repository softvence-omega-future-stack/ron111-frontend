"use client";

import { useState, useEffect } from "react";
import { MapPin, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/libraryApi";
import { encryptData, decryptData } from "@/utils/crypto";

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();

  // Initialize from localStorage using lazy state initializers to avoid synchronous setState in effects
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    const rememberToken = localStorage.getItem("rememberToken");
    if (!rememberToken) return "";
    try {
      const decrypted = decryptData(rememberToken);
      const { email: savedEmail } = JSON.parse(decrypted);
      return savedEmail ?? "";
    } catch {
      localStorage.removeItem("rememberToken");
      return "";
    }
  });

  const [password, setPassword] = useState(() => {
    if (typeof window === "undefined") return "";
    const rememberToken = localStorage.getItem("rememberToken");
    if (!rememberToken) return "";
    try {
      const decrypted = decryptData(rememberToken);
      const { password: savedPassword } = JSON.parse(decrypted);
      return savedPassword ?? "";
    } catch {
      return "";
    }
  });

  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window === "undefined") return false;
    const rememberToken = localStorage.getItem("rememberToken");
    if (!rememberToken) return false;
    try {
      const decrypted = decryptData(rememberToken);
      const { email: savedEmail } = JSON.parse(decrypted);
      return !!savedEmail;
    } catch {
      return false;
    }
  });

  const [loginUser, { isLoading, isError, data }] = useLoginUserMutation();

  // Effect only handles redirect if already logged in; state is already initialized above
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Redirect to home if already logged in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.replace("/"); // navigate to home
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();

      if (response?.success) {
        localStorage.setItem("accessToken", response.token.accessToken);
        localStorage.setItem("refreshToken", response.token.refreshToken);

        if (rememberMe) {
          localStorage.setItem(
            "rememberToken",
            encryptData(JSON.stringify({ email, password }))
          );
        } else {
          localStorage.removeItem("rememberToken");
        }

        router.replace("/"); // redirect to home without continuous reload
      } else {
        alert(response?.error || "Login failed.");
      }
    } catch {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-3">
            <MapPin className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-gray-800 font-semibold text-lg mb-1">RouteOptima</h1>
          <p className="text-gray-500 text-sm">Smart Job Scheduling Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-gray-900 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dispatcher@company.com"
                  className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forget-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
            >
              {isLoading ? <LoadingSpinner /> : "Sign In"}
            </button>
          </form>

          {isError && <p className="text-red-500 text-sm mt-3">Invalid email or password.</p>}
          {data && data?.message && <p className="text-green-600 text-sm mt-3">{data.message}</p>}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">© 2025 RouteOptima. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
