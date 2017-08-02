/**
 * 入口文件
 */
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view cache',false);//暂时禁用模板缓存

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json({ limit: '20mb' }));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var DB_URL = process.env.DB_URL;
//session信息存储到数据库
app.use(session({
  secret: 'session-secret',
  saveUninitialized: true,
  cookie: {
    // maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    maxAge: 1000 * 60 * 60, //1hour
  },
  store: new MongoStore({
    url: DB_URL,
    collection: 'sessions'
  }),
  resave: true
}));
app.use(flash());

try {
  console.log('准备链接DB：' + DB_URL);
  // var db = mongoose.createConnection();
  // db.openSet(config.dbUrl);
  mongoose.connection.on('open', function () {
    console.log('连接数据库成功');
  });

  mongoose.connection.on('error', function (err) {
    console.log('连接数据库失败');
  });
  mongoose.Promise = require('bluebird'); //fix DeprecationWarning: Mongoose: mpromise  http://mongoosejs.com/docs/promises.html
  mongoose.connect(DB_URL);

} catch (e) {
  console.log('数据库链接失败：', e);
}

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack.config.dev.babel');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    //noInfo: true, //如果设置该参数为 true，则不打印输出信息
    cache: true, //开启缓存，增量编译
    stats: {
      colors: true, //打印日志显示颜色
      reasons: true //打印相关被引入的模块
    },
    publicPath: webpackConfig.output.publicPath
  }));

  //热部署，自动刷新，需要结合 webpack.config.dev.babel 中的定义
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}



// load routers
require('./boot')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
