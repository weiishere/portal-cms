//验证手机号码
var regCompanyName = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
var regUserName = /^[\u4E00-\u9FA5A-Za-z_]+$/;
var regMobile = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
var regSmsCode=/^\S+$/;
function check_submit() {
  var company_name = $("#company_name").val();
  var user_name = $("#user_name").val();
  var phone_number = $("#phone_number").val();
  var problem_description = $("#problem_description").val();
  var smsCode=$("#sms_code").val();
  var error = $(".error");
  function isMobile() {
    var regDescription = $("#problem_description").val().length;
    if (!regCompanyName.test(company_name)) {
      error.text("请输入有效公司，方便与您进一步沟通！");
    } else if (!regUserName.test(user_name)) {
      error.text("请输入有效姓名，方便与您进一步沟通！");
    } else if (!regMobile.test(phone_number)) {
      error.text("手机号码格式不正确！");
    } else if(!regSmsCode.test(smsCode)){
      error.text("请输入手机验证码！");
    }
    else if (regDescription < 10) {
      error.text("请尽量详细描述您的问题！");
    } else {
      var poat_data = {
        "companyName": company_name,
        "userName": user_name,
        "phoneNo": phone_number,
        "problemDesc": problem_description,
        "vCode":smsCode
      }
      /* *************************************
       companyName	公司名称	String	 是
       phoneNo	    手机号	     String	  是
       problemDesc	问题描述	String	 是
       userName	用户名	     String	  是
       ************************************* */
      poat_data = JSON.stringify(poat_data);
      console.log('提交的数据：', poat_data);
      verifiedSmsCode(JSON.stringify({
        phone:phone_number,
        code:smsCode
      }),postdata.bind(null,poat_data))
      // postdata(poat_data);//检测完毕请求数据
    }
  }

  if (company_name === "") {
    error.text("请填写您的公司名称！");
  } else if (user_name === "") {
    error.text("请填写您的姓名！");
  } else if (phone_number === "") {
    error.text("请填写您的手机号码！");
  } else if (problem_description === "") {
    error.text("请填写您需咨询的问题！");
  } else if (company_name != "" || user_name == "" || phone_number != "" || problem_description != "") {
    error.text("")
    isMobile()
  }

}

//获取手机验证码
var getSmsCode=function (data) {
  return $.ajax({
    type: 'POST',
    url: '/portal/extend/getSmsCode',
    dataType: 'json',
    contentType: 'application/json',
    charset: 'UTF-8',
    async: true,
    data: data,
    timeout: 6000,
    beforeSend: function () {
      // $(".counsel-form-con").addClass("hide")
      // $(".counsel-loading").removeClass("hide")
    }
  });
}
//验证手机验证码
var verifiedSmsCode=function (data, callback) {
  return $.ajax({
    type: 'POST',
    url: '/portal/extend/verifiedSmsCode',
    dataType: 'json',
    contentType: 'application/json',
    charset: 'UTF-8',
    async: true,
    data: data,
    timeout: 6000,
    beforeSend: function () {
    }
  }).done(function (response) {
    if (response.code === "00000") {
      callback();
    }else{
      $('.error-code').text(response.msg).removeClass('correct').addClass('wrong');
    }
  }).fail(function () {
    $(".counsel-loading").addClass("hide");
  })
}
//再次获取验证码定时器
var count=60,loop,codebtn=$('.span-vercode');
var timerSmsCode=function () {
  codebtn.removeClass('active').text(--count+'s后重新获取');
  if(count===0){
    clearTimeout(loop);
    count=60;
    var phone_number = $("#phone_number").val();
    if(regMobile.test(phone_number)){
      codebtn.addClass('active');
    }
    codebtn.text('重新获取');
  }else{
    loop=setTimeout(timerSmsCode,1000);
  }
}
// Ajax请求
var getDataInfo = function (data) {
  return $.ajax({
    type: 'POST',
    url: '/portal/extend/applyEmail',
    dataType: 'json',
    contentType: 'application/json',
    charset: 'UTF-8',
    async: true,
    data: data,
    timeout: 6000,
    beforeSend: function () {
      $(".counsel-form-con").addClass("hide")
      $(".counsel-loading").removeClass("hide")
    }
  });
}
function defaultSet(){
  $("#company_name").val('');
  $("#user_name").val('');
  $("#phone_number").val('');
  $("#problem_description").val('');
  $('.error-code').text('');
  $('.error').text('');
  $('#sms_code').val('');
  clearTimeout(loop);
  count=60;
  codebtn.removeClass('active').text('获取验证码');
}
// 返回数据处理
function postdata(poat_data) {
  getDataInfo(poat_data)
    .done(function (response) {
      response = response.applyEmail;
      //console.log(response);
      if (response.code === "00000") {
        setTimeout(function () {
          $(".counsel-loading").addClass("hide")
          $(".counsel-success").removeClass("hide")
          $(".closebt-success").click(function () {
            $(".counsel-form-con").removeClass("hide")
            $(".counsel-success").addClass("hide")
          })
          defaultSet();
        }, 1000)
        //埋点
        MtaH5.clickStat('contactCommitSuccess');
      }

      return false;//防止刷新页面
    })
    .fail(function () {
      defaultSet();
      console.log("数据提交失败");
    });
}

