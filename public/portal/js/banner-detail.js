function check_submit(){function e(){var e=$("#problem_description").val().length;if(regCompanyName.test(t))if(regUserName.test(o))if(regMobile.test(n))if(regSmsCode.test(a))if(10>e)c.text("请尽量详细描述您的问题！");else{var r={companyName:t,userName:o,phoneNo:n,problemDesc:i,vCode:a};r=JSON.stringify(r),console.log("提交的数据：",r),verifiedSmsCode(JSON.stringify({phone:n,code:a}),postdata.bind(null,r))}else c.text("请输入手机验证码！");else c.text("手机号码格式不正确！");else c.text("请输入有效姓名，方便与您进一步沟通！");else c.text("请输入有效公司，方便与您进一步沟通！")}var t=$("#company_name").val(),o=$("#user_name").val(),n=$("#phone_number").val(),i=$("#problem_description").val(),a=$("#sms_code").val(),c=$(".error");""===t?c.text("请填写您的公司名称！"):""===o?c.text("请填写您的姓名！"):""===n?c.text("请填写您的手机号码！"):""===i?c.text("请填写您需咨询的问题！"):(""!=t||""==o||""!=n||""!=i)&&(c.text(""),e())}function defaultSet(){$("#company_name").val(""),$("#user_name").val(""),$("#phone_number").val(""),$("#problem_description").val(""),$(".error-code").text(""),$(".error").text(""),$("#sms_code").val(""),clearTimeout(loop),count=60,codebtn.removeClass("active").text("获取验证码")}function postdata(e){getDataInfo(e).done(function(e){return e=e.applyEmail,"00000"===e.code&&(setTimeout(function(){$(".counsel-loading").addClass("hide"),$(".counsel-success").removeClass("hide"),$(".closebt-success").click(function(){$(".counsel-form-con").removeClass("hide"),$(".counsel-success").addClass("hide")}),defaultSet()},1e3),MtaH5.clickStat("contactCommitSuccess")),!1}).fail(function(){defaultSet(),console.log("数据提交失败")})}var regCompanyName=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/,regUserName=/^[\u4E00-\u9FA5A-Za-z_]+$/,regMobile=/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/,regSmsCode=/^\S+$/,getSmsCode=function(e){return $.ajax({type:"POST",url:"/portal/extend/getSmsCode",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){}})},verifiedSmsCode=function(e,t){return $.ajax({type:"POST",url:"/portal/extend/verifiedSmsCode",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){}}).done(function(e){"00000"===e.code?t():$(".error-code").text(e.msg).removeClass("correct").addClass("wrong")}).fail(function(){$(".counsel-loading").addClass("hide")})},count=60,loop,codebtn=$(".span-vercode"),timerSmsCode=function(){if(codebtn.removeClass("active").text(--count+"s后重新获取"),0===count){clearTimeout(loop),count=60;var e=$("#phone_number").val();regMobile.test(e)&&codebtn.addClass("active"),codebtn.text("重新获取")}else loop=setTimeout(timerSmsCode,1e3)},getDataInfo=function(e){return $.ajax({type:"POST",url:"/portal/extend/applyEmail",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){$(".counsel-form-con").addClass("hide"),$(".counsel-loading").removeClass("hide")}})};$(document).ready(function(){$("#submit").click(function(){return check_submit(),!1}),$(".ui-input input").on("focus",function(e){$(this).parent().addClass("focus")}).on("blur",function(e){$(this).parent().removeClass("focus")}),$("#problem_description").on("focus",function(e){$(this).addClass("focus")}).on("blur",function(e){$(this).removeClass("focus")}),$("#phone_number").on("change",function(e){var t="手机号码格式不正确！";if(regMobile.test(this.value)){if(60>count)return;$(".span-vercode").addClass("active"),$(".error").text()===t&&$(".error").text("")}else $(".span-vercode").removeClass("active"),60===count&&$(".error").text(t)}),$(".span-vercode").on("click",function(e){var t=$("#phone_number").val();$(".error");regMobile.test(t)&&60===count&&(timerSmsCode(),getSmsCode(JSON.stringify({receiver:t,type:1})).done(function(e){"00000"===e.code&&$(".error-code").text("验证码已发送到您的手机，10分钟内有效").removeClass("wrong").addClass("correct")}).fail(function(){$(".error-code").text("验证码发送失败，请稍后再试").removeClass("correct").addClass("wrong")}))})}),function e(t,e,o,n){$(document).ready(function(){$(t).center()}),$(document.body).on("click",n,function(o){o.preventDefault(),$(window).trigger("counselInit"),$(e).show(),$(t).fadeIn(),defaultSet(),MtaH5.clickStat("contact")}),$(document.body).on("click",o,function(){defaultSet(),$(t).hide(),$(e).fadeOut()}),jQuery.fn.center=function(e){var t=this;body_width=parseInt($(window).width()),body_height=parseInt($(window).height()),block_width=parseInt(t.width()),block_height=parseInt(t.height()),left_position=parseInt(body_width/2-block_width/2+$(window).scrollLeft()),body_width<block_width&&(left_position=0+$(window).scrollLeft()),top_position=parseInt(body_height/2-block_height/2+$(window).scrollTop()),body_height<block_height&&(top_position=0+$(window).scrollTop()),e?(t.stop(),t.css({position:"absolute"}),t.animate({top:top_position,left:left_position},100,"linear")):(t.css({position:"absolute"}),t.css({top:.5*($(window).height()-$(n).height()),left:left_position}),$(window).bind("resize",function(){t.center(!e)}),$(window).bind("scroll",function(){t.center(!e)}),$(window).bind("counselInit",function(){t.center(!e)}))}}(".counsel-container",".counsel-cover",".closebt",".consultation"),$(window).scroll(function(){var e=$(this).scrollTop();e>=390?$(".header").addClass("fixed"):$(".header").removeClass("fixed")});var returntop=$(".returntop");returntop&&returntop.on("click",function(e){return e.preventDefault(),$("body,html").animate({scrollTop:0},1e3),!1}),$(function(){var e=function(){this.expireMinutes=30};e.prototype={constructor:e,init:function(){var e=this.getUrlParam("auth"),t=this.getUrlParam("loginName");if(""!==e&&""!==t){var o=new Date,n=this.expireMinutes;o.setTime(o.getTime()+60*n*1e3),document.cookie="auth="+e+";path=/;expires="+o.toGMTString(),document.cookie="loginName="+t+";path=/;expires="+o.toGMTString(),location.href=location.href.split("?")[0]}this.attachEvent(),this.addActiveMark()},attachEvent:function(){$(document.body).on("click","#login",function(e){return e&&e.preventDefault?(e.preventDefault(),MtaH5.clickStat("loginBtnClick"),void(location.href=$(this).attr("href")+"?redirect="+encodeURIComponent(location.href))):(window.event.returnValue=!1,!1)}),$(document.body).on("click","#register",function(e){MtaH5.clickStat("regBtnClick"),location.href=$(this).attr("href")+"?redirect="+encodeURIComponent(location.href)+"&action=register"}),$(document.body).on("click","#abs",function(e){MtaH5.clickStat("absBtnClick")}),$(document.body).on("click","#logout",function(e){return e&&e.preventDefault?(e.preventDefault(),MtaH5.clickStat("logoutBtnClick"),void $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"/portal/extend/logout",data:{},success:function(e){if(e=e.logout,"0"==e.resultCode){var t=new Date;t.setTime(t.getTime()-1e4),document.cookie="auth= ;path=/;expires="+t.toGMTString(),document.cookie="loginName= ;path=/;expires="+t.toGMTString(),window.location.reload()}}})):(window.event.returnValue=!1,!1)})},addActiveMark:function(){$(".nav>ul>li>a").each(function(){var e=$(this).attr("href");location.href.indexOf(e)>-1&&$(this).parent("li").addClass("active"),location.href.indexOf("solution")>-1&&$(".dropdown").addClass("active"),location.href.indexOf("detail")>-1&&$(".product-intro").addClass("active")})},getUrlParam:function(e){var t="",o=!1;if(0==document.location.search.indexOf("?")&&document.location.search.indexOf("=")>1)for(arrSource=unescape(document.location.search).substring(1,document.location.search.length).split("&"),i=0;i<arrSource.length&&!o;)arrSource[i].indexOf("=")>0&&arrSource[i].split("=")[0].toLowerCase()==e.toLowerCase()&&(t=arrSource[i].split("=")[1],o=!0),i++;return t}};var t=new e;t.init()});