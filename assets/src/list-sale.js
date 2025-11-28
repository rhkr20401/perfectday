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
});