$(document).ready(function () {
  $("#submit").click(function () {
    check_submit();
    return false;//防止刷新页面
  });
  //聚焦输入框，边框颜色改变
  $(".ui-input input").on('focus',function (event) {
    $(this).parent().addClass('focus')
  }).on('blur',function (event) {
    $(this).parent().removeClass('focus')
  })
  $("#problem_description").on("focus",function (event) {
    $(this).addClass('focus');
  }).on("blur",function (event) {
    $(this).removeClass('focus');
  })
  //监听手机号输入，改变获取验证码按钮状态
  $("#phone_number").on('change',function (event) {
    var tip='手机号码格式不正确！';
    if(regMobile.test(this.value)){
      if(count<60){
        return;
      }
      $(".span-vercode").addClass('active');
      if($('.error').text()===tip){
        $('.error').text('');
      }
    }else{
      $(".span-vercode").removeClass('active');
      if(count===60){
        $('.error').text(tip);
      }
    }
  })
  //获取短信验证码事件
  $(".span-vercode").on('click',function (event) {
    var phone=$('#phone_number').val();
    var error=$(".error");
    if(regMobile.test(phone)&&count===60){
      timerSmsCode();
      getSmsCode(JSON.stringify({
        receiver:phone,
        type:1
      })).done(function (response) {
        if(response.code==='00000'){
          $('.error-code').text('验证码已发送到您的手机，10分钟内有效').removeClass('wrong').addClass('correct');
        }
      }).fail(function () {
        $('.error-code').text('验证码发送失败，请稍后再试').removeClass('correct').addClass('wrong');
      })
    }else{
      return;
    }
  })
});

//弹出层
(function cover(container, cover, close, click) {
  $(document).ready(function () {
    $(container).center();//初始化位置
  })
  $(document.body).on('click', click, function (e) {
    e.preventDefault();//阻止冒泡的说
    $(window).trigger('counselInit');//初始化位置
    $(cover).show();
    $(container).fadeIn();
    defaultSet();
    //埋点
    MtaH5.clickStat('contact');
  })
  $(document.body).on('click', close, function () {
    defaultSet();
    $(container).hide();
    $(cover).fadeOut();
  });

  // $(document.body).on('click', cover, function(){
  //     $(container).hide();
  //     $(cover).fadeOut();
  // });

  jQuery.fn.center = function (loaded) {
    var obj = this;
    body_width = parseInt($(window).width());
    body_height = parseInt($(window).height());
    block_width = parseInt(obj.width());
    block_height = parseInt(obj.height());

    left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
    if (body_width < block_width) {
      left_position = 0 + $(window).scrollLeft();
    }
    ;

    top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
    if (body_height < block_height) {
      top_position = 0 + $(window).scrollTop();
    }
    ;

    if (!loaded) {

      obj.css({
        'position': 'absolute'
      });
      obj.css({
        'top': ($(window).height() - $(click).height()) * 0.5,
        'left': left_position
      });
      $(window).bind('resize', function () {
        obj.center(!loaded);
      });
      $(window).bind('scroll', function () {
        obj.center(!loaded);
      });
      $(window).bind('counselInit', function () {
        obj.center(!loaded);
      });

    } else {
      obj.stop();
      obj.css({
        'position': 'absolute'
      });
      //视窗发生变化，弹层动态更新位置
      obj.animate({
        'top': top_position,
        'left': left_position
      }, 100, 'linear');
    }
  }

})(".counsel-container", ".counsel-cover", ".closebt", ".consultation");

