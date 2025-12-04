export default{
  init(root){
    document.body.classList.remove('book-active');
    //common
    $(function(){
      //tab-menu
      $('.tab-menu a').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        const li = $(this).parent();
        li.addClass('active').siblings().removeClass('active');

        const id = $(this).attr('href');
        const target = document.querySelector(id);
        if (!target) return;

        // sticky 탭 높이
        const offset = 120; 

        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      });

      //icon-heart-wish
      $('.icon-heart-wish').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
      });

      $('.sale-acco').on('click', function(){
        $(this).toggleClass('active');
        $(this).find('.acc-text').stop().slideToggle(300);
      });

      //footer company
      $('footer .company').on('click',function(){
        $(this).toggleClass('active');
        $(this).find('.company-info').stop().slideToggle(300);
      });
    });

    //star-rate
    document.querySelectorAll('.rating').forEach(rating => {
      const rate = rating.dataset.rate;
      const score = rating.parentElement.querySelector('.score');

      rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
      score.textContent = rate;
    });

    document.querySelectorAll('.percent-bar li').forEach(li=>{
      const percentEl = li.querySelector('.percent-text');
      const percent = percentEl.dataset.barpercent;

      percentEl.textContent = percent;
      const colorBar = li.querySelector('.color-bar');
      colorBar.style.width = percent;
    });

    //main-slider
    var swiper = new Swiper(".detail-swiper", {
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop:true,
    });

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

    document.querySelectorAll('.menu-img').forEach(makeDragScroll);

    //예약 모달
    const gotoBook = document.querySelector('#gotoBook');
    const body = document.querySelector('body');
    const modal = document.querySelector('.book-modal');
    const overlay = document.querySelector('.book-overlay');
    const bookCloseBtn = document.querySelector('.book-close');
    const cancelBtn = document.querySelector('.book-close2');
    const bookSubmitBtn = document.querySelector('.book-btn-wrap .primary');

    let picker = null;
    const today = new Date();

    function openBookModal() {
      modal.style.display = 'block';
      modal.getBoundingClientRect();
      body.classList.add('book-active');
      modal.style.transform = 'translateY(0)';
      modal.style.opacity = '1';

      if (!picker) {
        picker = new Litepicker({
          element: document.getElementById('calendar'),
          inlineMode: true,
          singleMode: true,
          firstDay: 0,
          lang: 'ko',
          format: 'YYYY-MM-DD',
          numberOfMonths: 1,
          numberOfColumns: 1,
          startDate: today,
        });
      }
    }

    function closeBookModal() {
      modal.style.transform = 'translateY(100%)';
      modal.style.opacity = '0';
      body.classList.remove('book-active');

      modal.addEventListener('transitionend', () => {
        if (!body.classList.contains('book-active')) {
          modal.style.display = 'none';
        }
      }, { once: true });
    }

    gotoBook.addEventListener('click',(e)=>{
      e.preventDefault();
      e.stopPropagation();
      openBookModal();
    });

    overlay.addEventListener('click', closeBookModal);
    bookCloseBtn.addEventListener('click', closeBookModal);
    cancelBtn.addEventListener('click', closeBookModal);
    bookSubmitBtn.addEventListener('click', closeBookModal);

    modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    //qty
    const qtys = document.querySelectorAll('.qty');
    qtys.forEach((qty)=>{
      const minusBtn = qty.querySelector('.minus');
      const plusBtn = qty.querySelector('.plus');
      const input = qty.querySelector('input');

      minusBtn.addEventListener('click',()=>{
        if(input.value>1){
          input.value = parseInt(input.value) - 1;
        }
      });
      plusBtn.addEventListener('click',()=>{
        input.value = parseInt(input.value) + 1;
      });
    });

    //예약모달 jquery
    $(function(){
      $('.time').on('click',function(){
        if ($(this).hasClass('select')) return;
        $('.time').removeClass('active');
        $(this).addClass('active');
      });
    });
  }
}