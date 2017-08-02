'use strict';
const mongoose = require('mongoose');
const dataApi=require('./common');
const Schema = mongoose.Schema;

var articleScheMa = new mongoose.Schema({

    title: {type : String,required:true},
    
    authorId: {  
        type: String,
        ref: 'User'
    },
    
    content: {
        type: String,
        required: [true, '内容不能为空']        
    },
    
    category: { 
        type: String,
        default: ''
    },

    categoryId:{
        type: String,
        default: ''
    },

    template:{
        type: String,
        default: 'default'
    },

    shortUrl: {
        type: String,
        unique: true,
        required: true,
        validate: [
            {
                validator: function (val) { 
                    return /^(?![_|\-])(?!.*?[_|\-]$)[\w|\-|\u4e00-\u9fa5]+$/.test(val);
                },

                msg: '请输入正确自定义链接（支持数字英文中文，"_" "-" 不能以字符开始结尾）'
            }
        ]
    },

    createTime:  {type: Date, default: Date.now},

    updateTime: {type: Date, default: Date.now},

    img:String,

    desc:String,
    
    order:{type:Number,default:0},

    extend:String,
    
     /**
     *  文章状态：
     *      0，默认下线
     *      1，发布上线
     *      2，删除回收站
     *      3，草稿
     */
    status: {type: Number, default: 0}
});

dataApi(articleScheMa,'article');
module.exports = mongoose.model('article', articleScheMa);