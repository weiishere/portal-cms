var express = require('express');
var router = express.Router();
var CategoryService = require('../../service/category');
var AdminService = require('../../service/admin');

const checkStatus = AdminService.checkStatus;

/**
 * 新增分类
 */
router.get('/addCategory', checkStatus, function(req, res, next){
  var data = {
        name: req.query.name,
        shortName: req.query.shortName,
        shortDesc: req.query.shortDesc,
        templateName: req.query.templateName
      };

  CategoryService.addCategory(data,function(doc,err){
    if(err){
      return res.json({code: '-1', msg: err, data: null})
    }else{
      return res.json({code: '0', msg: '成功', data: [doc]})
    };
  })
})

/**
 * 查询分类
 */
router.get('/getAllCategory', function(req, res, next){
  CategoryService.getAllCategory(req, function(doc,err){
    if ( doc ) {
      res.json({code: '0', msg: '成功', data: {
        list: doc
      }});
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})

/**
 * 修改分类
 */
router.get('/updateCategory', checkStatus, function(req, res, next){
  const data = {
    name: req.query.name,
    shortName: req.query.shortName,
    shortDesc: req.query.shortDesc,
    templateName: req.query.templateName
  };
  CategoryService.updateCategory({_id: Object(req.query.id)}, data ,function(doc,err){
    if ( arguments.length === 1 ) {
      res.json({code: '0', msg: '成功', data: doc});
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})


/**
 * 删除分类
 */
router.get('/removeCategory', checkStatus, function(req, res, next){
  CategoryService.removeCategory({_id: Object(req.query.id)}, function(doc,err){
    if ( arguments.length == 1 ) {
      CategoryService.getAllCategory(req, function(doc,err){
        if ( doc ) {
          res.json({code: '0', msg: '删除成功', data: {
            list: doc
          }});
        }else{
          res.json({code: '-1', msg: err, data: null});
        }
      })
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})

module.exports = router;
