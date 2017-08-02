(function ($, window, document, undefined) {
    var pluginName = "tabulous",
        defaults = {
        effect: "scale"
    };
    function Plugin(element, options) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var links = this.$elem.find("ul li a");
            var firstchild = this.$elem.find("li:first-child").find("a");
            var lastchild = this.$elem.find("li:last-child").after('<span class="tabulousclear"></span>');
            if (this.options.effect == "scale") tab_content = this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hidescale");else if (this.options.effect == "slideLeft") tab_content = this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hideleft");else if (this.options.effect == "scaleUp") tab_content = this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hidescaleup");else if (this.options.effect == "flip") tab_content = this.$elem.find("div").not(":first").not(":nth-child(1)").addClass("hideflip");
            var firstdiv = this.$elem.find("#product-intro-tabs-con");
            var firstdivheight = firstdiv.find("div:first").height();
            var alldivs = this.$elem.find("div:first").find("div");
            alldivs.css({
                // position:"absolute",
                // top:"40px"
            });
            firstdiv.css("height", firstdivheight + "px");
            firstchild.addClass("tabulous_active");
            links.bind("click", {
                myOptions: this.options
            }, function (e) {
                e.preventDefault();
                var $options = e.data.myOptions;
                var effect = $options.effect;
                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr("href");
                firstdiv.addClass("transition");
                links.removeClass("tabulous_active");
                mythis.addClass("tabulous_active");
                thisdivwidth = thisform.find("div" + thislink).height();

                alldivs.removeClass("showscale").addClass("make_transist").addClass("hidescale");
                thisform.find("div" + thislink).addClass("make_transist").addClass("showscale");

                firstdiv.css("height", thisdivwidth + "px");
            });
        },
        yourOtherFunction: function (el, options) {}
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    };
})(jQuery, window, document);

// 懒加载操作
var lazyloadFun = function (imgDom) {
    var original = $(imgDom).attr("data-original");
    if (original !== "{icon}") {
        //console.info("data-original拿到数据！");
        var options = {
            // container: $(".main"),
            threshold: 0,
            effect: 'fadeIn',
            effect_params: '400',
            placeholder_data_img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==',
            event: "scroll"
        };
        // load: function(){alert('图片加载完毕！')},
        // appear: function(){alert('图片已显示在视窗中！')},
        $(imgDom).lazyload(options);
    };
};

// ajax配置
var getDataInfo = function () {
    return $.ajax({
        type: 'GET',
        url: '/html/data/list.json',
        dataType: 'json',
        charset: 'UTF-8'
    });
};

// 星星评分
function starsFun(data, dom) {
    var i,
        len = data.length;
    for (i = 0; i < len; i++) {
        var stars = data[i].stars;
        if (stars >= 0 && stars <= 5) {
            $("#" + dom).find(".product-intro-tabs-start .starts:eq(" + i + ") span:lt(" + stars + ")").addClass('yellow');
        }
    }
}

// 内容渲染
function contentFun(data, dom) {
    var i,
        len = data.length;
    for (i = 0; i < len; i++) {
        $('#' + dom + ' section .lazy:eq(' + i + ')').attr('data-original', data[i].icon);
        $('#' + dom + ' section > a:eq(' + i + ')').attr('href', appRoot + '/detail?id=' + data[i].ID);
        $('#' + dom + ' p > a:eq(' + i + ')').attr('href', appRoot + '/detail?id=' + data[i].ID);
        $('#' + dom + ' .title:eq(' + i + ')').html(data[i].title);
        $('#' + dom + ' .sub_title:eq(' + i + ')').html(data[i].sub_title);
    }
}

// 模板渲染
function templateFun(dom, virtualDom, data) {
    var html = template(virtualDom, data);
    document.getElementById(dom).innerHTML = html;
}

// 渲染封装
function drawingFun(dom, virtualDom, data) {
    templateFun(dom, virtualDom, data);
    contentFun(data, dom);
    lazyloadFun(".lazy");
    starsFun(data, dom);
}

// ajax请求数据
getDataInfo().done(function (response) {

    // response = JSON.parse(response);
    //console.log(response);

    drawingFun('all', 'virtual-all', response);

    //首页初始化内容高度
    var firstdiv = $("#product-intro-tabs-con");
    var firstdivheight = firstdiv.find('#all').height();
    firstdiv.css("height", firstdivheight + "px");

    function classification(title) {
        var responseClass;
        if (title !== 'all') {
            responseClass = $.grep(response, function (n) {
                return n.type == title;
            });
        } else {
            responseClass = response;
        }

        drawingFun(title, 'virtual-' + title, responseClass);

        //内容高度
        var firstdiv = $("#product-intro-tabs-con");
        var firstdivheight = firstdiv.find('#' + title).height();
        firstdiv.css("height", firstdivheight + "px");
    }

    $("#product-intro-tabs ul li a").click(function () {
        var title = $(this).attr("title");
        classification(title);
    });

    $(document).ready(function () {
        var tab = getRequest(location.search).tab;
        $("." + tab).trigger("click");
    });

    function getRequest(url) {
        var url;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
}).fail(function () {
    //console.log("数据加载失败");
});

//# sourceMappingURL=product-intro-compiled.js.map