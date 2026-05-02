"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });
      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.");
      } else {
        toast.success("Welcome back! 🎉");
        router.push(callbackUrl);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google sign-in failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="glass-card neon-border p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <HiSparkles className="text-white text-xl" />
          </div>
          <span className="font-display font-800 text-xl gradient-text">
            SkillSphere
          </span>
        </Link>
        <h1 className="font-display text-2xl font-700 text-white mb-1">
          Welcome Back
        </h1>
        <p className="text-white/40 text-sm">Sign in to continue learning</p>
      </div>

      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        id="google-signin-btn"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 mb-5"
      >
        {googleLoading ? (
          <Loader size="sm" />
        ) : (
          <>
            <FcGoogle size={20} />
            Continue with Google
          </>
        )}
      </button>

      <div className="relative flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs">or email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-white/60 mb-1.5">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              id="login-password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl input-glass text-sm"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          id="login-submit-btn"
          disabled={loading}
          className="w-full btn-glow py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader size="sm" /> : <span>Sign In</span>}
        </button>
      </form>

      <p className="text-center text-sm text-white/40 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Sign Up Free
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="page-container flex items-center justify-center py-20 px-4">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Suspense
          fallback={
            <div className="glass-card neon-border p-8 flex items-center justify-center min-h-[400px]">
              <Loader size="md" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
