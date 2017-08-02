/**
 * 模板模块
 */

'use strict';

const Promise = require('bluebird');
const request = require('request');
const TemplateModel = require('../models/template');

module.exports = {
  
  /**
  * 新增模板
  */
  addTemplate: function(data, callback){
    TemplateModel.insertOne(data, (err,doc) => {
      console.log(arguments)
      if ( err ) { 
        callback(null, '更新数据库错误'); 
      }else{
        callback(doc,null);
      }
    })
  },

  /**
  * 查询所有模板
  */
  getAllTemplate: function(req, callback){
    TemplateModel.finds({}, function(err, doc){
      if ( err ) { 
        callback(null, '更新数据库错误'); 
      }else{
        callback(doc);
      }
    })
  },

  /**
  * 查询所有模板
  */
  getTemplate: function(key, callback){
    TemplateModel.finds(key, function(err, doc){
      if ( err ) { 
        callback(null, '更新数据库错误'); 
      }else{
        callback(doc);
      }
    })
  },

  /**
  * 修改模板
  */
  updateTemplate: function( key, data, callback){
    TemplateModel.finds(key, function(err, doc){
      if (!err && doc){
        TemplateModel.updateObj(key, data, function(doc){
          if ( doc === null ) { 
            TemplateModel.finds(key, function(err, doc){
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
  * 删除模板
  */
  removeTemplate: function( key, callback){
    TemplateModel.finds(key, function(err, doc){
      if (!err && doc){
        TemplateModel.removeObj(key, function(doc){
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