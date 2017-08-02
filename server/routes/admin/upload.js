var express = require('express');
var router = express.Router();
var UploadService = require('../../service/upload');



router.post('/', 
  UploadService.uploadMiddleware,
  UploadService.doUpload,
  function(req, res, next) {
    if(err){
      return res.json({code: '-1', msg: err, data: null})
    }else{
      return res.json({code: '0', msg: '成功', data: null})
    }
  }
);

module.exports = router;