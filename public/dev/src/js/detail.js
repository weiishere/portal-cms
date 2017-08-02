/**
 * date: 2016年10月 9日
 * author: zhangaifei
 * 详情页逻辑
 */


var detailPage = {
    config: {
        list: [],
        data: null
    },
    elements: {
        header: $('.detail-header'),
        applyBtn:$('.open-btn'),
        intro: $('.detail-intro'),
        adv: $('.detail-adv'),
        cases: $('.detail-cases'),
        process: $('.apply-process'),
        doc: $('.detail-dev-doc'),
        applyForm: $('#counsel-container')

    },
    init: function () {
        this.fetchData();
        this.bindEvents();
    },
    bindEvents: function (){
        var form = this.elements.applyForm;
        this.elements.applyBtn.on('click', function (){
           $('.consultation').trigger('click')
        })
    },
    //获取页面展示数据
    //tip: 目前没有服务接口 数据写死
    fetchData: function () {
        var self = this;
        return $.ajax({
            // url: '/html/data/list.json'
          type: "GET",
          url: "/portal/productList",
          dataType: "json",
          charset: "UTF-8"
        }).success(function (res) {
            //cms接口
            res=res.data;
            self.config.list = (typeof res ==='string'?(JSON.parse(res)):res);
            var id = self.getId();
            self.config.data = self.findItemById(id)
            //console.log(self.config.data)
            self.renderUI()
        }).error(function (error) {
            //console.log(error)
        })
    },
    findItemById: function (id) {
        var _res = {};
        // $.each(this.config.list, function (index, item) {
        //     if (id == item.ID) {
        //         _res = item;
        //     } else {
        //         //没有找到 怎么办？？
        //     }
        // })
        for(var i= 0 ,len = this.config.list.length; i< len; i++){
            var item = this.config.list[i];
            if (id == item.ID) {
                _res = item;
            }
        }
        return _res;
    },
    //从url中获取id
    getId: function () {
        return location.href.match(/product-detail-[0-9]+\.htm/)[0].match(/[0-9]+/g)[0];
    },
    renderUI: function () {
        this.renderHeader()
        this.renderIntro();
        this.renderCases();
        this.renderProcess();
        this.renderAdvantages();
        this.renderDoc();
    },
    renderHeader: function () {
        var header = this.elements.header;
        var data = this.config.data;
        var stars = data.stars;
        header.css({
            background: 'url("' + data.header_banner + '")'
        })
        header.find('h1').text(data.title);
        header.find('.sub_desc').text(data.sub_desc);
        header.find('.icon-star:lt('+stars+')').addClass('active')

    },

    renderIntro: function () {
        var intro = this.elements.intro;
        var data = this.config.data;
        //console.log(data.introduction)
        intro.find('.intro').html('<p>'+data.introduction.split(/={3,}/).join('</p><p>')+'</p>');
        var _imgs = '';
        if(data.intro_imgs.length){
            $.each(data.intro_imgs.split(/={3,}/), function (i, src) {
                _imgs += '<img src="' + src + '" alt=""/>';
            })
        }
        intro.find('.intro_imgs').html(_imgs);
    },
    /**
     * 产品特色的背景图是随机出现的
     */
    renderAdvantages: function () {
        var intro = this.elements.adv;
        var data = this.config.data;
        var advImgs = data.adv_imgs.split(/={3,}/);
        var desc = data.adv_descs.split(/={3,}/);
        var _items = '';

        $.each(data.adv_titles.split(/={3,}/), function (i, title) {
            var rmd = Math.random()*advImgs.length|0;
            var bg = advImgs.splice(rmd,1);
            //console.log(rmd,advImgs.length);
            _items += '<div class="adv-item" style="background-image: url('+bg+')">'+
                '<h2>'+title+'</h2>'+
                (desc[i]!=undefined?('<p>'+desc[i]+'</p>'):(''))+
            '</div>';
        })
        intro.find('.adv-imgs').html(_items);
    },
    renderCases: function () {
        var cases = this.elements.cases;
        var data = this.config.data;
        var list = '',
            icons = data.case_icons.split(/={3,}/),
            texts = data.case_icons_text.split(/={3,}/);
        $.each(icons, function (i, src) {
            list += '<div class="case-item">' +
                '<img src="' + src + '" alt="">' +
                '<p>' + texts[i] + '</p></div>'
        })
        if ($.trim(data.case_icons).length) {
            cases.removeClass('hidden');
            cases.find('.case-list').html(list);
            cases.css({
                'background-image': 'url(' + data.case_bg + ')'
            })
        }

    },

    renderProcess: function () {
        var process = this.elements.process;
        var data = this.config.data;
        var _imgs = '';
        $.each(data.apply_process.split(/={3,}/), function (i, src) {
            _imgs += '<img src="' + src + '" alt=""/>';
        })
        //console.log(_imgs.length)
        if (data.apply_process && data.apply_process.length) {
            process.removeClass('hidden');
            process.find('.pro-imgs').html(_imgs);

        }
    },
    renderDoc: function () {
        var doc = this.elements.doc;
        var data = this.config.data;
        var textAndLink = data.dev_doc.split(/={3,}/)
        if (data.dev_doc && data.dev_doc.length) {
            doc.removeClass('hidden')
            doc.find('a')
                .text(textAndLink[0])
                .attr('href', textAndLink[1]);
        }


    }

}

detailPage.init();
