function starsFun(e,t){var n,o=e.length;for(n=0;o>n;n++){var a=e[n].stars;a>=0&&5>=a&&$("#"+t).find(".product-intro-tabs-start .starts:eq("+n+") span:lt("+a+")").addClass("yellow")}}function contentFun(e,t){var n,o=e.length;for(n=0;o>n;n++)$("#"+t+" section .lazy:eq("+n+")").attr("data-original",e[n].icon),$("#"+t+" section > a:eq("+n+")").attr("href","/portal/product-detail-"+e[n].ID+".htm"),$("#"+t+" p > a:eq("+n+")").attr("href","/portal/product-detail-"+e[n].ID+".htm"),$("#"+t+" .title:eq("+n+")").html(e[n].title),$("#"+t+" .sub_title:eq("+n+")").html(e[n].sub_title)}function templateFun(e,t,n){var o=template(t,n);document.getElementById(e).innerHTML=o}function drawingFun(e,t,n){templateFun(e,t,n),contentFun(n,e),lazyloadFun(".lazy"),starsFun(n,e)}function check_submit(){function e(){var e=$("#problem_description").val().length;if(regCompanyName.test(t))if(regUserName.test(n))if(regMobile.test(o))if(regSmsCode.test(r))if(10>e)i.text("请尽量详细描述您的问题！");else{var c={companyName:t,userName:n,phoneNo:o,problemDesc:a,vCode:r};c=JSON.stringify(c),console.log("提交的数据：",c),verifiedSmsCode(JSON.stringify({phone:o,code:r}),postdata.bind(null,c))}else i.text("请输入手机验证码！");else i.text("手机号码格式不正确！");else i.text("请输入有效姓名，方便与您进一步沟通！");else i.text("请输入有效公司，方便与您进一步沟通！")}var t=$("#company_name").val(),n=$("#user_name").val(),o=$("#phone_number").val(),a=$("#problem_description").val(),r=$("#sms_code").val(),i=$(".error");""===t?i.text("请填写您的公司名称！"):""===n?i.text("请填写您的姓名！"):""===o?i.text("请填写您的手机号码！"):""===a?i.text("请填写您需咨询的问题！"):(""!=t||""==n||""!=o||""!=a)&&(i.text(""),e())}function defaultSet(){$("#company_name").val(""),$("#user_name").val(""),$("#phone_number").val(""),$("#problem_description").val(""),$(".error-code").text(""),$(".error").text(""),$("#sms_code").val(""),clearTimeout(loop),count=60,codebtn.removeClass("active").text("获取验证码")}function postdata(e){getDataInfo(e).done(function(e){return e=e.applyEmail,"00000"===e.code&&(setTimeout(function(){$(".counsel-loading").addClass("hide"),$(".counsel-success").removeClass("hide"),$(".closebt-success").click(function(){$(".counsel-form-con").removeClass("hide"),$(".counsel-success").addClass("hide")}),defaultSet()},1e3),MtaH5.clickStat("contactCommitSuccess")),!1}).fail(function(){defaultSet(),console.log("数据提交失败")})}!function(){function e(e){return e.replace(_,"").replace(b,",").replace(y,"").replace(w,"").replace(A,"").split(C)}function t(e){return"'"+e.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function n(n,o){function a(e){return f+=e.split(/\n/).length-1,u&&(e=e.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),e&&(e=v[1]+t(e)+v[2]+"\n"),e}function r(t){var n=f;if(l?t=l(t,o):i&&(t=t.replace(/\n/g,function(){return f++,"$line="+f+";"})),0===t.indexOf("=")){var a=d&&!/^=[=#]/.test(t);if(t=t.replace(/^=[=#]?|[\s;]*$/g,""),a){var r=t.replace(/\s*\([^\)]+\)/,"");p[r]||/^(include|print)$/.test(r)||(t="$escape("+t+")")}else t="$string("+t+")";t=v[1]+t+v[2]}return i&&(t="$line="+n+";"+t),g(e(t),function(e){if(e&&!m[e]){var t;t="print"===e?b:"include"===e?y:p[e]?"$utils."+e:h[e]?"$helpers."+e:"$data."+e,w+=e+"="+t+",",m[e]=!0}}),t+"\n"}var i=o.debug,c=o.openTag,s=o.closeTag,l=o.parser,u=o.compress,d=o.escape,f=1,m={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},$="".trim,v=$?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],_=$?"$out+=text;return $out;":"$out.push(text);",b="function(){var text=''.concat.apply('',arguments);"+_+"}",y="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+_+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(i?"$line=0,":""),A=v[0],C="return new String("+v[3]+");";g(n.split(c),function(e){e=e.split(s);var t=e[0],n=e[1];1===e.length?A+=a(t):(A+=r(t),n&&(A+=a(n)))});var S=w+A+C;i&&(S="try{"+S+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+t(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var k=new Function("$data","$filename",S);return k.prototype=p,k}catch(x){throw x.temp="function anonymous($data,$filename) {"+S+"}",x}}var o=function(e,t){return"string"==typeof t?$(t,{filename:e}):i(e,t)};o.version="3.0.0",o.config=function(e,t){a[e]=t};var a=o.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},r=o.cache={};o.render=function(e,t){return $(e,t)};var i=o.renderFile=function(e,t){var n=o.get(e)||m({filename:e,name:"Render Error",message:"Template not found"});return t?n(t):n};o.get=function(e){var t;if(r[e])t=r[e];else if("object"==typeof document){var n=document.getElementById(e);if(n){var o=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");t=$(o,{filename:e})}}return t};var c=function(e,t){return"string"!=typeof e&&(t=typeof e,"number"===t?e+="":e="function"===t?c(e.call(e)):""),e},s={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},l=function(e){return s[e]},u=function(e){return c(e).replace(/&(?![\w#]+;)|[<>"']/g,l)},d=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},f=function(e,t){var n,o;if(d(e))for(n=0,o=e.length;o>n;n++)t.call(e,e[n],n,e);else for(n in e)t.call(e,e[n],n)},p=o.utils={$helpers:{},$include:i,$string:c,$escape:u,$each:f};o.helper=function(e,t){h[e]=t};var h=o.helpers=p.$helpers;o.onerror=function(e){var t="Template Error\n\n";for(var n in e)t+="<"+n+">\n"+e[n]+"\n\n";"object"==typeof console&&console.error(t)};var m=function(e){return o.onerror(e),function(){return"{Template Error}"}},$=o.compile=function(e,t){function o(n){try{return new s(n,c)+""}catch(o){return t.debug?m(o)():(t.debug=!0,$(e,t)(n))}}t=t||{};for(var i in a)void 0===t[i]&&(t[i]=a[i]);var c=t.filename;try{var s=n(e,t)}catch(l){return l.filename=c||"anonymous",l.name="Syntax Error",m(l)}return o.prototype=s.prototype,o.toString=function(){return s.toString()},c&&t.cache&&(r[c]=o),o},g=p.$each,v="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",_=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,b=/[^\w$]+/g,y=new RegExp(["\\b"+v.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,A=/^,+|,+$/g,C=/^$|,+/;a.openTag="<!",a.closeTag="!>";var S=function(e,t){var n=t.split(":"),o=n.shift(),a=n.join(":")||"";return a&&(a=", "+a),"$helpers."+o+"("+e+a+")"};a.parser=function(e){e=e.replace(/^\s/,"");var t=e.split(" "),n=t.shift(),a=t.join(" ");switch(n){case"if":e="if("+a+"){";break;case"else":t="if"===t.shift()?" if("+t.join(" ")+")":"",e="}else"+t+"{";break;case"/if":e="}";break;case"each":var r=t[0]||"$data",i=t[1]||"as",c=t[2]||"$value",s=t[3]||"$index",l=c+","+s;"as"!==i&&(r="[]"),e="$each("+r+",function("+l+"){";break;case"/each":e="});";break;case"echo":e="print("+a+");";break;case"print":case"include":e=n+"("+t.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(a)){var u=!0;0===e.indexOf("#")&&(e=e.substr(1),u=!1);for(var d=0,f=e.split("|"),p=f.length,h=f[d++];p>d;d++)h=S(h,f[d]);e=(u?"=":"=#")+h}else e=o.helpers[n]?"=#"+n+"("+t.join(",")+");":"="+e}return e},"function"==typeof define?define(function(){return o}):"undefined"!=typeof exports?module.exports=o:this.template=o}(),!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.Zepto)}(function(e,t){function n(){}function o(e,t){var n;return n=t._$container==f?("innerHeight"in d?d.innerHeight:f.height())+f.scrollTop():t._$container.offset().top+t._$container.height(),n<=e.offset().top-t.threshold}function a(t,n){var o;return o=n._$container==f?f.width()+(e.fn.scrollLeft?f.scrollLeft():d.pageXOffset):n._$container.offset().left+n._$container.width(),o<=t.offset().left-n.threshold}function r(e,t){var n;return n=t._$container==f?f.scrollTop():t._$container.offset().top,n>=e.offset().top+t.threshold+e.height()}function i(t,n){var o;return o=n._$container==f?e.fn.scrollLeft?f.scrollLeft():d.pageXOffset:n._$container.offset().left,o>=t.offset().left+n.threshold+t.width()}function c(e,t){var n=0;e.each(function(c,s){function l(){u.trigger("_lazyload_appear"),n=0}var u=e.eq(c);if(!(u.width()<=0&&u.height()<=0||"none"===u.css("display")))if(t.vertical_only)if(r(u,t));else if(o(u,t)){if(++n>t.failure_limit)return!1}else l();else if(r(u,t)||i(u,t));else if(o(u,t)||a(u,t)){if(++n>t.failure_limit)return!1}else l()})}function s(e){return e.filter(function(t,n){return!e.eq(t)._lazyload_loadStarted})}function l(e,t){function n(){i=0,c=+new Date,r=e.apply(o,a),o=null,a=null}var o,a,r,i,c=0;return function(){o=this,a=arguments;var e=new Date-c;return i||(e>=t?n():i=setTimeout(n,t-e)),r}}var u,d=window,f=e(d),p={threshold:0,failure_limit:0,event:"scroll",effect:"show",effect_params:null,container:d,data_attribute:"original",data_srcset_attribute:"original-srcset",skip_invisible:!0,appear:n,load:n,vertical_only:!1,check_appear_throttle_time:300,url_rewriter_fn:n,no_fake_img_loader:!1,placeholder_data_img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",placeholder_real_img:"http://img14.360buyimg.com/cms/jfs/t3577/310/228555234/120/b6c0ec65/58047680Nbed6a807.png"};u=function(){var e=Object.prototype.toString;return function(t){return e.call(t).replace("[object ","").replace("]","")}}(),e.fn.hasOwnProperty("lazyload")||(e.fn.lazyload=function(t){var o,a,r,i=this;return e.isPlainObject(t)||(t={}),e.each(p,function(n,o){-1!=e.inArray(n,["threshold","failure_limit","check_appear_throttle_time"])?"String"==u(t[n])?t[n]=parseInt(t[n],10):t[n]=o:"container"==n?(t.hasOwnProperty(n)?t[n]==d||t[n]==document?t._$container=f:t._$container=e(t[n]):t._$container=f,delete t.container):!p.hasOwnProperty(n)||t.hasOwnProperty(n)&&u(t[n])==u(p[n])||(t[n]=o)}),o="scroll"==t.event,r=0==t.check_appear_throttle_time?c:l(c,t.check_appear_throttle_time),a=o||"scrollstart"==t.event||"scrollstop"==t.event,i.each(function(o,r){var c=this,l=i.eq(o),u=l.attr("src"),d=l.attr("data-"+t.data_attribute),f=t.url_rewriter_fn==n?d:t.url_rewriter_fn.call(c,l,d),p=l.attr("data-"+t.data_srcset_attribute),h=l.is("img");return 1==l._lazyload_loadStarted||u==f?(l._lazyload_loadStarted=!0,void(i=s(i))):(l._lazyload_loadStarted=!1,h&&!u&&l.one("error",function(){l.attr("src",t.placeholder_real_img)}).attr("src",t.placeholder_data_img),l.one("_lazyload_appear",function(){function o(){a&&l.hide(),h?(p&&l.attr("srcset",p),f&&l.attr("src",f)):l.css("background-image",'url("'+f+'")'),a&&l[t.effect].apply(l,r?t.effect_params:[]),i=s(i)}var a,r=e.isArray(t.effect_params);l._lazyload_loadStarted||(a="show"!=t.effect&&e.fn[t.effect]&&(!t.effect_params||r&&0==t.effect_params.length),t.appear!=n&&t.appear.call(c,l,i.length,t),l._lazyload_loadStarted=!0,t.no_fake_img_loader||p?(t.load!=n&&l.one("load",function(){t.load.call(c,l,i.length,t)}),o()):e("<img />").one("load",function(){o(),t.load!=n&&t.load.call(c,l,i.length,t)}).attr("src",f))}),void(a||l.on(t.event,function(){l._lazyload_loadStarted||l.trigger("_lazyload_appear")})))}),a&&t._$container.on(t.event,function(){r(i,t)}),f.on("resize load",function(){r(i,t)}),e(function(){r(i,t)}),this})}),function(e,t,n,o){function a(t,n){this.element=t,this.$elem=e(this.element),this.options=e.extend({},i,n),this._defaults=i,this._name=r,this.init()}var r="tabulous",i={effect:"scale"};a.prototype={init:function(){var t=this.$elem.find("ul li a"),n=this.$elem.find("li:first-child").find("a");this.$elem.find("li:last-child").after('<span class="tabulousclear"></span>');"scale"==this.options.effect?tab_content=this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hidescale"):"slideLeft"==this.options.effect?tab_content=this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hideleft"):"scaleUp"==this.options.effect?tab_content=this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hidescaleup"):"flip"==this.options.effect&&(tab_content=this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hideflip"));var o=this.$elem.find("#product-intro-tabs-con"),a=o.find("div:first").height(),r=this.$elem.find("div:first").find("div");r.css({}),o.css("height",a+"px"),n.addClass("tabulous_active"),t.bind("click",{myOptions:this.options},function(n){n.preventDefault();var a=n.data.myOptions,i=(a.effect,e(this)),c=i.parent().parent().parent(),s=i.attr("href");o.addClass("transition"),t.removeClass("tabulous_active"),i.addClass("tabulous_active"),thisdivwidth=c.find("div"+s).height(),r.removeClass("showscale").addClass("make_transist").addClass("hidescale"),c.find("div"+s).addClass("make_transist").addClass("showscale"),o.css("height",thisdivwidth+"px")})},yourOtherFunction:function(e,t){}},e.fn[r]=function(e){return this.each(function(){new a(this,e)})}}(jQuery,window,document);var lazyloadFun=function(e){var t=$(e).attr("data-original");if("{icon}"!==t){var n={threshold:0,effect:"fadeIn",effect_params:"400",placeholder_data_img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==",event:"scroll"};$(e).lazyload(n)}},getDataInfo=function(){return $.ajax({type:"GET",url:"/portal/productList",dataType:"json",charset:"UTF-8"})};getDataInfo().done(function(e){function t(t){var n;n="all"!==t?$.grep(e,function(e){return e.type==t}):e,drawingFun(t,"virtual-"+t,n);var o=$("#product-intro-tabs-con"),a=o.find("#"+t).height();o.css("height",a+"px")}function n(e){var e,t=new Object;if(-1!=e.indexOf("?")){var n=e.substr(1);strs=n.split("&");for(var o=0;o<strs.length;o++)t[strs[o].split("=")[0]]=unescape(strs[o].split("=")[1])}return t}e=e.data,drawingFun("all","virtual-all",e);var o=$("#product-intro-tabs-con"),a=o.find("#all").height();o.css("height",a+"px"),$("#product-intro-tabs ul li a").click(function(){var e=$(this).attr("title");t(e)}),$(document).ready(function(){var e=n(location.search).tab;$("."+e).trigger("click")})}).fail(function(){});var regCompanyName=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/,regUserName=/^[\u4E00-\u9FA5A-Za-z_]+$/,regMobile=/^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/,regSmsCode=/^\S+$/,getSmsCode=function(e){return $.ajax({type:"POST",url:"/portal/extend/getSmsCode",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){}})},verifiedSmsCode=function(e,t){return $.ajax({type:"POST",url:"/portal/extend/verifiedSmsCode",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){}}).done(function(e){"00000"===e.code?t():$(".error-code").text(e.msg).removeClass("correct").addClass("wrong")}).fail(function(){$(".counsel-loading").addClass("hide")})},count=60,loop,codebtn=$(".span-vercode"),timerSmsCode=function(){if(codebtn.removeClass("active").text(--count+"s后重新获取"),0===count){clearTimeout(loop),count=60;var e=$("#phone_number").val();regMobile.test(e)&&codebtn.addClass("active"),codebtn.text("重新获取")}else loop=setTimeout(timerSmsCode,1e3)},getDataInfo=function(e){return $.ajax({type:"POST",url:"/portal/extend/applyEmail",dataType:"json",contentType:"application/json",charset:"UTF-8",async:!0,data:e,timeout:6e3,beforeSend:function(){$(".counsel-form-con").addClass("hide"),$(".counsel-loading").removeClass("hide")}})};$(document).ready(function(){$("#submit").click(function(){return check_submit(),!1}),$(".ui-input input").on("focus",function(e){$(this).parent().addClass("focus")}).on("blur",function(e){$(this).parent().removeClass("focus")}),$("#problem_description").on("focus",function(e){$(this).addClass("focus")}).on("blur",function(e){$(this).removeClass("focus")}),$("#phone_number").on("change",function(e){var t="手机号码格式不正确！";if(regMobile.test(this.value)){if(60>count)return;$(".span-vercode").addClass("active"),$(".error").text()===t&&$(".error").text("")}else $(".span-vercode").removeClass("active"),60===count&&$(".error").text(t)}),$(".span-vercode").on("click",function(e){var t=$("#phone_number").val();$(".error");regMobile.test(t)&&60===count&&(timerSmsCode(),getSmsCode(JSON.stringify({receiver:t,type:1})).done(function(e){"00000"===e.code&&$(".error-code").text("验证码已发送到您的手机，10分钟内有效").removeClass("wrong").addClass("correct")}).fail(function(){$(".error-code").text("验证码发送失败，请稍后再试").removeClass("correct").addClass("wrong")}))})}),function e(t,e,n,o){$(document).ready(function(){$(t).center()}),$(document.body).on("click",o,function(n){n.preventDefault(),$(window).trigger("counselInit"),$(e).show(),$(t).fadeIn(),defaultSet(),MtaH5.clickStat("contact")}),$(document.body).on("click",n,function(){defaultSet(),$(t).hide(),$(e).fadeOut()}),jQuery.fn.center=function(e){var t=this;body_width=parseInt($(window).width()),body_height=parseInt($(window).height()),block_width=parseInt(t.width()),block_height=parseInt(t.height()),left_position=parseInt(body_width/2-block_width/2+$(window).scrollLeft()),body_width<block_width&&(left_position=0+$(window).scrollLeft()),top_position=parseInt(body_height/2-block_height/2+$(window).scrollTop()),body_height<block_height&&(top_position=0+$(window).scrollTop()),e?(t.stop(),t.css({position:"absolute"}),t.animate({top:top_position,left:left_position},100,"linear")):(t.css({position:"absolute"}),t.css({top:.5*($(window).height()-$(o).height()),left:left_position}),$(window).bind("resize",function(){t.center(!e)}),$(window).bind("scroll",function(){t.center(!e)}),$(window).bind("counselInit",function(){t.center(!e)}))}}(".counsel-container",".counsel-cover",".closebt",".consultation"),$(window).scroll(function(){var e=$(this).scrollTop();e>=390?$(".header").addClass("fixed"):$(".header").removeClass("fixed")});var returntop=$(".returntop");returntop&&returntop.on("click",function(e){return e.preventDefault(),$("body,html").animate({scrollTop:0},1e3),!1}),$(function(){var e=function(){this.expireMinutes=30};e.prototype={constructor:e,init:function(){var e=this.getUrlParam("auth"),t=this.getUrlParam("loginName");if(""!==e&&""!==t){var n=new Date,o=this.expireMinutes;n.setTime(n.getTime()+60*o*1e3),document.cookie="auth="+e+";path=/;expires="+n.toGMTString(),document.cookie="loginName="+t+";path=/;expires="+n.toGMTString(),location.href=location.href.split("?")[0]}this.attachEvent(),this.addActiveMark()},attachEvent:function(){$(document.body).on("click","#login",function(e){return e&&e.preventDefault?(e.preventDefault(),MtaH5.clickStat("loginBtnClick"),void(location.href=$(this).attr("href")+"?redirect="+encodeURIComponent(location.href))):(window.event.returnValue=!1,!1)}),$(document.body).on("click","#register",function(e){MtaH5.clickStat("regBtnClick"),location.href=$(this).attr("href")+"?redirect="+encodeURIComponent(location.href)+"&action=register"}),$(document.body).on("click","#abs",function(e){MtaH5.clickStat("absBtnClick")}),$(document.body).on("click","#logout",function(e){return e&&e.preventDefault?(e.preventDefault(),MtaH5.clickStat("logoutBtnClick"),void $.ajax({type:"POST",dataType:"json",contentType:"application/json",url:"/portal/extend/logout",data:{},success:function(e){if(e=e.logout,"0"==e.resultCode){var t=new Date;t.setTime(t.getTime()-1e4),document.cookie="auth= ;path=/;expires="+t.toGMTString(),document.cookie="loginName= ;path=/;expires="+t.toGMTString(),window.location.reload()}}})):(window.event.returnValue=!1,!1)})},addActiveMark:function(){$(".nav>ul>li>a").each(function(){var e=$(this).attr("href");location.href.indexOf(e)>-1&&$(this).parent("li").addClass("active"),location.href.indexOf("solution")>-1&&$(".dropdown").addClass("active"),location.href.indexOf("detail")>-1&&$(".product-intro").addClass("active")})},getUrlParam:function(e){var t="",n=!1;if(0==document.location.search.indexOf("?")&&document.location.search.indexOf("=")>1)for(arrSource=unescape(document.location.search).substring(1,document.location.search.length).split("&"),i=0;i<arrSource.length&&!n;)arrSource[i].indexOf("=")>0&&arrSource[i].split("=")[0].toLowerCase()==e.toLowerCase()&&(t=arrSource[i].split("=")[1],n=!0),i++;return t}};var t=new e;t.init()});