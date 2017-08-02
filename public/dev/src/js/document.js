$(function () {

  if ($.support.cors) {
    var navUrl = '//qianbao.jd.com/p/page/slide-nav.htm #slideNav';
    var documentUrl = '//qianbao.jd.com/p/page/document.htm #document';
    $('#slideNavWrap').load(navUrl);
    $('#documentWrap').load(documentUrl);
  }
  else {
    $.ajax({
      url: "//qianbao.jd.com/p/page/slide-nav.htm",
      data: null,
      contentType: "text/plain",
      type: "GET"
    }).done(function (e) {
      var slideNav = $('<div></div>').append(e).find('#slideNav').html();
      $('#slideNavWrap').html(slideNav);
    });
    $.ajax({
      url: "//qianbao.jd.com/p/page/document.htm",
      data: null,
      contentType: "text/plain",
      type: "GET"
    }).done(function (e) {
      var document = $('<div></div>').append(e).find('#document').html();
      $('#documentWrap').html(document);
    });
  }

  $(window).scroll(function () {

    var scrollY = $(this).scrollTop();

    //滚动条在Y轴上的滚动距离
    function getScrollTop() {
      var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    }

    //文档的总高度
    function getScrollHeight() {
      var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      return scrollHeight;
    }

    //浏览器视口的高度
    function getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }

    if (scrollY >= 390 && (getScrollTop() + getWindowHeight() + 300 - getScrollHeight() <= 0)) {
      $('.slide-nav').addClass('fixed');
    }
    else {
      $('.slide-nav').removeClass('fixed');
    }

  });

})