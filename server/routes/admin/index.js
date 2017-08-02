/**
 * 后台首页路由设置
 */

'use strict'

var express = require('express');
var router = express.Router();
var Utils = require('../../helper/utils');
var AdminService = require('../../service/admin');

/**
 * 后台入口
 */
router.get('/', AdminService.loginCheck, function (req, res, next) {
  if (req.userCheck) {
    res.redirect('/admin/panel');
  } else {
    res.redirect('/admin/login');
  }
});


// 登陆页
router.get('/login', AdminService.loginCheck, function (req, res, next) {
  if (req.userCheck) {
    res.redirect('/admin/panel');
  } else {
    res.render('login', {
      error: req.flash('error'),
      title: '登录'
    });
  }
});


/**
 * 后台面板首页
 */
router.get('/panel', function (req, res, next) {
  // res.render('index');
  res.redirect('/dashboard')
});

/**
 * 用户登录提交
 */
router.post('/login', function (req, res, next) {

  var SSA_URL = process.env.SSA_URL,
    username = req.body.username,
    password = req.body.password;

  let doDoc = (doc) => {
    
    //校验超级管理员账户信息
    
    if (doc.REQ_FLAG == true) {
      req.session.user = doc.REQ_DATA;
      AdminService.saveUser(username, (userInfo, error) => {
        console.log(userInfo);
        if (error) {
          req.flash('error', error);
          res.redirect('/admin/login');
        }
        req.session.user.status = userInfo.status;
        req.session.user.role = userInfo.role;

        res.redirect('/admin/panel');
      });
    } else {
      req.flash('error', '用户名或密码不正确');
      res.redirect('/admin/login');
    }
    return null;  //fix Warning: a promise was created in a handler but was not returned from it
  }
  // console.log(username +"---"+ process.env.superAdmin);
  // console.log(password +"---"+ process.env.superPwd);
  if (username === process.env.superAdmin && password === process.env.superPwd) {
    
    doDoc({
      'REQ_CODE': 1,
      'REQ_DATA': {
        'email': '',
        'hrmDeptId': '',
        'mobile': '',
        'orgId': '',
        'orgName': '',
        'personId': '',
        'userId': '',
        'fullname': '超级管理员',
        'username': 'superadmin'
      },
      'REQ_FLAG': true,
      'REQ_MSG': '用户密码校验成功'
    })
  } else {
    AdminService.loginPost({
      url: SSA_URL,
      data: {
        username: username,
        password: Utils.md5(password)
      }
    }).then(function (doc) {
      var doc = JSON.parse(doc);
      doDoc(doc);
    }).catch(function (err) {
      req.flash('error', '出现异常，请重新登录');
      console.log(err);
      res.redirect('/admin/login');
    });
  }
});
/**
 * 用户退出
 */
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/admin/login');
    }
  })
});


module.exports = router;