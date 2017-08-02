var express = require('express');
var router = express.Router();
var ExtendService=require("../../service/extend");
var utils=require('../../helper/utils');
var async = require('async');
var config=require("../../config/index");
  router.get('/productList', function (req, res,next) {
  ExtendService.getArticlesByCategory(req,res, function (err, doc) {
    if(err){
      return res.json({code: '-1', msg: err, data: null})
    }else{
      let arr=[];
      for(let i=0;i<doc.length;i++){
        arr.push(JSON.parse(doc[i].content));
      }
      return res.json({code: '0', msg: '成功', data: arr})
    }
  })
});
// 发送邮件
  router.post('/applyEmail',function (req, res, next) {
    async.parallel({
        applyEmail: function (callback) {
          utils.remotePostJSON({
            url: config.javaServerUrl + '/applyEmail',
            data: req.body
          })
            .then(function (data) {
              callback(null, data);
            })
            .then(function (err) {
              if (err) {
                console.log('ERROR: ' + err)
              }
            })
        }
      },
      function (err, results) {
        if (err) {
          next(err)
        } else {
          req.content = results;
          next();
        }
      });
  },function (req, res, next) {
    res.json(req.content);
  })
  // 获取验证码
  router.post('/getSmsCode',function (req, res, next) {
    utils.remotePostJSON({
      url: config.javaServerUrl + '/msgVerificateCodeSend',
      data: req.body
    })
      .then(function (data) {
        return res.json(data)
      })
      .catch(function (err) {
        if (err) {
          console.log('ERROR: ' + err)
        }
      })
  });
  // 检查验证码
  router.post('/verifiedSmsCode',function (req, res, next) {
    utils.remotePostJSON({
      url: config.javaServerUrl + '/msgVerificateCodeCheck',
      data: req.body
    })
      .then(function (data) {
        return res.json(data)
      })
      .catch(function (err) {
        if (err) {
          console.log('ERROR: ' + err)
        }
      })
  });
  router.post('/logout',function (req, res, next) {
    res.json(req.content);
  })
module.exports=router;