$(window).scroll(function () {
  var scrollY = $(this).scrollTop();
  if (scrollY >= 390) {
    $('.header').addClass('fixed');
  }
  else {
    $('.header').removeClass('fixed');
  }
});

//返回顶部
var returntop = $('.returntop');
returntop && returntop.on('click', function (e) {
  e.preventDefault();
  $('body,html').animate({scrollTop: 0}, 1000);
  return false;
});

/* @Add by lizhiyang1
 * @Desc 登录逻辑处理
 */
$(function () {

  var Login = function () {
    this.expireMinutes = 30; //登录过期时间
  }

  Login.prototype = {
    constructor: Login,
    init: function () {
      var auth = this.getUrlParam('auth');
      var loginName = this.getUrlParam('loginName');
      if (auth !== '' && loginName !== '') {
        var date = new Date();
        var expireMinutes = this.expireMinutes;
        date.setTime(date.getTime() + expireMinutes * 60 * 1000);
        document.cookie = 'auth=' + auth + ';path=/;expires=' + date.toGMTString();
        document.cookie = 'loginName=' + loginName + ';path=/;expires=' + date.toGMTString();
        //重定向
        location.href = location.href.split('?')[0];
      }
      this.attachEvent();
      this.addActiveMark();
    },
    attachEvent: function () {
      var _this = this;
      $(document.body).on('click', '#login', function (e) {
          if (e && e.preventDefault) {
            e.preventDefault();
          }
          else {
            window.event.returnValue = false;
            return false
          }
          MtaH5.clickStat('loginBtnClick');//埋点
          location.href = $(this).attr('href') + '?redirect=' + encodeURIComponent(location.href);
        }
      )
      $(document.body).on('click', '#register', function (e) {
        MtaH5.clickStat('regBtnClick');//埋点
        location.href = $(this).attr('href') + '?redirect=' + encodeURIComponent(location.href) + '&action=register';
      })
      $(document.body).on('click', '#abs', function (e) {
        MtaH5.clickStat('absBtnClick');//埋点
      })
      $(document.body).on('click', '#logout', function (e) {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        else {
          window.event.returnValue = false;
          return false
        }
        MtaH5.clickStat('logoutBtnClick');//埋点
      	$.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            url: '/portal/extend/logout',
            data: {},
            success: function (response) {
            response = response.logout;
              if (response.resultCode == '0') {
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = 'auth= ;path=/;expires=' + date.toGMTString();
                document.cookie = 'loginName= ;path=/;expires=' + date.toGMTString();
                window.location.reload();
              }
            }
          })
      })
    },
    addActiveMark: function(){
      $('.nav>ul>li>a').each(function(){
        var href = $(this).attr('href');
        if(location.href.indexOf(href) > -1){
          $(this).parent('li').addClass('active');
        }
        if(location.href.indexOf('solution') > -1){
          $('.dropdown').addClass('active');
        }
        if(location.href.indexOf('detail') > -1){
          $('.product-intro').addClass('active');
        }
      })
    },
    getUrlParam: function (paramName) {
      var paramValue = '';
      var isFound = false;
      if (document.location.search.indexOf('?') == 0 && document.location.search.indexOf('=') > 1) {
        arrSource = unescape(document.location.search).substring(1, document.location.search.length).split('&');
        i = 0;
        while (i < arrSource.length && !isFound) {
          if (arrSource[i].indexOf('=') > 0) {
            if (arrSource[i].split('=')[0].toLowerCase() == paramName.toLowerCase()) {
              paramValue = arrSource[i].split('=')[1];
              isFound = true;
            }
          }
          i++;
        }
      }
      return paramValue;
    }
  }
  var login = new Login();
  login.init();
})