"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "py-2 px-4 md:px-10"
          : "py-0 px-0"
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          scrolled 
            ? "bg-[#0f0f1a]/80 backdrop-blur-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-2xl px-6" 
            : "bg-transparent border-b border-transparent px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <HiSparkles className="text-white text-xl" />
              </div>
            </div>
            <span className="font-display font-900 text-2xl tracking-tight gradient-text hidden sm:block">
              SkillSphere
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-4">
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500 border border-white/20 shadow-lg">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {session.user?.name?.[0]}
                    </div>
                  )}
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all group"
                >
                  <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-sm font-bold text-white/70 hover:text-white transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-glow px-7 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl shadow-primary-500/20"
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-20 z-40 bg-[#0f0f1a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                      pathname === link.href
                        ? "bg-primary-500/20 text-primary-400 border border-primary-500/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-white/5 my-4" />

              {session ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 px-5 py-2">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                      {session.user?.image ? (
                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold">{session.user?.name?.[0]}</div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{session.user?.name}</p>
                      <p className="text-white/40 text-xs">{session.user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleSignOut(); setMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-base font-bold text-red-400 bg-red-500/5 border border-red-500/10"
                  >
                    <FiLogOut size={20} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center px-5 py-4 rounded-2xl text-base font-bold text-white/70 border border-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="btn-glow flex items-center justify-center px-5 py-4 rounded-2xl text-base font-bold"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
