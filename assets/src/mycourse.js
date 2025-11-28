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

  }
}