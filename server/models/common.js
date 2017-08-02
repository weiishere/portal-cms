'use strict';
const mongoose = require('mongoose');
const async = require('async');

var dataApi = (schemObj, objName) => {
    //const _model = mongoose.model(objName, schemObj);
    schemObj.statics.insertOne = (obj, callback) => {
        var _Model=mongoose.model(objName, schemObj);
        var entity = new _Model(obj);
        entity.save(function (err, newObj) {
            if(err){console.log("insert error"+err);}
            callback(err,entity);
        });
        //categoryModel.insertOne({name:'111',shotrName:'111',shortDesc:'222',templateName:'3445'},function(err,obj){});
        // mongoose.model(objName, schemObj).create(obj, function (error) {
        //     if (error) {
        //         throw error;
        //     } else {
        //         callback();
        //     }
        // });
    }
    schemObj.statics.finds = (conditions, callback) => {
        mongoose.model(objName, schemObj).find(conditions, function (err, docs) {
            callback(err,docs);
            // if (err) {
            //     throw err;
            // } else {
            //     callback(docs);
            // }
        })
    }
    schemObj.statics.removeObj = (conditions, callback) => {
        if (!conditions || conditions === {}) {
            throw new Error("删除条件不能为空");
        }
        mongoose.model(objName, schemObj).remove(conditions, function (err) {
            callback(err);
        })
    };
    /*
    例：update = {$set : {age : 27, title : 'model_demo_title_update'}};
    */
    schemObj.statics.updateObj = (conditions, update, callback) => {
        if (!conditions || conditions === {}) {
            throw new Error("更新条件不能为空");
        }
        mongoose.model(objName, schemObj).update(conditions, update, { upsert: true }, function (err) {
            callback(err);
        });
    };
    /*
        获取分页查询，用法：Model.pageQuery(page, 10, Article, '', {}, { created_time: 'desc' },function(error, $page){ });
    */
    schemObj.statics.pageQuery = function (page, pageSize, populate, queryParams, sortParams, callback) {
        var start = (page - 1) * pageSize;
        var $page = {
            pageNumber: page
        };
        async.parallel({
            count: function (done) {  // 查询数量
                _model.count(queryParams).exec(function (err, count) {
                    // if (err) {
                    //     throw err;
                    // } else {
                    //     done(err, count);
                    // }
                    done(err, count);
                });
            },
            records: function (done) {   // 查询一页的记录
                _model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    // if (err) {
                    //     throw err;
                    // } else {
                    //     done(err, doc);
                    // }
                    done(err, doc);
                });
            }
        }, function (err, results) {
            if (error) {
                throw err;
            } else {
                var count = results.count;
                $page.pageCount = (count - 1) / pageSize + 1;
                $page.results = results.records;
                callback(err, $page);
            }

        });
    };
}
module.exports = dataApi;