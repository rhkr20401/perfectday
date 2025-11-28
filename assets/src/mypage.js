export default{
  init(root){
    $(function(){

  //footer company
  $('footer .company').on('click',function(){
    $(this).toggleClass('active');
    $(this).find('.company-info').stop().slideToggle(300);
  });
  
});

  }
}