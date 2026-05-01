"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ 
      ...prev, 
      [field]: field.includes("password") || field === "confirm" 
        ? e.target.value 
        : e.target.value.trim() 
    }));

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm, image } = form;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      console.log("Registering:", email);
      const res = await authClient.signUp.email({
        email: email.toLowerCase(),
        password,
        name,
        image: image || undefined,
        callbackURL: "/",
      });

      if (res?.error) {
        console.error("BetterAuth Error:", res.error);
        
        // Detailed error reporting
        if (typeof res.error === 'string') {
          toast.error(res.error);
        } else {
          const msg = res.error.message || res.error.statusText || "Registration failed";
          const code = res.error.code || res.error.status || "";
          toast.error(`${msg} ${code ? `[${code}]` : ""}`);
          
          if (!res.error.message && !res.error.code) {
            toast.error("Internal Error: " + JSON.stringify(res.error).substring(0, 50));
          }
        }
        
        if (res.error.code === "EMAIL_ALREADY_IN_USE") {
          toast.error("Tip: Try a random email like 'user" + Math.floor(Math.random()*1000) + "@test.com'");
        }
      } else {
        toast.success("Account created successfully! 🎉");
        setTimeout(() => {
          router.push("/login");
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      console.error("Critical Register Fail:", err);
      toast.error("Server error. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-up failed.");
      setGoogleLoading(false);
    }
  };

  const fields = [
    { id: "reg-name",     field: "name",     icon: FiUser,  type: "text",     placeholder: "John Doe",             label: "Full Name *" },
    { id: "reg-email",    field: "email",    icon: FiMail,  type: "email",    placeholder: "you@example.com",      label: "Email Address *" },
    { id: "reg-image",    field: "image",    icon: FiImage, type: "url",      placeholder: "https://... (optional)", label: "Profile Photo URL" },
  ];

  return (
    <div className="page-container flex items-center justify-center py-20 px-4">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
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
              Create Account
            </h1>
            <p className="text-white/40 text-sm">
              Join 50,000+ learners today — it&apos;s free
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            id="google-signup-btn"
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
          <form onSubmit={handleRegister} className="space-y-4">
            {fields.map(({ id, field, icon: Icon, type, placeholder, label }) => (
              <div key={field}>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                  <input
                    id={id}
                    type={type}
                    value={form[field]}
                    onChange={update(field)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-3 rounded-xl input-glass text-sm"
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                <input
                  id="reg-confirm-password"
                  type={showPass ? "text" : "password"}
                  value={form.confirm}
                  onChange={update("confirm")}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm"
                />
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-red-400 mt-1 ml-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              id="register-submit-btn"
              disabled={loading}
              className="w-full btn-glow py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader size="sm" /> : <span>Create Account</span>}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
