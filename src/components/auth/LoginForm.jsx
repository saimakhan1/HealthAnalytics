"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo login states
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  // LocalStorage sync & redirect according to role
  const handleSuccessLogin = async (userData) => {
    if (userData) {
      localStorage.setItem("health_app_user", JSON.stringify(userData));
    }
    await refreshUser();

    const role = userData?.role?.toLowerCase();
    if (role === "patient") {
      router.push("/dashboard/patient/documents");
    } else if (role === "doctor") {
      router.push("/dashboard/doctor");
    } else if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/patient");
    }
  };

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      await handleSuccessLogin(data.user);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Demo login
  const handleDemoLogin = async (role) => {
    setError("");
    setDemoLoading(true);

    const demoAccounts = {
      patient: {
        email: "demo.patient@healthanalytics.com",
        password: "DemoPatient123!",
      },

      doctor: {
        email: "demo.doctor@healthanalytics.com",
        password: "DemoDoctor123!",
      },

      admin: {
        email: "demo.admin@healthanalytics.com",
        password: "DemoAdmin123!",
      },
    };

    const account = demoAccounts[role];

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: account.email,
          password: account.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || `Demo ${role} account is not available right now.`,
        );
        return;
      }

      setDemoOpen(false);
      await handleSuccessLogin(data.user);
    } catch (error) {
      console.error("Demo login error:", error);
      setError("Unable to login with demo account. Please try again.");
    } finally {
      setDemoLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      if (!credentialResponse?.credential) {
        setError("Google authentication failed.");
        return;
      }

      const response = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Google login failed.");
        return;
      }

      await handleSuccessLogin(data.user);
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="flex min-h-screen items-center justify-center bg-[#fff8f9] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#681225]">Welcome Back</h1>

            <p className="mt-2 text-gray-500">
              Login to your HealthAnalytics account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Normal Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 focus:border-[#8f1730] focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#8f1730] py-3.5 font-bold text-white transition hover:bg-[#6f1024] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Demo Login */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setDemoOpen(!demoOpen);
                setError("");
              }}
              disabled={demoLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#f3cbd2] bg-[#fff8f9] py-3 font-bold text-[#8f1730] transition hover:border-[#a71930] hover:bg-[#fff1f3] disabled:opacity-60"
            >
              <span className="text-lg">✨</span>

              {demoLoading ? "Logging in..." : "Try Demo Login"}

              <span className="text-xs">{demoOpen ? "▲" : "▼"}</span>
            </button>

            {/* Demo Role Menu */}
            {demoOpen && (
              <div className="mt-3 rounded-2xl border border-[#f1d9de] bg-white p-4 shadow-lg">
                <p className="mb-3 text-center text-sm font-semibold text-[#681225]">
                  Choose a demo account
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {/* Patient */}
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("patient")}
                    disabled={demoLoading}
                    className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-left transition hover:border-green-300 hover:bg-green-100 disabled:opacity-60"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-lg">
                      🩺
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Demo Patient
                      </p>

                      <p className="text-xs text-gray-500">
                        Explore the Patient Portal
                      </p>
                    </div>
                  </button>

                  {/* Doctor */}
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("doctor")}
                    disabled={demoLoading}
                    className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-left transition hover:border-purple-300 hover:bg-purple-100 disabled:opacity-60"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3e8ff] text-lg">
                      👨‍⚕️
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Demo Doctor
                      </p>

                      <p className="text-xs text-gray-500">
                        Explore the Doctor Portal
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Google Login */}
          <div className="mt-3 flex w-full justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError("Google login failed. Please try again.");
              }}
              useOneTap={false}
            />
          </div>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-[#8f1730]">
              Create Account
            </Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
