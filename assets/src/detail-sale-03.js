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

    //예약 모달
    const gotoBook = document.querySelector('#gotoBook');
    const body = document.querySelector('body');
    const modal = document.querySelector('.book-modal');
    const overlay = document.querySelector('.book-overlay');
    const bookCloseBtn = document.querySelector('.book-close');
    const bookCloseBtn2 = document.querySelector('.book-btn-wrap .book-close2');

    let scrollY = 0;

    function openBookModal() {
      body.classList.add('book-active');
      modal.scrollTop = 0;
    }
    function closeBookModal() {
      body.classList.remove('book-active');
    }
    modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    gotoBook.addEventListener('click',(e)=>{
      e.preventDefault();
      e.stopPropagation();
      openBookModal();
    });
    overlay.addEventListener('click', closeBookModal);
    bookCloseBtn.addEventListener('click', closeBookModal);
    bookCloseBtn2.addEventListener('click', closeBookModal);

    // 캘린더
    const calendarEl = document.getElementById('calendar');
    const today = new Date();
    if (calendarEl) {
      new Litepicker({
        element: calendarEl,
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

      $(".book-sale-item").on('click',function(){
        $(this).toggleClass('active');
      });
    });
  }
}