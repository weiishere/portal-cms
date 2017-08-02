/*
 * @ Desc: peco gulp rules
 * @ Author: lizhiyang1
 */
'use strict';

const gulp = require('gulp'),
  requireDir = require('require-dir'),
  clean = require('gulp-clean'),
  runSequence = require('gulp-sequence');

const imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),

  fileinclude = require('gulp-file-include'),

  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),

  inlineImg = require('gulp-base64'),

  useref = require('gulp-useref'),
  revOrig = require("gulp-rev-orig"),

  inlinesource = require('gulp-inline-source'),

  replace = require('gulp-replace-path'),
  path = require('path');

const gulpOpen = require('gulp-open'),
  connect = require('gulp-connect'),

  copy = require('gulp-copy'),
  gutil = require('gulp-util'),

  host = {
    path: ['_dist/','src/'],
    port: 8899,
    html: 'guide.html'
  };

// release
const release = gulp.env.release;

gulp.task('clean', () => {
  return gulp.src(['_dist'])
    .pipe(clean())
});


gulp.task('image-min', () => {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('_dist/img'))
});

gulp.task('css-base64', ()=> {
  return gulp.src('_dist/css/*.css')
    .pipe(inlineImg({
      maxImageSize: 10 * 1024, // bytes
      debug: true
    }))
    .pipe(gulp.dest('_dist/css'));
});

gulp.task('useref', () => {
  return gulp.src(userefSrc())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(revOrig({revType:'hash',fileTypes:['js','css']}))
    .pipe(gulp.dest('_dist/html'
      //function (f) {
      //let distDir = f.base.substring((f.cwd+'/src').length).replace(/\\/g,'/');
      //let distDir = 'dist' + f.base.substring((f.cwd + '/src/').length);
      //console.info(distDir);
      //return distDir;
      //}
    ));
});

gulp.task('source-inline', () => {
  return gulp.src([
    '_dist/html/*'
  ])
    .pipe(inlinesource())
    .pipe(gulp.dest('_dist/html'));
});

gulp.task('replace-path', () => {
  gulp.src([
    '_dist/html/*',
    '_dist/jsp/*'
  ])
    .pipe(replace('../', '/stock/'))
    .pipe(gulp.dest('_dist/jsp'));
});

gulp.task('connect', () => {
  console.log('------ server start ------');
  connect.server({
    root: host.path,
    port: host.port,
    livereload: true
  });
});

gulp.task('open', () => {
  gulp.src('')
    .pipe(gulpOpen({
      app: 'Google chrome',
      uri: 'http://localhost:8899/src/'
    }))
});

gulp.task('watch', () => {
  gulp.watch([
    'src/**/*'
  ], function (info, file) {
    if (info.path.match(/\.html$/)) {
      // console.info(info);
      buildHtml(info.path)
    }
    else if (info.path.match(/\.inc/)) {
      buildHtml('src/html/*.html')
    }
    else if (info.path.match(/\.scss$/)) {
      releaseScss();
    }
    else {
      copyFileToDist(info.path);
    }
  });
});

gulp.task('init', () => {
  buildHtml([
    'src/html/*.html'
  ]);
  releaseScss('src/css/*.scss');
  copyFileToDist([
    'src/js/**/*',
    'src/img/**/*',
    'src/fonts/**/*',
    'src/data/*'
  ]);
});

gulp.task('add-download-file', () => {
  return gulp.src('src/html/document/document.zip')
    .pipe(gulp.dest('_dist/html/document'))
});

gulp.task('clean-temp-files', () => {
  return gulp.src(['_dist/src'])
    .pipe(clean())
});


function copyFileToDist(src) {
  return gulp.src(src, {base: '.'})
    .pipe(gulp.dest('_dist'))
}

function buildHtml(src) {
  return gulp.src(src, {base: '.'})
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('_dist'))
}

function releaseScss() {
  return gulp.src('src/css/*.scss', {base: '.'})
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('_dist'));
}

// 要打包的文件
function userefSrc() {
  var src = [
    '_dist/src/html/*.html'
  ];
  return src
}
//copy data
gulp.task('data', ()=>{
  return gulp.src('./src/data/*')
      .pipe(gulp.dest('./_dist/data'))
})
// gulp portal
if (!release) {
  gulp.task('portal', runSequence('clean', 'init', ['connect', 'open', 'watch']));
}
// gulp portal --release
else if (release) {
  gulp.task('portal', runSequence('clean', 'init', 'useref', 'css-base64', 'add-download-file', 'clean-temp-files', 'data'));
}
else return
gulp.task('default', function (){
  gulp.start('portal');
})
