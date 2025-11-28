export default{
  init(root){
    $(function(){

  //footer company
  $('footer .company').on('click',function(){
    $(this).toggleClass('active');
    $(this).find('.company-info').stop().slideToggle(300);
  });

  //makercourse
   // 0: card1, 1: card2, 2: card3 ...
  $('.makecourse-card').each(function (i) {
    $(this).data('origIndex', i);
  });

  const distances = {
    '0-1': '109m',  // 1 → 2
    '1-2': '360m',  // 2 → 3
    '0-2': '360m'   // 1 → 3 (2 삭제 시)
  };

  function reorderCircleNums() {
    $('.makecourse-card:visible').each(function (index) {
      $(this).find('.circle-num').text(index + 1);
    });
  }

  function updateMeters() {
    const $visibleCards = $('.makecourse-card:visible');

    $('.makecourse-meter').hide();

    $visibleCards.each(function (i) {
      const $card = $(this);
      const origIndex = $card.data('origIndex');
      let distanceText = '';

      if (i === $visibleCards.length - 1) {
        distanceText = '0m';
      } else {
        const $nextCard = $visibleCards.eq(i + 1);
        const origIndexNext = $nextCard.data('origIndex');
        const key = origIndex + '-' + origIndexNext;
        distanceText = distances[key] || '';
      }

      const $meter = $card.closest('li').nextAll('.makecourse-meter').first();
      $meter.find('.makecourse-circle-num').text(distanceText);
      $meter.show();

      //makecourse-save-btn
      $('.makecourse-save-btn').click(function(){
        $('.makecourse-modal').fadeIn();
      });

      //makecourse-modal-btn
      $('.makecourse-modal-btn').on('click', function () {
        localStorage.setItem('showFirstMycourseCard', 'true');
        
        // mycourse.html로 이동
        window.location.href = '/mycourse';
      });

    });
  }

  // 닫기 버튼
  $('.makecourse-close-btn').click(function () {
    const $cardLi = $(this).closest('li');
    const $meterLi = $cardLi.next('.makecourse-meter');

    $cardLi.hide();
    $meterLi.hide();

    reorderCircleNums(); 
    updateMeters();      
  });

  // 초기 한 번 세팅해두기
  reorderCircleNums();
  updateMeters();
});


//javascript
//star-rate
document.querySelectorAll('.rating').forEach(rating => {
  const rate = rating.dataset.rate;
  const score = rating.parentElement.querySelector('.score');

  rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
  score.textContent = rate;
});
  }
}