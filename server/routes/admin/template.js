var express = require('express');
var router = express.Router();
var TemplateService = require('../../service/template');
var AdminService = require('../../service/admin');
var RuntimeService = require('../../service/runtime');

const checkStatus = AdminService.checkStatus;
/**
 * 新增模板
 */
router.post('/addTemplate', function(req, res, next){
  var data = {
        Name: req.body.name,
        content: req.body.content,
        desc: req.body.desc
      };

  TemplateService.addTemplate(data,function(doc,err){
    if(err){
      return res.json({code: '-1', msg: err, data: null})
    }else{
      return res.json({code: '0', msg: '成功', data: [doc]})
    };
  })
})

/**
 * 查询模板
 */
router.get('/getAllTemplate', function(req, res, next){
  TemplateService.getAllTemplate(req, function(doc,err){
    if ( err ) {
      res.json({code: '-1', msg: err, data: null});
    }else{
      res.json({code: '0', msg: '成功', data: {
        list: doc
      }});
    }
  })
})

/**
 * 查询单个模板
 */
router.get('/getTemplate', function(req, res, next){
  TemplateService.getTemplate({ _id: Object(req.query.id) }, function(doc, err){
    if ( err ) {
      res.json({code: '-1', msg: err, data: null});
    }else{
      res.json({code: '0', msg: '成功', data: doc});
    }
  })
})


/**
 * 修改模板
 */
router.post('/updateTemplate', checkStatus, function(req, res, next){
  const data = {
    Name: req.body.name,
    content: req.body.content,
    desc: req.body.desc
  };
  TemplateService.updateTemplate({_id: Object(req.body.id)}, data ,function(doc,err){
    if ( arguments.length === 1 ) {
      res.json({code: '0', msg: '成功', data: doc});
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})


/**
 * 删除模板
 */
router.get('/removeTemplate', checkStatus, function(req, res, next){
  TemplateService.removeTemplate({_id: Object(req.query.id)}, function(doc,err){
    if ( arguments.length == 1 ) {
      TemplateService.getAllTemplate(req, function(doc,err){
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
});


/**
 * 生成模板缓存
 */
router.get('/runtimeTemplateFile', checkStatus, function(req, res, next){
  TemplateService.getAllTemplate(req, function(doc,err){
    if ( doc ) {
      RuntimeService.generateRuntimeFile(doc, function(doc,err){
        if ( !doc ) {
            res.json({code: '-1', msg: err , data:''});
        }else{
            res.json({code: '0', msg: '成功', data: null});
        }
        
      })
    }else{
      res.json({code: '-1', msg: err, data: null});
    }
  })
})

module.exports = router;
