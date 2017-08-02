var mongoose = require('mongoose');
const dataApi=require('./common');

var user = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    /*用户状态： 0是正常 1是冻结  默认是正常*/
    status: {
        type: Number,
        default: 0
    },
    /* 用户角色：0是管理员 1是普通用户*/
    role: {
        type: String,
        default: 0
    }
});

dataApi(user,'User');

module.exports = mongoose.model('User', user);