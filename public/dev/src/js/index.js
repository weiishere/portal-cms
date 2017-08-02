$(function () {

  var bannerLength = $('.banner .swiper-slide').length;
  var mySwiper = new Swiper('.banner', {
    autoplay: bannerLength > 1 ? 5000 : false,
    loop: bannerLength > 1,
    pagination: bannerLength > 1 ? '.pagination' : null,
    simulateTouch: false,
    paginationClickable: true
  })

  if(bannerLength <= 1){
    $('.banner > .prev').remove();
    $('.banner > .next').remove();
  }
  else{
    $('.banner > .prev').on('click', function (e) {
      e.preventDefault()
      mySwiper.swipePrev()
    })
    $('.banner > .next').on('click', function (e) {
      e.preventDefault()
      mySwiper.swipeNext()
    })
  }

  if($('.finance .case-list')[0]){
    var caseList_1 = new Swiper('.finance .case-list', {
      autoplay: 3000,
      slidesPerView: 3
    })
    $('.finance > .overlay').mouseover(function () {
      caseList_1.resizeFix();
    })
  }


  if($('.edu .case-list')[0]){
    var caseList_2 = new Swiper('.edu .case-list', {
      autoplay: 3000,
      slidesPerView: 3
    })
    $('.edu > .overlay').mouseover(function () {
      caseList_2.resizeFix();
    })
  }

  if($('.hr .case-list')[0]){
    var caseList_3 = new Swiper('.hr .case-list', {
      autoplay: 3000,
      slidesPerView: 3
    })
    $('.hr > .overlay').mouseover(function () {
      caseList_3.resizeFix();
    })
  }

  if($('.shop .case-list')[0]){
    var caseList_4 = new Swiper('.shop .case-list', {
      autoplay: 3000,
      slidesPerView: 3,
      loop: true
    })
    $('.shop > .overlay').mouseover(function () {
      caseList_4.resizeFix();
    })
  }

  if($('.bussiness .case-list')[0]){
    var caseList_5 = new Swiper('.bussiness .case-list', {
      autoplay: 3000,
      slidesPerView: 3,
      loop: true
    })
    $('.bussiness > .overlay').mouseover(function () {
      caseList_5.resizeFix();
    })
  }

  $(".item.safety, .item.risk-management, .item.compliance").mouseover(function(){
    $(".item.open").removeClass('default');
  });
  $(".item.safety, .item.risk-management, .item.compliance").mouseout(function(){
    $(".item.open").addClass('default');
  })

})