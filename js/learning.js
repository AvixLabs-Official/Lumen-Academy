/**
 * LUMEN ACADEMY - Interactive Lesson Player & Progress Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLessonPlayer();
});

function initLessonPlayer() {
  const container = document.getElementById('lesson-player-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || 'crs-01';

  const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];
  const inst = INSTRUCTORS_DATA.find(i => i.id === course.instructorId);
  const enrolledCourses = getStoredEnrolledCourses();
  const enrolledObj = enrolledCourses.find(c => c.id === course.id) || { progress: 42, completedCount: 10, totalCount: course.lessonsCount };

  container.innerHTML = `
    <!-- Top Bar -->
    <div class="lesson-top-bar">
      <div style="display:flex; align-items:center; gap:16px;">
        <a href="dashboard.html" class="btn-link" style="color:var(--color-navy); font-weight:700; display:inline-flex; align-items:center; gap:6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Back to Dashboard</span>
        </a>
        <span style="color:var(--text-muted);">|</span>
        <h2 style="font-size:1.2rem; margin:0;">${course.title}</h2>
      </div>

      <div style="display:flex; align-items:center; gap:20px;">
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Course Progress</span>
          <div style="font-weight:700; color:var(--color-primary);" id="top-bar-progress-txt">${enrolledObj.progress}% Complete</div>
        </div>
        <a href="quiz.html?courseId=${course.id}" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
          <span>Take Quiz</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </a>
      </div>
    </div>

    <!-- Main Player Grid -->
    <div class="lesson-player-grid">
      <!-- Main Content & Video Box -->
      <div class="lesson-main-stage">
        <!-- Video Player Mockup -->
        <div class="video-mockup-box">
          <div class="video-screen">
            <div class="play-overlay-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFF" stroke="#FFF"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div class="video-controls-bar">
              <span style="display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFF" stroke="#FFF"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Play</span>
              </span>
              <div class="video-scrubber-bg"><div class="video-scrubber-fill" style="width:45%;"></div></div>
              <span>04:12 / 15:00</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            </div>
          </div>
        </div>

        <!-- Lesson Meta & Body -->
        <div class="lesson-content-body">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:16px;">
            <div>
              <span class="section-tag" style="margin-bottom:4px;">LESSON 02 • VIDEO LECTURE</span>
              <h1 style="font-size:2rem; margin-bottom:4px;">Understanding User Research & Empathy Mapping</h1>
              <p style="color:var(--text-muted); font-size:0.9rem;">Instructor: ${inst ? inst.name : 'Maya Chen'} • Duration: 15 minutes</p>
            </div>

            <button class="btn btn-primary" id="mark-complete-btn" style="display:inline-flex; align-items:center; gap:6px;">
              <span>${enrolledObj.progress === 100 ? 'Completed' : 'Mark as Complete'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </div>

          <hr style="border:none; border-top:1px solid var(--border-color); margin:24px 0;">

          <h3>Lesson Overview</h3>
          <p style="font-size:1.05rem; color:var(--text-secondary); line-height:1.7; margin-top:12px;">
            User research is the core foundation of product design. In this lesson, we cover empathy mapping techniques, qualitative interview structures, and how to synthesize raw user data into actionable persona artifacts.
          </p>

          <div class="takeaways-box">
            <h4 style="display:flex; align-items:center; gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EAB308" stroke-width="2"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.55.63 2.94 1.6 3.96.76.76 1.23 1.52 1.41 2.5"></path></svg>
              <span>Key Takeaways</span>
            </h4>
            <ul>
              <li>Empathy maps divide user responses into <strong>Says, Thinks, Does, and Feels</strong>.</li>
              <li>Always conduct at least 5-8 qualitative interviews to identify recurring user friction patterns.</li>
              <li>Avoid leading questions during user interviews to preserve unbiased observations.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Curriculum Sidebar -->
      <div class="lesson-sidebar">
        <h3 style="font-size:1.2rem; padding:20px; border-bottom:1px solid var(--border-color); margin:0;">Course Curriculum</h3>

        <div class="curriculum-accordion">
          <div class="curr-module-item active">
            <div class="curr-mod-header">
              <span style="font-weight:700;">Module 1: Design Foundations</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">4 Lessons</span>
            </div>
            <div class="curr-mod-lessons">
              <div class="curr-lesson-link done">
                <span>✓ 01. What is Design?</span>
                <span style="font-size:0.75rem;">12m</span>
              </div>
              <div class="curr-lesson-link active">
                <span>▶ 02. Understanding User Research</span>
                <span style="font-size:0.75rem;">15m</span>
              </div>
              <div class="curr-lesson-link">
                <span>📄 03. Design Principles Reading</span>
                <span style="font-size:0.75rem;">18m</span>
              </div>
              <a href="quiz.html?courseId=${course.id}" class="curr-lesson-link quiz">
                <span>📝 04. Module 1 Knowledge Quiz</span>
                <span style="font-size:0.75rem;">Quiz</span>
              </a>
            </div>
          </div>

          <div class="curr-module-item">
            <div class="curr-mod-header">
              <span style="font-weight:700;">Module 2: Wireframing & Figma</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">3 Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mark as Complete Action
  document.getElementById('mark-complete-btn')?.addEventListener('click', () => {
    const newCount = Math.min(course.lessonsCount, enrolledObj.completedCount + 1);
    updateCourseProgress(course.id, newCount, course.lessonsCount);

    const updatedEnrolled = getStoredEnrolledCourses().find(c => c.id === course.id);
    const progressTxt = document.getElementById('top-bar-progress-txt');
    const completeBtn = document.getElementById('mark-complete-btn');

    if (progressTxt) progressTxt.textContent = `${updatedEnrolled.progress}% Complete`;
    if (completeBtn) {
      completeBtn.textContent = updatedEnrolled.progress === 100 ? 'Completed ✓' : 'Completed ✓';
      completeBtn.style.backgroundColor = 'var(--color-success)';
    }

    if (updatedEnrolled.progress === 100) {
      alert("🎉 Congratulations! You have completed 100% of this course. Your certificate of completion has been unlocked!");
      window.location.href = `certificate.html?courseId=${course.id}`;
    }
  });
}
