// /assets/common.js
// 공통 유틸과 간단한 이벤트 버스, DOM 헬퍼 모음 (ESM)
export const bus = (() => {
  const map = new Map();
  return {
    on(evt, fn){ const arr = map.get(evt) || []; arr.push(fn); map.set(evt, arr); },
    off(evt, fn){ const arr = map.get(evt) || []; map.set(evt, arr.filter(f => f!==fn)); },
    emit(evt, payload){ (map.get(evt) || []).forEach(fn => fn(payload)); },
    clear(){ map.clear(); }
  };
})();

export function qs(sel, root=document){ return root.querySelector(sel); }
export function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
export function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
export function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

export default {
  bus, qs, qsa, sleep, clamp
};

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

/* 
각자 필요한 내용 복붙으로 사용

//jQuery
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

//javascript
//star-rate
document.querySelectorAll('.rating').forEach(rating => {
  const rate = rating.dataset.rate;
  const score = rating.parentElement.querySelector('.score');

  rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
  score.textContent = rate;
});

*/