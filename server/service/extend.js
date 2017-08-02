const ArticleAPI = require('./api/article-api');
const CatagoryModel = require('../models/category');
const fs = require('fs');

module.exports={
    /**
     * 根据分类短名称获取文章
     * @param req
     * @param res
     * @param next
     */
    getArticlesByCategory: function (req, res, next) {
        CatagoryModel.finds({
            shortName:"products"
        }, function(err, doc){
            if ( err ) { 
                next('数据库错误',null); 
            }else{
                ArticleAPI.getArticles({
                    categoryId:doc[0]._id
                },function (err, articles) {
                    if (err) return next(err,null);
                    next(null,articles);
                })
            }
        })
        
    }
}
