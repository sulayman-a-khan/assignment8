"use client";

import { useState, useMemo } from "react";

export const metadata = {
  title: "Courses",
  description: "Browse our catalog of world-class courses.",
};
import { motion } from "framer-motion";
import CourseCard from "@/components/CourseCard";
import { getAllCourses } from "@/lib/courses";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";

const categories = ["All", "Web Development", "Data Science", "Design", "Mobile Development", "DevOps", "Security", "Blockchain"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const allCourses = getAllCourses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let result = allCourses;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "All") {
      result = result.filter((c) => c.category === category);
    }

    if (level !== "All") {
      result = result.filter((c) => c.level === level);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "students") return b.students - a.students;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

    return result;
  }, [search, category, level, sortBy, allCourses]);

  return (
    <div className="page-container pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-title text-white mb-4 text-4xl md:text-5xl">
              Explore Our <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto mb-10">
              200+ expert-led courses across technology, design, and business.
              Learn at your own pace.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
              <input
                id="course-search"
                type="text"
                placeholder="Search courses, instructors, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl input-glass text-sm focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8 items-center"
        >
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <FiFilter size={14} /> Filter:
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level */}
          <div className="flex gap-2 ml-auto">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  level === l
                    ? "bg-accent-500/80 text-white"
                    : "bg-white/5 text-white/50 hover:text-white border border-white/10"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            id="course-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/70 focus:outline-none focus:border-primary-500/50 cursor-pointer"
          >
            <option value="rating">Top Rated</option>
            <option value="students">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">
            Showing{" "}
            <span className="text-white font-semibold">{filtered.length}</span>{" "}
            courses
            {search && (
              <span>
                {" "}
                for{" "}
                <span className="text-primary-400 font-medium">
                  &ldquo;{search}&rdquo;
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-display font-700 text-white/70 mb-2">
              No courses found
            </h3>
            <p className="text-white/40 text-sm">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
              className="mt-4 px-6 py-2 rounded-xl bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-all"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
