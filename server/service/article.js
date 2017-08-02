'use strict';

const _ = require('lodash'),
      path = require('path'),
      moment = require('moment'),
      cheerio = require('cheerio'),
      config = require('../config'),
      ArticleAPI = require('./api/article-api'),
      // JdPin = require('../external-interface/jdpin'),
      categoryModel = require('../models/category'),
      templateModel = require('../models/template'),
      ajaxJSON = require('../helper/utils').ajaxJSON,
      randomString = require('../helper/utils').randomString,
      qr = require('qr-image'),
      runtime = require('./runtime'),
      isValidObjectId = require('../helper/utils').isValidObjectId;

const pageStatusList = [
    {
        name: '全部',
        slug: 'all'
    },
    {
        name: '已上线',
        slug: 'online'
    },
    {
        name: '已下线',
        slug: 'offline'
    },
    {
        name: '草稿',
        slug: 'draft'
    },
    {
        name: '回收站',
        slug: 'trash'
    }
];

module.exports = {

    /**
     * 获取页面列表
     */
    pages: function(req, res, next) {
        let pageSize = config.pageSize,
            page = req.query.page || 1,
            cat = req.query.cat || 'all',
            authorId = '';//req.session.user.isMaster ? '' : req.session.user.username;

        getArticleList(page, cat, function(err, articles, count){
            if (err) return next(err);
            
            //  处理数据
            articles = articles.map(function(article){
                
                article.author = article.authorId;
                article.dateStr = moment(article.createTime).format("YYYY-MM-DD HH:mm:ss");
                article.updateStr = moment(article.updateTime).format("YYYY-MM-DD HH:mm:ss");
       
                switch ( article.status ) {
                    case 0 :
                        article.actionName = '上线';
                        article.actionSlug = 'online';
                    break;

                    case 1 :
                        article.actionName = '下线';
                        article.actionSlug = 'offline';
                    break;

                    case 2 :
                        article.actionName = '复原';
                        article.actionSlug = 'revert';
                    break;

                    default:
                        article.actionName = '发布';
                        article.actionSlug = 'publish';
                    break;
                }


                let preLink = config.rootUrl ? 
                    (config.rootUrl + '/portal/') : '/portal/';

                if (article.shortUrl) {
                    article.link = (preLink + article.shortUrl + '.htm');
                } else {
                    article.link = (preLink + article._id);
                }

                return article;
            });

            // 获取分类列表
            getCategories(function(err, categories){
                if (err) return next(err);
                
                let resData = {
                    title: '',
                    currentTab: 'pages',
                    articles: articles,
                    user: req.session.user,
                    currentPage: page,
                    status: cat,
                    pageStatusList: pageStatusList,
                    total: Math.ceil(count/pageSize),
                    categoryList:categories
                };
                    
                 res.format({
                    html: function(){
                        res.render('admin/pages', resData);
                    },
                    json: function(){
                        delete resData.user
                        res.json(ajaxJSON(resData));
                    }
                });
            });
           
        });
    },

    /**
     * 根据shortUrl 获取页面
     */
    articleByUrl: function (req, res, next) {
        let shortUrl = req.params[0];
        
        //管理后台入口
        if (!shortUrl) {
            shortUrl = 'dashboard';
        }
        ArticleAPI.getOne({
            shortUrl: shortUrl
        }, function (err, article) {
            if (err) return next(err);

            if ( !article ) {                
                next({message:'Not Found', status: 404})
            } else {
                req.article = article;
                next();
            }
        })
    },
    /**
     * 根据shortUrl和账户信息 获取页面
     */
    articleByUrlAndQuery: function (req, res, next) {

        let shortUrl = req.params[0],
            auth=req.query.auth,
            sid=req.query.sid,
            afterCheckAccountSuccess=function(jdPin){
                //管理后台入口
                if (!shortUrl) {
                    shortUrl = 'dashboard';
                }
                ArticleAPI.getOne({
                    shortUrl: shortUrl
                }, function (err, article) {
                    if (err) return next(err);
                    if ( !article ) {
                        next({message:'页面不存在哦~', status: 404})
                    } else {
                        req.article = article;
                        req.jdPin = jdPin;
                        next();
                    }
                })
            },
            afterCheckAccountFail= function (msg) {
                //TODO 后续会添加报错页面
                //return res.json(
                //    ajaxJSON(msg,0)
                //)
                next({message:msg,status:200})
            }

        if ( _.isArray(sid) && sid.length ) {
            sid = sid[0];
        }

        if ( _.isArray(auth) && auth.length) {   
            auth = auth[0];
        }

        // JdPin.getPin({
        //     sid : sid,
        //     auth: auth
        // }).then(function (data) {
        //     let code=parseInt(data.resultCode);
        //     if(isNaN(code)||code!==0){
        //         console.log("code1",code);
        //         return afterCheckAccountFail(data.resultMsg);
        //     }
        //     console.log("code2",code);
        //     afterCheckAccountSuccess(data.resultData.jdPin);
        // })
    },
    /**
     * 根据id获取页面
     */
    articleLoad: function (req, res, next) {
        let articleId = req.params.id || req.query.id || req.body.id;

        ArticleAPI.getById(articleId, function(article, err){
            if (err) {
                return next(err);
            } else {
                req.article = article;
                next();
            }
        });
    },

    /**
     * 页面归属校验
     */
    articleAuthCheck: function(req, res, next) {
        if ( articleAuthCheck(req.session.user, req.article.authorId) ) {
            next();
        } else {
            next({message:'Forbidden', status: 403})
        }
    },


    preview: function(req, res, next) {
        let data = JSON.parse(req.query.previewData);
        //console.log(req)
        //console.log(JSON.parse( req.query.previewData ) )
        
        if ( req.article.status === 1 ) {

            runtime.getRuntimeFile( data.template , function(templateData){
                let content='',
                    templateName = typeof templateData === 'string' ? templateData : data.template
                ;
                try{
                    content=JSON.parse(data.content);
                }catch(e){
                    content=data.content;
                }

                
                res.render('runtime/'+data.template,
                    Object.assign({},data._doc,content));
            })

        } else {
            next({message:'页面已经不存在或者已经下线', status: 200})
        }
    },

    newDraft: function(req, res, next){

        //过滤传来的参数
        let draft = _.pick(req.body, ['title', 'content', 'shortUrl', 'config', 'id']);

        draft = Object.assign({}, draft, {
            category: req.body.slug,
            categoryId: req.body.categoryId,
            authorId: req.session.user.username,
            config: req.body.config,
            status: 3
        });


        if (draft.id) {
            //校验当前id是否属于用户
            ArticleAPI.getById(draft.id, function(article, err){

                if (err)
                    return next(err);

                let hasAuth = articleAuthCheck(req.session.user, article.authorId);

                if (hasAuth) {
                    if ( article.status != 2 ) {
                        draft.shortUrl += ('-' + randomString(6));
                        draft.parentId = draft.id;

                        newDraft(draft);
                    } else {                        
                        return next({message:'Not fund', status: 404})                        
                    }
                } else {                    
                    next({message:'Forbidden 没有权限操作', status: 403})                        
                }
            });
        } else {
            newDraft(draft);
        }



        function newDraft(draft){
            //新建一篇草稿
            ArticleAPI.create(draft, function(draftNew, err){
                if ( err ) return next(err);

                draftNew = draftNew.toObject();

                draftNew.date =  moment(draftNew.date).format("YYYY-MM-DD HH:mm:ss");

                res.format({
                    html: function(){
                        req.flash('msg', '保存草稿成功');

                        if (draft.id) {
                            res.redirect('/p/m/edit/'+ draft.id + '?draft=' + draftNew._id);
                        } else {                            
                            res.redirect('/p/m/edit/'+ draftNew._id);
                        }
                    },

                    json: function(){
                        res.json(ajaxJSON({
                            msg: '保存草稿成功',
                            pageId: draft.id,
                            draft: draftNew
                        }));
                    }
                })
            });
        }

    },

    /**
     * 获取文章草稿草稿列表
     */
    draftList: function(req, res, next){
        ArticleAPI.query({
            parentId: req.body.id,
        }, {
            select: 'title date parentId'
        }, function(err, drafts){
            if ( err ) return next(err);

            drafts = drafts.map(function(item){
                // item = item.toObject();
                item.date = moment(item.date).format("YYYY-MM-DD HH:mm:ss");

                return item;
            });

            res.json(ajaxJSON(drafts));
        })
    },

    /**
     * 新建页面
     */
    newArticle: function(req, res, next){
        if ( req.method == 'POST' ) {
            
            //过滤传来的参数
            let article = _.pick(req.body, ['title', 'content', 'slug', 'config', 'shortUrl','template']);
            
            
            article = Object.assign({}, article, {
                category: req.body.slug,
                categoryId: req.body.categoryId,
                authorId: req.session.user.username,
                config: req.body.config,
                status: 1
            });


            
            ArticleAPI.create(article, function(article, err){
                if ( err ) return next(err);

                let preLink = config.rootUrl ? 
                    (config.rootUrl + '/portal/') : '/portal/';

                if (article.shortUrl) {
                    preLink = (preLink + article.shortUrl + '.htm');
                } else {
                    preLink = (preLink + article._id);
                }

                res.format({
                    html: function(){
                        req.flash('msg', '文章发布成功');
                        res.redirect('/p/m/edit/'+ article._id);
                    },

                    json: function(){
                        res.json(ajaxJSON({
                            pageLink: preLink,
                            pageId: article._id,
                            msg: '文章发布成功'
                        }));
                    }
                })

            });
        } else if (req.method == 'GET') {
            getCategories(function(err, categories){

                getTemplate(function(err,templates){


                    if (err) return next(err);

                    let preLink = config.rootUrl ? 
                        (config.rootUrl + '/portal/') : 
                        req.protocol + '://' + req.get('host') + '/portal/';


                    var viewTemp;

                    if ( req.path.indexOf('/new-page-wysiwyg') > -1 ) {
                        viewTemp = 'admin/new-article-bak';
                    } else {
                        viewTemp = 'admin/new-article';
                    }


                    res.format({
                        html: function(){
                            res.render(viewTemp, {
                                isNewArticle: true,
                                user: req.session.user,
                                post: {
                                    shortUrl: randomString(12)
                                },
                                host: preLink,
                                categoryList: categories,
                                templateList: templates,
                                msg: req.flash('msg')
                            });

                        },
                        json: function(){
                            res.json(ajaxJSON({
                                isNewArticle: true,
                                post: {
                                    shortUrl: randomString(12)
                                },
                                host: preLink,
                                categoryList: categories,
                                templateList: templates
                            }));
                        }
                    });

                });

            });
        }
    },

    /**
     * 生成单页面
     */
    renderArticle: function(req, res, next) {
        let data = req.article;
        
        if ( req.article.status === 1 ) {
            //var $ = cheerio.load(req.article.content),
            //    bodyEl = $('body');
            //
            //if ( bodyEl.length === 1 ) {
            //    //req.article.layout = 'post-layout';
            //    bodyEl.append(config.statisticsCode);
            //} else {
            //    //req.article.layout = 'layout-tip';
            //    data.statisticsCode = config.statisticsCode;
            //}
            //
            //data.content = $.html();

            runtime.getRuntimeFile( data.template , function(templateData){
                let content='',
                    templateName = typeof templateData === 'string' ? templateData : data.template
                ;
                try{
                    content=JSON.parse(data.content);
                }catch(e){
                    content=data.content;
                }

                
                res.render('runtime/'+data.template,
                    //Object.assign({},data._doc,templateData));
                    Object.assign({},data._doc,content));
            })

        } else {
            next({message:'页面已经不存在或者已经下线', status: 200})
        }
    },
    deleteArticle: function(req, res, next) {

        //草稿允许删除
        // if ( req.article.status === 3 && req.article.parentId) {
        // } else {            
        //     if ( !req.session.user.isMaster ) {
        //         return next({message:'Forbidden', status: 403})
        //     }
        // }

        //获取当前文章下所有的草稿

        ArticleAPI.remove({
            $or: [
                {
                    _id: req.article._id
                },
                {                    
                    parentId: req.article._id
                }
            ]
        }, function(err){
            if (err) return next(err);
            res.format({
                html: function(){
                    res.redirect('/p/m/pages');
                },

                json: function(){
                    res.json(ajaxJSON({msg: '删除成功'}));
                }
            })
        })
    },

    editArticle: function(req, res, next) {  
        
        if ( req.article.status === 3 && req.article.parentId ) {
            return next({message:'Forbidden draft', status: 403})
        }

        getCategories(function(err, categories){

            getTemplate(function(err,templates){

                if (err) return next(err);

                if ( req.query.draft ) {
                    ArticleAPI.getById(req.query.draft, function(article, err){

                        if (err) return next(err);                    

                        req.article.title = article.title;
                        req.article.content = article.content;
                        req.article.config = article.config;
                        req.article.category = article.slug || article.category;
                        req.article.categoryId = article.categoryId;
                        req.article.template = article.template ;

                        r();
                    });
                } else {
                    r();
                }

                function r (){
                    let preLink = config.rootUrl ? 
                        (config.rootUrl + '/portal/') : 
                        req.protocol + '://' + req.get('host') + '/portal/';

                    res.format({
                        html: function(){
                            res.render('admin/new-article', {
                                categoryList: categories, 
                                templateList: templates,
                                user: req.session.user,
                                msg: req.flash('msg'),
                                host: preLink,
                                post: req.article,
                                draftId: req.query.draft
                            });
                        },
                        json: function(){
                            res.json(ajaxJSON({
                                categoryList: categories, 
                                templateList: templates,
                                host: preLink,
                                post: req.article,
                                draftId: req.query.draft
                            }));
                        }
                    });
                }

            });

        });
    },

    online: function(req, res, next){
        updatePageStatus(1, req, res);
    },

    offline: function(req, res, next){
        console.log('offline');
        updatePageStatus(0, req, res);
    },

    del: function(req, res, next){
        updatePageStatus(2, req, res);
    },

    revert: function(req, res, next){
        updatePageStatus(0, req, res);
    },

    updateArticle: function(req, res, next) {  
        if ( !req.body.title || !req.body.content ) {
            res.redirect('/p/m/pages');
            return;
        }

        let article = _.pick(req.body, ['title', 'content', 'config','shortUrl']);
        article.updateTime = Date.now();
        req.article.status = 1;
        article.category = req.body.slug;
        article.categoryId = req.body.categoryId;
        article.template = req.body.template;

        if ( req.body.config ) {
            article.config = req.body.config;
        }

        Object.assign(req.article, article);

        req.article.save(function(err){

            res.format({
                html: function(){
                    res.redirect('/p/m/pages');
                },
                json: function(){
                    res.json(ajaxJSON({msg: '文章更新成功'}))
                }
            })
        });
    },

    /* 每个article的二维码生成*/
    createQrcode: function(req, res, next){
        let link = req.query.dataLink;
        try{
            var img = qr.image(link, {size: 128});
            res.writeHead(200, {'Content-Type': 'image/png'});
            img.pipe(res);
        }catch(e){
            res.writeHead(414, {'Content-Type': 'text/html'});
            res.end('生成二维码失败！');
        }
    }
}



