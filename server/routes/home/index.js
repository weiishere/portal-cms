/**
 * 前台首页路由设置
 */

'use strict'
var express = require('express');
var router = express.Router();
var ArticleService = require('../../service/article');
var AdminService = require('../../service/admin');
var ExtendService = require("../../service/extend");
var TemplateService = require('../../service/template');
var RuntimeService = require('../../service/runtime');
/**
 * 后台入口
 */
router.get('/', function (req, res, next) {
  //res.send('前台首页...........');
  res.redirect('/portal/index.htm');
});

/**
 *  页面输出
 */
router.get(/\/portal\/(.*)\.htm$/, ArticleService.articleByUrl, ArticleService.renderArticle);


router.get('/portal/preview/:id', AdminService.loginCheck, ArticleService.articleLoad, ArticleService.preview);

/**
 * 主页
 */
router.get('/dashboard', AdminService.loginCheck, function (req, res, next) {
  if (req.userCheck) {
    res.render('panel', {
      title: '主页',
      error: req.flash('error'),
      success: req.flash('success')
    });
  } else {
    res.redirect('/admin/login');
  }
});


router.get('/portal/productList', function (req, res, next) {
  ExtendService.getArticlesByCategory(req, res, function (err, doc) {
    if (err) {
      return res.json({ code: '-1', msg: err, data: null })
    } else {
      let arr = [];
      for (let i = 0; i < doc.length; i++) {
        arr.push(JSON.parse(doc[i].content));
      }
      return res.json({ code: '0', msg: '成功', data: arr })
    }
  })
});
router.get('/portal', function (req, res, next) {
  res.redirect('/portal/index.htm');
});
router.get('/portal/runtime', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");

  TemplateService.getAllTemplate(req, function (doc, err) {
    if (doc) {
      RuntimeService.generateRuntimeFile(doc, function (doc, err) {
        if (!doc) {
          res.json({ code: '-1', msg: err, data: '' });
        } else {
          res.json({ code: '0', msg: '成功', data: null });
        }

      })
    } else {
      res.json({ code: '-1', msg: err, data: null });
    }
  })
});
module.exports = router;