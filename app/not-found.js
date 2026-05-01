"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiSearch, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl" />

      <div className="relative text-center max-w-lg mx-auto">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="mb-6"
        >
          <span className="font-display text-[10rem] font-900 leading-none gradient-text opacity-20 select-none">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="-mt-16"
        >
          {/* Astronaut emoji */}
          <div className="text-7xl mb-6 animate-float inline-block">🚀</div>

          <h1 className="font-display text-3xl md:text-4xl font-800 text-white mb-4">
            Lost in{" "}
            <span className="gradient-text">Space</span>
          </h1>
          <p className="text-white/50 mb-8 text-base leading-relaxed">
            The page you&apos;re looking for has drifted off into the cosmos.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              id="not-found-home-btn"
              className="btn-glow px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2"
            >
              <span className="flex items-center gap-2">
                <FiHome size={15} /> Go Home
              </span>
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <FiSearch size={15} /> Browse Courses
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
