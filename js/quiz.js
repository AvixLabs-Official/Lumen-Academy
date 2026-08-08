/**
 * LUMEN ACADEMY - Interactive Quiz Engine & Grading System
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuizSystem();
});

function initQuizSystem() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const quiz = SAMPLE_QUIZ_DATA;
  let userAnswers = {};

  container.innerHTML = `
    <div class="quiz-wrapper-box">
      <div class="quiz-header">
        <span class="section-tag">KNOWLEDGE CHECK</span>
        <h2>${quiz.title}</h2>
        <p style="color:var(--text-muted);">Answer all questions to complete Module 1 check.</p>
      </div>

      <form id="quiz-form">
        ${quiz.questions.map((q, qIdx) => `
          <div class="quiz-question-card">
            <h4 class="q-title">${qIdx + 1}. ${q.question}</h4>
            <div class="q-options-list">
              ${q.options.map((opt, optIdx) => `
                <label class="q-option-item">
                  <input type="radio" name="question_${qIdx}" value="${optIdx}" required>
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div style="margin-top:32px; text-align:right;">
          <button type="submit" class="btn btn-primary">Submit Answers →</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('quiz-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;

    quiz.questions.forEach((q, idx) => {
      const selected = document.querySelector(`input[name="question_${idx}"]:checked`);
      if (selected && parseInt(selected.value, 10) === q.correctAnswerIndex) {
        score++;
      }
    });

    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= 70;

    showQuizResultsModal(score, quiz.questions.length, percentage, passed);
  });
}

function showQuizResultsModal(score, total, percentage, passed) {
  const modal = document.getElementById('quiz-result-modal');
  const body = document.getElementById('quiz-result-content');

  if (!modal || !body) return;

  body.innerHTML = `
    <div class="quiz-result-box">
      <div class="result-badge ${passed ? 'pass' : 'fail'}">${passed ? '✓ PASSED' : '✕ RETRY'}</div>
      <h2 style="font-size:2.4rem; margin:12px 0 6px;">${passed ? 'Great Work!' : 'Keep Practicing'}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px;">You scored <strong>${score} out of ${total}</strong> (${percentage}%).</p>

      <div class="score-summary-bar">
        <div class="score-num">${percentage}%</div>
        <span style="font-size:0.85rem; color:var(--text-muted);">Passing threshold: 70%</span>
      </div>

      <div style="display:flex; gap:16px; justify-content:center; margin-top:32px;">
        <a href="dashboard.html" class="btn btn-outline">Back to Dashboard</a>
        <a href="lesson.html?id=crs-01" class="btn btn-primary">Continue Learning →</a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
