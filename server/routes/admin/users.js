var express = require('express');
var router = express.Router();
var _ = require('lodash');
var AdminService = require('../../service/admin');

const IsMaster = AdminService.isMaster;
const checkStatus = AdminService.checkStatus;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * 改变用户角色
 */
router.get('/changeRole', IsMaster, checkStatus, function(req, res, next){
  AdminService.changeRole(req).then(function(doc){
    return res.json({code: '0', msg: '成功', data: doc});
  },function(err){
    return res.json({code: '-1', msg: err.message, data: null});
  })
})

 
router.get('/userList', function(req, res, next){
  AdminService.UserList(req, (doc, err)=>{
    if ( doc ) {
      res.json({code: '0', msg: '成功', data: doc});
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})

/* 获取登录用户信息 */
router.get('/userInfo', function(req, res, next){
  var userInfo = req.session.user;
  if ( userInfo ) {
    res.json({
      code: "0",
      data: _.pick(userInfo, ['username', 'status', 'role']),
      msg: '成功'
    })
  }else{
    res.redirect('/login');
  }
})

/**
 * 改变用户状态
 */
router.get('/changeStatus', IsMaster, checkStatus, function(req, res, next){
  AdminService.changeStatus(req, (doc, err)=>{
    if ( doc ) {
      res.json({code: '0', msg: '成功', data: doc});
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  });
})

module.exports = router;