/**
 * 基础的工具方法
 * @type {request}
 */
var request = require('request');
var Promise = require('bluebird');
var crypto = require('crypto');

/**
 * md5加密字符串
 * @param str
 * @returns {*}
 */
function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};
exports.md5 = md5;

/**
 * 密码加密
 * @param pwd
 * @returns {*}
 */
exports.encryptPwd = function(pwd){
  return md5(md5(pwd) + config.pwdSalt);
}

exports.randomString = function(length) {
  var str = ''
    , maxLength = parseInt(length) || 6
    , chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while ( str.length !== maxLength ) {
    var random = Math.floor( Math.random() * chars.length );
    str += chars[random];
  }

  return str;
}
exports.isValidObjectId = function(id){
    return ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
}

// code: -1 失败、0 成功

// 失败：ajaxJSON('网络繁忙，必要参数错误', 0);
// 成功：ajaxJSON(null, 1, '活动删除成功')
// 成功：ajaxJSON({...数据对象})

exports.ajaxJSON = function(json, code, msg){

    code = (typeof code == 'undefined') ? "0" : code;

    if ( code === "-1" ) {
        msg = json;
        json = null;

    }

    return {
        code: code,
        msg: msg || '',
        data: json
    };
}

exports.remotePostJSON = function (options) {
  return new Promise(function (resolve, reject) {
    request.post(
      {
        url: options.url,
        json: options.data || {}
      },
      function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          //if(typeof(body.resultCode) !== 'undefined'){
          //if ( body.resultCode === 0 ) {
          resolve(body);
          //} else {
          if(!body){
            return reject({});
          }
          if (body.resultCode !== 0 && body.resultCode !== '00000') {
            console.log(
              '请求外部接口失败，外部URL：' +
              options.url + ' 发送：' +
              JSON.stringify(options.data) +
              ' 返回：' + JSON.stringify(body)
            )
            reject(body);
          }
        }
      }
    );
  });
}

/**
 * get获取json数据
 * @param url
 */
exports.remoteGetJSON = function (options) {
  return new Promise(function (resolve, reject) {
    request.get({
        url: options.url,
        qs: options.data || {},
        json: true
      },
      function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}
