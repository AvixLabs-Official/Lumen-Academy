/**
 * LUMEN ACADEMY - Course Catalog, Filtering, & Enrollment Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCourseCatalog();
});

function initCourseCatalog() {
  const gridContainer = document.getElementById('catalog-courses-grid');
  if (!gridContainer) return;

  let activeCategory = 'All';
  let activeLevel = 'All';
  let activePrice = 'All';
  let activeSort = 'popular';
  let searchQuery = '';

  const searchInput = document.getElementById('catalog-search-input');
  const catPills = document.getElementById('catalog-cat-pills');
  const levelSelect = document.getElementById('catalog-level-select');
  const priceSelect = document.getElementById('catalog-price-select');
  const sortSelect = document.getElementById('catalog-sort-select');
  const clearBtn = document.getElementById('catalog-clear-filters-btn');

  function filterAndRenderCourses() {
    let result = [...COURSES_DATA];

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Level Filter
    if (activeLevel !== 'All') {
      result = result.filter(c => c.level.toLowerCase() === activeLevel.toLowerCase());
    }

    // Price Filter
    if (activePrice === 'under1500') {
      result = result.filter(c => c.price < 1500);
    } else if (activePrice === '1500to2500') {
      result = result.filter(c => c.price >= 1500 && c.price <= 2500);
    } else if (activePrice === 'over2500') {
      result = result.filter(c => c.price > 2500);
    }

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    // Sort Options
    if (activeSort === 'popular') {
      result.sort((a, b) => b.students - a.students);
    } else if (activeSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    // Render Grid
    if (result.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-courses-box">
          <h3>No courses found matching your criteria</h3>
          <p>Try resetting filters or searching for UI/UX, JavaScript, Data, or Marketing.</p>
        </div>
      `;
      return;
    }

    const savedIds = getStoredSavedCourses();
    const enrolledCourses = getStoredEnrolledCourses();

    gridContainer.innerHTML = result.map(c => {
      const inst = INSTRUCTORS_DATA.find(i => i.id === c.instructorId);
      const isSaved = savedIds.includes(c.id);
      const enrolledObj = enrolledCourses.find(x => x.id === c.id);

      return `
        <div class="course-card">
          <div class="course-card-thumb">
            <img src="${c.thumbnail}" alt="${c.title}" loading="lazy">
            <span class="course-cat-tag">${c.category}</span>
            <button class="bookmark-btn ${isSaved ? 'active' : ''}" data-id="${c.id}" aria-label="Save Course">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>

          <div class="course-card-body">
            <h3 class="course-card-title">
              <a href="course-detail.html?id=${c.id}">${c.title}</a>
            </h3>
            <p class="course-card-inst">by ${inst ? inst.name : 'Lumen Faculty'}</p>

            <div class="course-card-meta">
              <span>★ ${c.rating} (${c.reviewCount})</span>
              <span>⏱ ${c.duration}</span>
              <span>• ${c.level}</span>
            </div>

            ${enrolledObj ? `
              <div class="course-card-progress">
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" style="width: ${enrolledObj.progress}%;"></div>
                </div>
                <div class="progress-txt">${enrolledObj.progress}% Complete</div>
              </div>
            ` : ''}

            <div class="course-card-footer">
              <span class="course-card-price">${c.priceFormatted}</span>
              ${enrolledObj ? `
                <a href="lesson.html?id=${c.id}" class="btn btn-primary btn-sm">Continue →</a>
              ` : `
                <button class="btn btn-outline btn-sm enroll-trigger-btn" data-id="${c.id}">Enroll Now</button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind Enrollment Modals
    gridContainer.querySelectorAll('.enroll-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        openEnrollmentModal(id);
      });
    });

    // Bind Bookmark Toggles
    gridContainer.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        toggleSaveCourse(id);
        filterAndRenderCourses();
      });
    });
  }

  // Bind Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterAndRenderCourses();
    });
  }

  if (catPills) {
    catPills.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category');
        filterAndRenderCourses();
      });
    });
  }

  if (levelSelect) levelSelect.addEventListener('change', (e) => { activeLevel = e.target.value; filterAndRenderCourses(); });
  if (priceSelect) priceSelect.addEventListener('change', (e) => { activePrice = e.target.value; filterAndRenderCourses(); });
  if (sortSelect) sortSelect.addEventListener('change', (e) => { activeSort = e.target.value; filterAndRenderCourses(); });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'All';
      activeLevel = 'All';
      activePrice = 'All';
      activeSort = 'popular';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (levelSelect) levelSelect.value = 'All';
      if (priceSelect) priceSelect.value = 'All';
      if (sortSelect) sortSelect.value = 'popular';
      if (catPills) {
        catPills.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        catPills.querySelector('[data-category="All"]')?.classList.add('active');
      }
      filterAndRenderCourses();
    });
  }

  // Initial Render
  filterAndRenderCourses();
}

/* Enrollment Modal Dialog */
function openEnrollmentModal(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  const inst = INSTRUCTORS_DATA.find(i => i.id === course.instructorId);
  const modal = document.getElementById('enrollment-modal');
  const content = document.getElementById('enrollment-modal-content');

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="enrollment-modal-box">
      <span class="section-tag">CONFIRM ENROLLMENT</span>
      <h2 style="font-size:2rem; margin-bottom:8px;">${course.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px;">Instructor: ${inst ? inst.name : 'Lumen Faculty'} • Duration: ${course.duration}</p>

      <div class="enroll-summary-receipt">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Course Fee</span>
          <div style="font-family:var(--font-display); font-size:2rem; color:var(--color-primary);">${course.priceFormatted}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Access Level</span>
          <div style="font-weight:700; color:var(--color-success);">Lifetime Access</div>
        </div>
      </div>

      <div style="display:flex; gap:16px; margin-top:32px;">
        <button class="btn btn-outline" onclick="closeEnrollmentModal();" style="flex:1;">Cancel</button>
        <button class="btn btn-primary" id="confirm-enroll-btn" style="flex:1;">Confirm & Start Learning →</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById('confirm-enroll-btn')?.addEventListener('click', () => {
    enrollInCourse(courseId);
    closeEnrollmentModal();
    window.location.href = `lesson.html?id=${courseId}`;
  });
}

function closeEnrollmentModal() {
  const modal = document.getElementById('enrollment-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
