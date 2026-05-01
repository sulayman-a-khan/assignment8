"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiStar, FiClock, FiUsers, FiArrowRight } from "react-icons/fi";

const levelClass = {
  Beginner: "badge-beginner",
  Intermediate: "badge-intermediate",
  Advanced: "badge-advanced",
};

export default function CourseCard({ course, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="animated-border"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col group">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                levelClass[course.level] || "badge-beginner"
              }`}
            >
              {course.level}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary-500/80 text-white">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Rating row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <FiStar className="text-amber-400 fill-amber-400" size={14} />
              <span className="text-amber-400 font-bold text-sm">
                {course.rating}
              </span>
              <span className="text-white/40 text-xs ml-1">
                ({course.students.toLocaleString()})
              </span>
            </div>
            <span className="text-primary-400 font-bold text-lg">
              ${course.price}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-700 text-white text-base leading-tight mb-2 line-clamp-2 flex-1">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-white/50 text-xs mb-3">by {course.instructor}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <FiClock size={12} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <FiUsers size={12} />
              <span>{course.students.toLocaleString()} students</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/50 border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/courses/${course.id}`}
            id={`view-course-${course.id}`}
            className="group/btn flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 hover:border-primary-500/40 text-primary-400 hover:text-primary-300 text-sm font-semibold transition-all duration-200"
          >
            View Course
            <FiArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
