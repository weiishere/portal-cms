'use strict';
const mongoose = require('mongoose');
const dataApi=require('./common');
var templateScheMa = new mongoose.Schema({
    Name: {type : String,required:true},
    content:String,
    desc:String,
});

dataApi(templateScheMa,'template');


module.exports = mongoose.model('template', templateScheMa);