/**
 * 查询文章列表
 * @method  getArticleList
 * @param  {Number}   page     页码
 * @param  {String}   cat     类型
 * @param  {Function} callback 查询回调
 */
function getArticleList( page, cat, callback){

    /**
     *  文章状态：
     *      0，默认下线
     *      1，发布上线
     *      2，删除回收站
     *      3，草稿
     */

    let status;

    switch ( cat ) {
        case 'online':
            status = 1
        break;

        case 'offline':
            status = 0
        break;

        case 'trash':
            status = 2
        break;

        case 'draft':
            status = 3
        break;

        default :
            status = {
                $nin: [2]
            }
        break;
    }

    let query = {
        status: status,
        parentId: null
    };


    ArticleAPI.query(query, {
        // populate: {
        //     path: 'authorId',
        //     select: 'username'
        // },
        select: 'title authorId status createTime updateTime  shortUrl category template categoryId',
        page: page
    }, function(err, articles){

        if (err) return callback(err);
        
        ArticleAPI.getCount(query, function(err, count){
            if (err) return callback(err);
            callback(null, articles, count);
        });
    });
}

function updatePageStatus(value, req, res){
    req.article.status = value;
    req.article.save(function(err){
        res.format({
            html: function(){
                res.redirect('/p/m/pages');
            },
            json: function(){
                res.json(ajaxJSON({}))
            }
        });
    });
}

function articleAuthCheck(user, articleAuhorId){
    if ( user.username == articleAuhorId || user.isMaster) {
        return true;
    } else {
        return false;
    }
}


function getCategories(callback){
    categoryModel.find().limit().exec(callback)
}

function getTemplate(callback){
    templateModel.find().limit().exec(callback)
}
