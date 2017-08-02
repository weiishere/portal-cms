/**
 * 分类模块
 */

'use strict';

const Promise = require('bluebird');
const request = require('request');
const CatagoryModel = require('../models/category');

module.exports = {
  
  /**
  * 新增分类
  */
  addCategory: function(data, callback){
    CatagoryModel.insertOne(data, (err,doc) => {
      if ( err == null && !doc) { 
        callback(null, '更新数据库错误'); 
      }else{
        callback(doc,null);
      }
      
    })
  },

  /**
  * 查询所有分类
  */
  getAllCategory: function(req, callback){
    CatagoryModel.finds({}, function(err, doc){
      if ( err ) { 
        callback(null, '更新数据库错误'); 
      }else{
        callback(doc);
      }
    })
  },

  /**
  * 修改分类
  */
  updateCategory: function( key, data, callback){
    CatagoryModel.finds(key, function(err,doc){
      if (!err && doc){
        CatagoryModel.updateObj(key, data, function(doc){
          if ( doc === null ) { 
            CatagoryModel.finds(key, function(err, doc){
              if ( err ) { 
                callback(null, '更新数据库错误'); 
              }else{
                callback(doc);
              }
            })
          }else{
            callback(null, '更新数据库错误');
          }
        })
      }else{
        callback(null, '更新数据库错误');
      }
    })
    
  },

  /**
  * 删除分类
  */
  removeCategory: function( key, callback){
    CatagoryModel.finds(key, function(err, doc){
      if ( doc && !err){
        CatagoryModel.removeObj(key, function(doc){
          if ( doc === null ) { 
            callback(doc);
          }else{
            callback(null, '更新数据库错误');
          }
        })
      }else{
        callback(null, '更新数据库错误');
      }
    })
  }

}