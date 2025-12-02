export default{
  init(root){
    $(function(){
  
      //chips
      $('.category-chips li').on('click',function(){
        const category = $(this).data('category');
        $(this).addClass('active').siblings().removeClass('active');

        if(category==='all'){
          $('.category-list li').show();
        }else{
          $('.category-list li').hide().filter(`[data-category="${category}"]`).show();
        }
      });

      //chips
      $('.cost-chips li').on('click',function(){
        const cost = $(this).data('cost');
        $(this).addClass('active').siblings().removeClass('active');

        if(cost==='all'){

          $('.cost-list li').show();
        }else{
          $('.cost-list li').hide().filter(`[data-cost="${cost}"]`).show();
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
    });
  }
}


