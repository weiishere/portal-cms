/**
 * 用户权限校验
 */

'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var request = require('request');
var UserModel = require('../models/user');
var UserModelAPI = require('../models/modelApi')(UserModel);

const userFields = "userName role status";

module.exports = {
  /**
   * 登录检测（查session，并判断session中的erp是否在数据库中存在，存在表示登录检查正确）
   * @param req
   */
  loginCheck: function(req, res, next) {
    var me = this;
    if ( req.session.user ) {
      var erp = req.session.user.username;
      UserModel.findOne({userName: erp}, userFields, function(err, doc){
        if ( doc ) {
          req.userCheck = true;
        }else{
          req.userCheck = false;
        }
        next();
      })
    }else{
      req.userCheck = false;
      next();
    }
  },

  /**
   * 管理员检测（取session，根据session当中的role判断）
   * @param req
   */
  isMaster: function(req, res, next){
    //所有页面已经校验过session.user了，所以这里都不再做判断
    //是否有必要取库里的role呢？
    var role = req.session.user.role;
    if ( role == '0' ) {
      next();
    }else{
      res.json({code: '-1', msg: '您不是管理员，请联系管理员', data: null});
    }
  },

  /**
   * 登录人员状态检测（取session，根据session当中的status判断）
   * @param req
   */
  checkStatus: function(req, res, next){
    var status = req.session.user.status;
    if ( status == 0 ) {
      next();
    }else{
      res.json({code: '-1', msg: '账户已冻结，请联系管理员', data: null});
    }
  },
  /**
   * 登录提交
   * @param req
   * @param res
   * @param next
   */
  loginPost: function(options) {
    /**
     * 校验erp信息
     */
    return new Promise(function(resolve, reject){
      request.post(
        {
          url: options.url,
          form: options.data || {}
        },
        function(err, response, body){
          if ( err ) {
            reject(err);
          } else {
            resolve(body);
          }
        }
      );
    });
  },

  /**
  * 用户信息存入，并将信息返回
  */
  saveUser: function(erp, callback) {
    var me = this,
        user = {
          userName: erp
        };  

    me.getUser(erp).then(function(doc){
      if ( doc ) {
        callback(doc);
      }else{
        UserModel.create(user, function(err, newuser){
          if ( err ) { 
            callback(null, '存入数据库错误'); 
          }else{
            callback(newuser);
          }
        })
      }
      return null;
    },function(error){
      callback(null, "数据错误:"+error.message);
    });
  },

  /**
  * 获取用户信息（角色，状态等）
  */
  getUser: function(erp){
    return new Promise(function(resolve, reject){
      UserModel.findOne({userName: erp}, userFields, function(err, doc){
        if ( err ) {reject(Error('查询数据库错误'));}
        resolve(doc);
      })
    })
  },

  /**
  * 改变用户状态(传参默认的操作类型type是冻结)
  * 用callback的方式传结果
  */
  changeStatus: function(req, callback){
    var erp = req.query.username || req.params.username,
        type = req.query.type || req.params.type,
        status = type == 'unfreeze' ? 0 : 1;

    if ( erp ) {
      UserModelAPI.updateOne({userName: erp}, {status: status}, userFields, function(err, doc){
        if ( err ) { callback(null, '更新数据库错误'); }
        if ( req.session.user.username === erp ) {
          req.session.user.status = doc.status;
        }
        callback(doc);
      })
    }else{
      callback(null, '参数错误');
    }
  },


  /**
  * 改变用户角色
  * 用promise的方式，错误处理要用Error
  */
  changeRole: function(req){

    var erp = req.query.username || req.params.username,
        role = req.query.role || req.params.role;

    return new Promise(function(resolve, reject){
      if ( erp && role ) {
        UserModelAPI.updateOne({userName: erp}, {role: role}, userFields, function(err, doc){
          if ( err ) { reject(Error('更新数据库错误')); }
          if ( req.session.user.username === erp ) {
            req.session.user.role = doc.role;
          }
          resolve(doc);
        })
      }else{
        reject(Error('参数错误')); //reject中必须通过Error对象返回，否则会有warning
      }
    });
  },

  UserList: function(req, callback){
    let page = req.query.page || 1,
        query = {
          status: req.query.status || '',
          role: req.query.role || '',
          userName: req.query.userName || ''
        };
    query = _.omitBy(query, _.isEmpty);
    
    UserModel.find(query, userFields, function(err, doc){
      if ( err ) { 
        callback(null, '查询出错'); 
      }else{
        callback(doc);
      }
    })
  }

}