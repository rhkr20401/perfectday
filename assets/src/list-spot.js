export default {
  init(root) {
    // chips 클릭 이벤트
    $('.category-chips li').on('click', function() {
      const category = $(this).data('category');
      $(this).addClass('active').siblings().removeClass('active');

      if (category === 'all') {
        $('.category-list li').show();
      } else {
        $('.category-list li').hide().filter(`[data-category="${category}"]`).show();
      }
    });

    // icon-heart-wish
    $('.icon-heart-wish').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('active');
    });

    // footer company
    $('footer .company').on('click', function() {
      $(this).toggleClass('active');
      $(this).find('.company-info').stop().slideToggle(300);
    });

    // URL에서 카테고리 파라미터 읽기
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    // URL 파라미터가 있으면 해당 카테고리 활성화
    if (category) {
      const $targetChip = $(`.category-chips li[data-category="${category}"]`);
      
      if ($targetChip.length) {
        $targetChip.trigger('click');
        
        // chips 영역으로 스크롤
        setTimeout(() => {
          const chipOffset = $targetChip.position().left;
          $('.category-chips').animate({ scrollLeft: chipOffset - 20 }, 300);
        }, 100);
      }
    }

    // star-rate
    document.querySelectorAll('.rating').forEach(rating => {
      const rate = rating.dataset.rate;
      const score = rating.parentElement.querySelector('.score');

      rating.style.setProperty('--rateWidth', (rate / 5 * 100) + '%');
      score.textContent = rate;
    });

    // chips 드래그 스크롤
    const $chips = $('.chips');
    let isDown = false;
    let startX;
    let scrollLeft;

    $chips.on('mousedown', function(e) {
      isDown = true;
      startX = e.pageX - $(this).offset().left;
      scrollLeft = $(this).scrollLeft();
    });

    $chips.on('mouseleave mouseup', function() {
      isDown = false;
    });

    $chips.on('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - $(this).offset().left;
      const walk = (x - startX) * 2;
      $(this).scrollLeft(scrollLeft - walk);
    });
  }
}