import coursesData from "@/data/courses.json";

export function getAllCourses() {
  return coursesData;
}

export function getCourseById(id) {
  return coursesData.find((course) => course.id === id) || null;
}

export function getFeaturedCourses() {
  return coursesData.filter((course) => course.featured);
}

export function getTopRatedCourses(limit = 3) {
  return [...coursesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getTrendingCourses(limit = 4) {
  return coursesData.filter((course) => course.trending).slice(0, limit);
}

export function searchCourses(query) {
  const q = query.toLowerCase();
  return coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(q) ||
      course.instructor.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getInstructors() {
  const seen = new Set();
  return coursesData
    .filter((course) => {
      if (seen.has(course.instructor)) return false;
      seen.add(course.instructor);
      return true;
    })
    .map((course) => ({
      name: course.instructor,
      image: course.instructorImage,
      specialty: course.category,
      courses: coursesData.filter((c) => c.instructor === course.instructor)
        .length,
      students: course.students,
      rating: course.rating,
    }));
}
