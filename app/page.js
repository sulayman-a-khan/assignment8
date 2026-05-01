"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CourseCard from "@/components/CourseCard";
import {
  getTopRatedCourses,
  getTrendingCourses,
  getInstructors,
} from "@/lib/courses";
import {
  FiArrowRight,
  FiStar,
  FiZap,
  FiUsers,
  FiBookOpen,
  FiTarget,
  FiCoffee,
  FiClock,
} from "react-icons/fi";
import {
  HiSparkles,
  HiLightBulb,
  HiAcademicCap,
  HiTrendingUp,
} from "react-icons/hi";

const highlightWords = [
  { text: "Learning", color: "from-primary-500 to-accent-500" },
  { text: "Design", color: "from-emerald-400 to-cyan-400" },
  { text: "Business", color: "from-amber-400 to-orange-500" },
  { text: "Skills", color: "from-violet-500 to-pink-500" },
];

const stats = [
  { value: "50K+", label: "Students", icon: FiUsers },
  { value: "200+", label: "Courses", icon: FiBookOpen },
  { value: "98%", label: "Satisfaction", icon: FiStar },
  { value: "50+", label: "Instructors", icon: HiAcademicCap },
];

const tips = [
  {
    icon: FiTarget,
    title: "Set Clear Goals",
    color: "from-primary-500 to-violet-500",
    desc: "Define what you want to achieve before starting a course. Clear goals keep you motivated and focused.",
  },
  {
    icon: FiClock,
    title: "Consistent Schedule",
    color: "from-emerald-400 to-cyan-500",
    desc: "Dedicate at least 30 minutes daily. Consistency beats intensity when building new skills.",
  },
  {
    icon: FiZap,
    title: "Practice Daily",
    color: "from-amber-400 to-orange-500",
    desc: "Apply what you learn immediately. Building real projects cements knowledge faster than re-watching.",
  },
  {
    icon: FiCoffee,
    title: "Take Smart Breaks",
    color: "from-pink-500 to-accent-500",
    desc: "Use the Pomodoro technique. 25 minutes on, 5 off. Your brain retains more with structured rest.",
  },
];

