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
        <h1 style="font-size:2.4rem;">Good morning, Alex.</h1>
        <p style="color:var(--text-muted); font-size:1.05rem;">You're on a <strong>7-day learning streak</strong>. Keep building your skills!</p>
      </div>

      <div class="streak-badge-card">
        <div style="width:40px; height:40px; border-radius:10px; background:rgba(249,115,22,0.12); color:#F97316; display:flex; align-items:center; justify-content:center;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
        </div>
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

          <a href="lesson.html?id=${activeCourse.id}" class="btn btn-primary" style="margin-top:20px; display:inline-flex; align-items:center; gap:8px;">
            <span>Resume Course</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
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
                    <a href="lesson.html?id=${course.id}" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                      <span>Go to Class</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
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
              <div style="width:44px; height:44px; border-radius:12px; background:rgba(234,179,8,0.12); color:#EAB308; display:flex; align-items:center; justify-content:center; margin-bottom:14px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
              </div>
              <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--color-primary); font-weight:700;">Certificate of Completion</span>
              <h3 style="font-size:1.3rem; margin:8px 0;">${cert.courseTitle}</h3>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px;">Issued on ${cert.issueDate} • ID: ${cert.id}</p>
              <a href="certificate.html?id=${cert.id}" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                <span>View Certificate</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
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
