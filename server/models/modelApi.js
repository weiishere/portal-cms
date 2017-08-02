'use strict';

var _ = require('lodash'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(DataModel){
    if ( !DataModel ) {
        throw new Error('DataModel is empty');
    }

    return {
        /* 更新并返回更新后的数据 */
        updateOne: function(query, sets, fields, callback){
            if ( typeof fields == "string" ) {
                fields = _.split(fields, ' ');
            }

            if ( typeof fields == "function" ) {
                callback = fields;
            }
            
            var options = {
                fields: fields
            };

            DataModel.findOne(query, function(err, doc){
                if ( err ) {
                    callback('更新查询数据库失败', null);
                }else{
                    if ( doc ) {
                        doc = Object.assign(doc, sets);
                        doc.save(function(err, updated){
                            if ( err ) {
                                callback('更新失败', null);
                            }
                            callback(null, _.pick(updated, fields));
                        })
                    }else{
                        callback('没有查询到数据', null);
                    }
                }
            });
        }

        
    }
}