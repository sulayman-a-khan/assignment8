"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { getCourseById } from "@/lib/courses";
import Loader from "@/components/Loader";
import Link from "next/link";
import {
  FiStar,
  FiClock,
  FiUsers,
  FiCheck,
  FiArrowLeft,
  FiLock,
  FiPlay,
  FiBook,
} from "react-icons/fi";

const levelClass = {
  Beginner: "badge-beginner",
  Intermediate: "badge-intermediate",
  Advanced: "badge-advanced",
};

export default function CourseDetailsPage({ params }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [enrolled, setEnrolled] = useState(false);

  const course = getCourseById(params.id);

  // Redirection is now handled by middleware.js
  useEffect(() => {
    // If we need to fetch user-specific enrollment data, we do it here
  }, [session, params.id]);

  if (!course) return notFound();

  if (isPending) return <Loader fullPage />;

  if (!session && !isPending) {
    return null; // Should be handled by middleware, but safety first
  }

  return (
    <div className="page-container pb-20">
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6 transition-colors"
          >
            <FiArrowLeft size={14} /> Back to Courses
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelClass[course.level]}`}>
              {course.level}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-500/20 text-primary-400">
              {course.category}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-900 text-white max-w-3xl mb-4 leading-tight"
          >
            {course.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <FiStar className="text-amber-400 fill-amber-400" />
              <strong className="text-amber-400">{course.rating}</strong>
              ({course.students.toLocaleString()} students)
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={14} /> {course.duration}
            </span>
            <span>by <strong className="text-white/80">{course.instructor}</strong></span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <h2 className="font-display font-700 text-white text-xl mb-4">
                About This Course
              </h2>
              <p className="text-white/60 leading-relaxed">{course.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <h2 className="font-display font-700 text-white text-xl mb-6 flex items-center gap-2">
                <FiBook className="text-primary-400" /> Curriculum
              </h2>
              <div className="space-y-3">
                {course.curriculum.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-primary-500/20 transition-all group cursor-default"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors flex-1">
                      {item}
                    </span>
                    <FiPlay
                      size={12}
                      className="text-white/20 group-hover:text-primary-400 transition-colors"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right – Enroll Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="sticky top-24"
            >
              <div className="glass-card neon-border overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                      <FiPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-3xl font-display font-900 gradient-text mb-4">
                    ${course.price}
                  </div>

                  <button
                    onClick={() => {
                      setEnrolled(true);
                    }}
                    id={`enroll-btn-${course.id}`}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 mb-3 ${
                      enrolled
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "btn-glow text-white"
                    }`}
                  >
                    {enrolled ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiCheck /> Enrolled!
                      </span>
                    ) : (
                      <span>Enroll Now</span>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/30 mb-5">
                    30-day money-back guarantee
                  </p>

                  <div className="space-y-3 text-sm">
                    {[
                      { icon: FiClock, label: "Duration", value: course.duration },
                      { icon: FiUsers, label: "Students", value: course.students.toLocaleString() },
                      { icon: FiStar, label: "Rating", value: `${course.rating} / 5.0` },
                      { icon: FiBook, label: "Modules", value: `${course.curriculum.length} lessons` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between text-white/50">
                        <span className="flex items-center gap-2">
                          <Icon size={13} /> {label}
                        </span>
                        <span className="font-medium text-white/80">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
