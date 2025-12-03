export default {
  init(root) {

    const tabs = root.querySelectorAll('.tab-menu li');
    const contents = root.querySelectorAll('.tabContents > div');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.alt; // "tab1" | "tab2"

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(c => c.classList.toggle('show', c.id === targetId));
      });
    });

    root.querySelectorAll('.icon-heart-wish')?.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      });
    });

    root.querySelectorAll('.rating')?.forEach(rating => {
      const rate = parseFloat(rating.dataset.rate || '0');
      const score = rating.parentElement.querySelector('.score');
      rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
      if (score) score.textContent = rate.toFixed(1);
    });

    const company = root.closest('body')?.querySelector('footer .company');
    if (company) {
      company.addEventListener('click', () => {
        company.classList.toggle('active');
        const info = company.querySelector('.company-info');
        if (info) info.style.display = (info.style.display === 'block' ? 'none' : 'block');
      });
    }
    // 비디오 모달 열기/닫기
    const videoSelect = document.querySelector('.vedio-box li.select');
    const videoCloseBtn = document.querySelector('.video-close');
    if (videoSelect) {
      videoSelect.addEventListener('click', () => {
        document.body.classList.add('video-active');
      });
    }
    if (videoCloseBtn) {
      videoCloseBtn.addEventListener('click', () => {
        document.body.classList.remove('video-active');
      });
    }
    document.addEventListener('click', (e) => {
      if (e.target.closest('.course-btn')) {
        document.body.classList.remove('video-active');
      }
    });
  }
};