export default function HomePage() {
  const topCourses = getTopRatedCourses(3);
  const trending = getTrendingCourses(4);
  const instructors = getInstructors().slice(0, 4);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % highlightWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ── HERO SECTION (SPLIT LAYOUT) ─────────────────── */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-flow" id="hero">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-noise opacity-[0.15]" />
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              {/* Social Proof Badge */}
              <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-xl">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-[#0f0f1a]" src="https://i.pravatar.cc/100?img=1" alt="Student" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0f0f1a]" src="https://i.pravatar.cc/100?img=2" alt="Student" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0f0f1a]" src="https://i.pravatar.cc/100?img=3" alt="Student" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0f0f1a] bg-primary-500 flex items-center justify-center text-[10px] font-bold text-white">+50K</div>
                </div>
                <div className="text-sm font-medium text-white/80 pr-2">
                  Trusted by ambitious learners
                </div>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-900 leading-[1.1] mb-6 text-white tracking-tight">
                Unlock Your Potential in <br className="hidden sm:block" />
                <div className="h-[1.2em] relative overflow-hidden inline-block min-w-[280px]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                      className={`absolute inset-0 bg-gradient-to-r ${highlightWords[wordIndex].color} bg-clip-text text-transparent pb-2`}
                    >
                      {highlightWords[wordIndex].text}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-light">
                World-class education meets modern design. Build job-ready skills, earn certificates, and accelerate your career with expert-led courses.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/courses"
                  className="btn-glow btn-shimmer px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-3 group text-lg shadow-[0_0_40px_rgba(91,110,247,0.3)] hover:shadow-[0_0_60px_rgba(91,110,247,0.5)]"
                >
                  <span>Start Learning Now</span>
                  <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  href="/courses"
                  className="px-8 py-4 rounded-2xl font-bold text-white/80 hover:text-white border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 text-lg"
                >
                  <FiBookOpen />
                  Browse Catalog
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", damping: 25 }}
              className="relative lg:h-[600px] flex items-center justify-center perspective-1000 mt-12 lg:mt-0"
            >
              <div className="relative w-full max-w-md preserve-3d animate-float">

                {/* Main Hero Card */}
                <div className="glass-card bg-[#16162a]/80 border-white/10 p-6 rounded-3xl shadow-2xl relative z-10 overflow-hidden transform-gpu">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />

                  <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                    <div className="absolute inset-0 bg-primary-500/20 mix-blend-overlay z-10" />
                    <img
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop"
                      alt="Coding Environment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Now
                    </div>
                  </div>

                  <h3 className="font-display font-800 text-xl text-white mb-2">Advanced Full-Stack Engineering</h3>
                  <div className="flex items-center gap-3 text-sm text-white/50 mb-5">
                    <span className="flex items-center gap-1"><FiClock size={14} /> 12 Weeks</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="flex items-center gap-1"><FiUsers size={14} /> 1,204 Enrolled</span>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 w-[65%] rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-primary-400">Course Progress</span>
                      <span className="text-white/80">65%</span>
                    </div>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -right-12 -top-8 glass-card bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-20 animate-float-delayed flex items-center gap-4 hidden sm:flex">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-inner">
                    <FiStar className="text-white fill-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-0.5">Achievement</p>
                    <p className="text-sm font-bold text-white">Top 1% Learner</p>
                  </div>
                </div>

                {/* Floating Review Card */}
                <div className="absolute -left-8 -bottom-10 glass-card bg-[#0f0f1a]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20 animate-float-slow max-w-[220px] hidden sm:block">
                  <div className="flex gap-1 text-amber-400 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} size={12} className="fill-current" />)}
                  </div>
                  <p className="text-xs text-white/70 italic mb-3 leading-relaxed">
                    "This platform completely transformed my career. The projects are incredible."
                  </p>
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Sarah" className="w-6 h-6 rounded-full" />
                    <span className="text-[10px] font-bold text-white">Sarah Jenkins, Dev</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS/ ─────────────────────────────────────── */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-primary-400 text-xl" />
                </div>
                <div className="text-3xl font-display font-900 gradient-text mb-1">
                  {value}
                </div>
                <div className="text-sm text-white/50">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR COURSES ───────────────────────────── */}
      <section className="py-20" id="popular-courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <FiStar size={14} className="fill-amber-400" /> Top Rated
            </div>
            <h2 className="section-title text-white mb-4">
              Popular <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Highest-rated courses loved by thousands of learners worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING COURSES (Swiper) ─────────────────── */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent" id="trending">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-3">
                <HiTrendingUp size={14} /> Trending Now
              </div>
              <h2 className="section-title text-white">
                Hot <span className="gradient-text">Right Now</span>
              </h2>
            </div>
            <Link
              href="/courses"
              className="hidden md:flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors group"
            >
              See all <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {trending.map((course, i) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── LEARNING TIPS ─────────────────────────────── */}
      <section className="py-20" id="learning-tips">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <HiLightBulb size={14} /> Pro Tips
            </div>
            <h2 className="section-title text-white mb-4">
              Learning <span className="gradient-text-2">Strategies</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Scientifically-backed techniques to supercharge your learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <tip.icon className="text-white text-xl" />
                </div>
                <h3 className="font-display font-700 text-white text-base mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {tip.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP INSTRUCTORS ───────────────────────────── */}
      <section className="py-20" id="instructors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
              <HiAcademicCap size={14} /> Meet the Experts
            </div>
            <h2 className="section-title text-white mb-4">
              Top <span className="gradient-text">Instructors</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Learn from industry leaders with years of real-world experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {instructors.map((instructor, i) => (
              <motion.div
                key={instructor.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group cursor-pointer"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-0.5">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full rounded-full object-cover bg-[#1e1e3a]"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#0f0f1a] flex items-center justify-center">
                    <FiStar className="text-[#0f0f1a] text-xs fill-current" />
                  </div>
                </div>
                <h3 className="font-display font-700 text-white text-sm mb-1">
                  {instructor.name}
                </h3>
                <p className="text-xs text-primary-400 mb-2">
                  {instructor.specialty}
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-white/40">
                  <span>{instructor.students.toLocaleString()} students</span>
                  <span className="text-amber-400">★ {instructor.rating}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-card neon-border p-10 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="section-title text-white mb-4">
                Start Your Learning{" "}
                <span className="gradient-text">Journey Today</span>
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Join over 50,000 learners. Access 200+ courses. Build real
                skills that employers love.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="btn-glow px-8 py-3.5 rounded-xl font-semibold text-white"
                  id="cta-register-btn"
                >
                  <span>Get Started Free</span>
                </Link>
                <Link
                  href="/courses"
                  className="px-8 py-3.5 rounded-xl font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
