'use strict';
const mongoose = require('mongoose');
const dataApi=require('./common');

/**
 * 操作mongodb 数据库 顺序：
 *   1、Schema（数据属性字段名称以及字段类型） 
 *   2、使用 Schema 生成 Model(数据模型) 
 *   3、使用 Model 生成 Entity(数据实体)
 *   
 */ 

/*文章状态： 0是正常发布 1是被删除 默认是正常*/


/**
* 1、定义Schema 
*/
var categoryScheMa = new mongoose.Schema({
    name: {type : String, default : '分类'},
    shortName: {type : String},
    shortDesc: {type : String},
    templateName: {type : String}
});

dataApi(categoryScheMa,'category');
/**
* 2、将 Schema 生成为 Model
*/
module.exports = mongoose.model('category', categoryScheMa);