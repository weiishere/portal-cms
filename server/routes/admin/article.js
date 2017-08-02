var express = require('express');
var router = express.Router();
var ArticleService = require('../../service/article');



/**
 * 新增文章
 */
router.get('/new', function(req, res, next){
	ArticleService.newArticle(req,res,function(err){
	    errCallback(res,err)
  	})
});
router.post('/new', function(req, res, next){
	ArticleService.newArticle(req,res,function(err){
	    errCallback(res,err)

  	})
});


/**
 * 获取文章列表
 */
router.get('/list', function(req, res, next){
	    ArticleService.pages(req,res,function(err){
		   errCallback(res,err)
	  	});
})

/**
 * 编辑文章
 */
router.get('/edit',
	ArticleService.articleLoad,
 	function(req, res, next){
  		ArticleService.editArticle(req,res,function(err){
	    	errCallback(res,err)
  		});
})

/**
 * 更新文章
 */
router.post('/update', 
	ArticleService.articleLoad,
	function(req, res, next){
 		ArticleService.updateArticle(req,res,function(err){
			errCallback(res,err)
  		})
})


/**
 * 删除文章
 */
router.get('/del/:id', 
	ArticleService.articleLoad,
	function(req, res, next){
	 	ArticleService.del(req,res,function(err){
		    errCallback(res,err)
	});
})

router.get('/delete/:id', 
	ArticleService.articleLoad,
	function(req, res, next){
	 	ArticleService.deleteArticle(req,res,function(err){
		    errCallback(res,err)
	});
})

//复原
router.get('/revert/:id', 
	ArticleService.articleLoad,
	function(req, res, next){
	 	ArticleService.revert(req,res,function(err){
		    errCallback(res,err)
	});
})

//下线
router.get('/offline/:id', 
	ArticleService.articleLoad,
	function(req, res, next){
	 	ArticleService.offline(req,res,function(err){
		    errCallback(res,err)
	});
})

//上线
router.get('/online/:id', 
	ArticleService.articleLoad,
	function(req, res, next){
	 	ArticleService.online(req,res,function(err){
		    errCallback(res,err)
	});
})

function errCallback(res,err){
	if(err){
      return res.json({code: '-1', msg: err, data: null})
    }else{
      return res.json({code: '0', msg: '成功', data: null})
    }
}

module.exports = router;
