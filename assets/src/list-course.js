export default{
  init(root){

  const tabs = document.querySelectorAll('.tab-menu li');
  const contents = document.querySelectorAll('.tabContents > div');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.alt;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        if (c.id === targetId) {
          c.classList.add('show');
        } else {
          c.classList.remove('show');
        }
      });
    });
  });

$('.icon-heart-wish').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();

  $(this).toggleClass('active');

  // aria-pressed 토글
  const isOn = $(this).hasClass('active');
  $(this).attr('aria-pressed', isOn ? 'true' : 'false');
});

/* 비디오슬라이드 */
  function makeDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    container.scrollLeft = scrollLeft - walk;
  });
}

  document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.video_box').forEach(makeDragScroll);
});

//javascript
//star-rate
document.querySelectorAll('.rating').forEach(rating => {
  const rate = rating.dataset.rate;
  const score = rating.parentElement.querySelector('.score');

  rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
  score.textContent = rate;
  });

  // jQuery
  $(function(){
    $('footer .company').on('click',function(){
      $(this).toggleClass('active');
      $(this).find('.company-info').stop().slideToggle(300);
    });
});

  }
};