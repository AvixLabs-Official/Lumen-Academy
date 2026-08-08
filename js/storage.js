/**
 * LUMEN ACADEMY - LocalStorage State Manager
 */

const STORAGE_KEYS = {
  ENROLLED: 'lumen_enrolled_courses',
  COMPLETED_LESSONS: 'lumen_completed_lessons',
  SAVED_COURSES: 'lumen_saved_courses',
  QUIZ_RESULTS: 'lumen_quiz_results',
  CERTIFICATES: 'lumen_certificates',
  USER_PROFILE: 'lumen_user_profile'
};

// Seed default initial enrolled courses if empty
function getStoredEnrolledCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ENROLLED);
    if (!saved) {
      const seedEnrolled = [
        {
          id: "crs-01",
          progress: 42,
          completedCount: 10,
          totalCount: 24,
          lastAccessed: "2 hours ago",
          enrolledDate: "2026-08-01"
        },
        {
          id: "crs-02",
          progress: 15,
          completedCount: 5,
          totalCount: 36,
          lastAccessed: "Yesterday",
          enrolledDate: "2026-08-03"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(seedEnrolled));
      return seedEnrolled;
    }
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

function enrollInCourse(courseId) {
  const enrolled = getStoredEnrolledCourses();
  if (!enrolled.some(c => c.id === courseId)) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    enrolled.unshift({
      id: courseId,
      progress: 0,
      completedCount: 0,
      totalCount: course ? course.lessonsCount : 20,
      lastAccessed: "Just now",
      enrolledDate: new Date().toISOString().split('T')[0]
    });
    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolled));
    } catch (e) {}
  }
}

function isCourseEnrolled(courseId) {
  const enrolled = getStoredEnrolledCourses();
  return enrolled.some(c => c.id === courseId);
}

function updateCourseProgress(courseId, newCompletedCount, totalCount) {
  const enrolled = getStoredEnrolledCourses();
  const target = enrolled.find(c => c.id === courseId);
  if (target) {
    target.completedCount = newCompletedCount;
    target.totalCount = totalCount;
    target.progress = Math.min(100, Math.round((newCompletedCount / totalCount) * 100));
    target.lastAccessed = "Just now";

    // If 100%, unlock certificate automatically!
    if (target.progress === 100) {
      unlockCertificate(courseId);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolled));
    } catch (e) {}
  }
}

function getStoredSavedCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_COURSES);
    return saved ? JSON.parse(saved) : ["crs-01", "crs-05"];
  } catch (e) {
    return [];
  }
}

function toggleSaveCourse(courseId) {
  let saved = getStoredSavedCourses();
  if (saved.includes(courseId)) {
    saved = saved.filter(id => id !== courseId);
  } else {
    saved.push(courseId);
  }
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_COURSES, JSON.stringify(saved));
  } catch (e) {}
  return saved;
}

function getStoredCertificates() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (!saved) {
      const seedCert = [
        {
          id: "LUMEN-UIUX-8F42K",
          courseId: "crs-01",
          courseTitle: "UI/UX Design Fundamentals",
          instructorName: "Maya Chen",
          studentName: "Alex Morgan",
          issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        }
      ];
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(seedCert));
      return seedCert;
    }
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

function unlockCertificate(courseId) {
  const certs = getStoredCertificates();
  if (!certs.some(c => c.courseId === courseId)) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    const inst = INSTRUCTORS_DATA.find(i => i.id === course?.instructorId);

    const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    const certCode = `LUMEN-${courseId.toUpperCase()}-${randomHex}`;

    certs.push({
      id: certCode,
      courseId: courseId,
      courseTitle: course ? course.title : "Lumen Academy Course",
      instructorName: inst ? inst.name : "Lumen Faculty",
      studentName: "Alex Morgan",
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
    } catch (e) {}
  }
}
