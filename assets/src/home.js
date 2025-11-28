export default{
  init(root){
    //common
    $(function(){
      //chips
      $('.home-sale .chips li').on('click',function(){
        const category = $(this).data('category');
        $(this).addClass('active').siblings().removeClass('active');

        if(category==='all'){
          $('.home-sale .sale-list li').show();
        }else{
          $('.home-sale .sale-list li').hide().filter(`[data-category="${category}"]`).show();
        }
      });  

      //icon-heart-wish
      $('.icon-heart-wish').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('active');
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

    //main-slider
    var swiper = new Swiper(".visual-swiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop:true,
    });

    // x-drag
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
    document.querySelectorAll('.video-list, .package-list').forEach(makeDragScroll);

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