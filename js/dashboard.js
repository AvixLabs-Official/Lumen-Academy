/**
 * LUMEN ACADEMY - Student LMS Dashboard & Profile Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudentDashboard();
});

function initStudentDashboard() {
  const container = document.getElementById('dashboard-main-container');
  if (!container) return;

  const enrolled = getStoredEnrolledCourses();
  const certs = getStoredCertificates();
  const savedIds = getStoredSavedCourses();

  // Metrics calculation
  const totalEnrolledCount = enrolled.length;
  const completedCoursesCount = enrolled.filter(c => c.progress === 100).length;
  const learningHoursTotal = enrolled.reduce((acc, curr) => acc + (curr.completedCount * 0.5), 8).toFixed(1);

  // Next course to continue
  const activeCourseObj = enrolled.find(c => c.progress < 100) || enrolled[0];
  const activeCourse = COURSES_DATA.find(c => c.id === activeCourseObj?.id) || COURSES_DATA[0];

  container.innerHTML = `
    <!-- Top Greeting & Header -->
    <div class="dash-welcome-header">
      <div>
        <span class="section-tag">STUDENT PORTAL</span>
        <h1 style="font-size:2.4rem;">Good morning, Alex. 👋</h1>
        <p style="color:var(--text-muted); font-size:1.05rem;">You're on a <strong>7-day learning streak 🔥</strong>. Keep building your skills!</p>
      </div>

      <div class="streak-badge-card">
        <span style="font-size:1.8rem;">🔥</span>
        <div>
          <strong style="font-size:1.2rem; display:block;">7 Days</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">Current Streak</span>
        </div>
      </div>
    </div>

    <!-- Stats Counter Bar -->
    <div class="dash-stats-grid">
      <div class="stat-card">
        <span class="stat-num">${totalEnrolledCount}</span>
        <span class="stat-lbl">Courses In Progress</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${completedCoursesCount}</span>
        <span class="stat-lbl">Completed Courses</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${learningHoursTotal}h</span>
        <span class="stat-lbl">Learning Hours</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${certs.length}</span>
        <span class="stat-lbl">Certificates Earned</span>
      </div>
    </div>

    <!-- Continue Learning Hero Card -->
    ${activeCourse ? `
      <div class="continue-learning-card">
        <div class="cl-info-box">
          <span class="cl-badge">CONTINUE LEARNING</span>
          <h2 class="cl-title">${activeCourse.title}</h2>
          <p class="cl-subtitle">Current Lesson: <strong>User Research & Empathy Mapping</strong></p>

          <div class="cl-progress-box">
            <div class="progress-bar-bg" style="height:10px;">
              <div class="progress-bar-fill" style="width: ${activeCourseObj.progress}%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:0.85rem; color:var(--text-muted);">
              <span>${activeCourseObj.completedCount} of ${activeCourseObj.totalCount} Lessons Complete</span>
              <strong>${activeCourseObj.progress}%</strong>
            </div>
          </div>

          <a href="lesson.html?id=${activeCourse.id}" class="btn btn-primary" style="margin-top:20px;">Resume Course →</a>
        </div>

        <div class="cl-thumb-box">
          <img src="${activeCourse.thumbnail}" alt="${activeCourse.title}">
        </div>
      </div>
    ` : ''}

    <!-- Tabbed My Courses & Saved Sections -->
    <div class="dash-section-box">
      <div class="dash-tabs-bar">
        <button class="dash-tab-btn active" data-tab="enrolled">My Enrolled Courses (${enrolled.length})</button>
        <button class="dash-tab-btn" data-tab="certificates">My Certificates (${certs.length})</button>
        <button class="dash-tab-btn" data-tab="saved">Saved Courses (${savedIds.length})</button>
      </div>

      <div id="dash-tab-content-area">
        <!-- Rendered by tab -->
      </div>
    </div>
  `;

  const area = document.getElementById('dash-tab-content-area');
  const tabs = container.querySelectorAll('.dash-tab-btn');

  function renderTabContent(tabName) {
    if (tabName === 'enrolled') {
      area.innerHTML = `
        <div class="enrolled-courses-grid">
          ${enrolled.map(item => {
            const course = COURSES_DATA.find(c => c.id === item.id);
            if (!course) return '';
            const inst = INSTRUCTORS_DATA.find(i => i.id === course.instructorId);

            return `
              <div class="course-card">
                <div class="course-card-thumb">
                  <img src="${course.thumbnail}" alt="${course.title}">
                  <span class="course-cat-tag">${course.category}</span>
                </div>
                <div class="course-card-body">
                  <h3 class="course-card-title"><a href="lesson.html?id=${course.id}">${course.title}</a></h3>
                  <p class="course-card-inst">by ${inst ? inst.name : 'Lumen Faculty'}</p>

                  <div class="course-card-progress" style="margin-top:16px;">
                    <div class="progress-bar-bg">
                      <div class="progress-bar-fill" style="width: ${item.progress}%;"></div>
                    </div>
                    <div class="progress-txt" style="display:flex; justify-content:space-between; margin-top:6px;">
                      <span>${item.progress}% Complete</span>
                      <span>${item.completedCount}/${item.totalCount} Lessons</span>
                    </div>
                  </div>

                  <div class="course-card-footer" style="margin-top:20px;">
                    <span style="font-size:0.8rem; color:var(--text-muted);">Last active ${item.lastAccessed}</span>
                    <a href="lesson.html?id=${course.id}" class="btn btn-primary btn-sm">Go to Class →</a>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (tabName === 'certificates') {
      area.innerHTML = certs.length === 0 ? `
        <p style="padding:40px; text-align:center; color:var(--text-muted);">No certificates unlocked yet. Complete 100% of any course to earn your verified certificate!</p>
      ` : `
        <div class="certificates-list-grid">
          ${certs.map(cert => `
            <div class="cert-card-item">
              <div style="font-size:2rem; margin-bottom:12px;">🏆</div>
              <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--color-primary); font-weight:700;">Certificate of Completion</span>
              <h3 style="font-size:1.3rem; margin:8px 0;">${cert.courseTitle}</h3>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px;">Issued on ${cert.issueDate} • ID: ${cert.id}</p>
              <a href="certificate.html?id=${cert.id}" class="btn btn-outline btn-sm">View Certificate ↗</a>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabName === 'saved') {
      const savedCourses = COURSES_DATA.filter(c => savedIds.includes(c.id));
      area.innerHTML = savedCourses.length === 0 ? `
        <p style="padding:40px; text-align:center; color:var(--text-muted);">No saved courses yet.</p>
      ` : `
        <div class="enrolled-courses-grid">
          ${savedCourses.map(course => `
            <div class="course-card">
              <div class="course-card-thumb">
                <img src="${course.thumbnail}" alt="${course.title}">
                <span class="course-cat-tag">${course.category}</span>
              </div>
              <div class="course-card-body">
                <h3 class="course-card-title"><a href="course-detail.html?id=${course.id}">${course.title}</a></h3>
                <div class="course-card-footer" style="margin-top:20px;">
                  <span class="course-card-price">${course.priceFormatted}</span>
                  <a href="course-detail.html?id=${course.id}" class="btn btn-outline btn-sm">View Course →</a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  tabs.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabBtn.classList.add('active');
      renderTabContent(tabBtn.getAttribute('data-tab'));
    });
  });

  // Initial tab render
  renderTabContent('enrolled');
}
