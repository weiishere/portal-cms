/**
 * 自动加载路由配置
 */

var fs = require('fs');


var home = require('./routes/home/index.js'); //前台首页路由
var admin = require('./routes/admin/index.js'); //后台首页路由
var extend = require('./routes/extend/extend.js');//不需要校验登录的路由
/**
 * 所有经过admin的接口都需要校验是否登录
 * @param req
 * @param res
 * @param next
 */
function checkUserLogin(req,res,next){
  if(req.session.user ){
    next()
  }else{
    res.redirect('/admin/login');
  }
}

module.exports = function(app){

  /**
   * 自动导入路由配置,默认匹配后台路由
   */
  fs.readdirSync(__dirname+'/routes/admin/').forEach(function(name){
    var name = name.replace(/.js/,'');
    var obj = require('./routes/admin/' + name);
    if(name !== 'index'){
      app.use('/admin/'+name , checkUserLogin, obj);
    }
  });

  app.use('/admin',function(req,res,next){
    var name = req.url.replace('/',''),
      noneAuth = ['login','logout'];
    if(noneAuth.indexOf(name) < 0){
      if(req.session.user ){
        next();
      }else{
        res.redirect('/admin/login');
      }
    }else{
      next()
    }
  },admin); //后台路由
  app.use('/portal/extend',extend);//扩展接口路由，不需要校验登录
  app.use('/',home); //首页路由


};