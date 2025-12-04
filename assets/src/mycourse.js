export default{
  init(root){
    $(function(){

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

  //내코스2개로 보이기
  const shouldShow = localStorage.getItem('showFirstMycourseCard');

  if (shouldShow === 'true') {
    $('.mycourse-card:first-of-type').css('display', 'block');

    const visibleCards = $('.mycourse-card:visible').length;

    $('.mycourse-title-num').text(visibleCards);

    localStorage.removeItem('showFirstMycourseCard');
  } else {
    const visibleCards = $('.mycourse-card:visible').length;
    $('.mycourse-title-num').text(visibleCards);
  }
});

//mycourse-card 드래그
const sliders = document.querySelectorAll('.mycourse-course');

  sliders.forEach((slider) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    //PC
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('is-grabbing');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('is-grabbing');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('is-grabbing');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    });

    //Mobile
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
      isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    });
  });


  }
}