'use strict';

const config = require('../../config');
const ArticleModel = require('../../models/article'),
      randomString = require('../../helper/utils').randomString,
      ObjectId = require('mongoose').Types.ObjectId;

let ArticleAPI = {
    queryArticle: function(query){        
        // 配合查询分类表、用户表
        ArticleModel.findOne(query)
                 .exec(callback);
    },

    query: function(query, options, callback){        
        let limit = config.pageSize,
            skip = limit * (options.page - 1),
            tmp;

        if (!callback) {
            callback = options;
        }

        options = Object.assign({}, {
            sort: {updateTime: -1}
        }, options)

        tmp = ArticleModel.find(query);

        if ( options.populate ) {
            tmp = tmp.populate(options.populate)
        }

        tmp.select(options.select)
           .skip(skip)
           .limit(limit)
           .sort(options.sort)
           .lean()
           .exec(callback);
    },

    getCount: function(query, callback){
        ArticleModel.find(query)
                 .count()
                 .exec(callback);
    },

    getById: function(id, callback){
        if ( ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id) )  {            
        } else {
            return callback(null, {message:'Not Found', status: 404})
        }

        ArticleModel.findById(id).exec(function (err, post) {
            if (err) return callback(null, err);

            if ( !post ) {                
                callback(null, {message:'Not Found', status: 404})
            } else {
                callback(post)
            }
        });
    },

    remove: function(query, callback) {
        ArticleModel.remove(query, callback);
    },

    getOne: function(query, callback){
        ArticleModel.findOne(query).exec(callback);
    },

    create: function(post, callback){
        if (!post.shortUrl) {
            post.shortUrl = randomString(12);
        }

        let newArticle = new ArticleModel(post);
        
            newArticle.save(function(err, doc){
                if (err) return callback(null, err);
                callback(doc)
            });

    },
    getArticles: function (query,callback) {
        ArticleModel.finds(query, function (err, doc) {
            if(err){
                callback(err,null);
            }else{
                callback(null,doc);
            }
        });
    }
};

module.exports = ArticleAPI;