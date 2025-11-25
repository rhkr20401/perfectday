$(function(){
  //chips
  $('.chips li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
  });  

  //tab-menu
  $('.tab-menu li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
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

//index JS_____________________________
// header
const asideToggleBtn = document.querySelector('header .trigger');
const asideCloseBtn = document.querySelector('aside .aside-close');
const body = document.querySelector('body');

asideToggleBtn.addEventListener('click',()=>{
  body.classList.add('aside-active');
});
asideCloseBtn.addEventListener('click',()=>{
  body.classList.remove('aside-active');
});

//bottom nav
