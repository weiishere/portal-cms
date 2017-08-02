var fs = require('fs'),
    path = require('path'),
    multer  = require('multer'),
    config = require('../config'),    
    ajaxJSON = require('../helper/utils').ajaxJSON,
    uploadPath = path.join(__dirname, '../' + config.uploadPath),
    rp = require('request-promise'),
    request = require("request");



function doUpload (req, res, next) {
    var file = req.file,
        idx = 0;

    if ( !req.file ) {
        res.json(ajaxJSON('请选择文件后，再进行上传', '-1')); 
        return;
    }


    uploadToJD(file.path, function(err, data){
        try {
            fs.unlink(file.path);
        } catch(e) {            
            console.log('删除上传文件失败：', file.path);
        }

        console.log('删除上传文件：', file.path);
        
        if (err) {
            return next(err)
        };
        res.json(ajaxJSON(data));
    });

    // rename(file);

    // function rename(file){        

    //     var des = file.destination;

    //     var filePath = file.path,
    //         newFilePath = path.join(des, file.originalname); 

    //     fs.rename(filePath, newFilePath, function(error){
    //         if ( error ) {
    //             res.json(renderJSON(false, 'rename failed' + filePath));
    //         } else {
    //             res.json(
    //                 ajaxJSON({
    //                     file: file
    //                 })
    //             );
    //         }
    //     });
    // }
}


// 调用 魏殿猛 接口
// {"imgInfo":{"img":"http://img20.360buyimg.com/wympay/jfs/t1933/211/2753448055/595284/462f6303/56f0e66bN1a7c7638.jpg"},"retCode":"SUCCESS","retMessage":"成功"}
// imginfo是map，其中key是你传递的那个表单域的name，value是服务器访问图片的url

function uploadToJD(filePath, callback){

    // request.post({
    //     url: config.uploadAPIUrl,
    //     formData: {
    //         authorKey: config.uploadAuth,
    //         file: fs.createReadStream(filePath)
    //     }},
    //     function(err, response, body){
    //         if (err) return callback(err);

    //         try {
    //             var result = JSON.parse(body);
    //             if (result.retCode == 'SUCCESS') {
    //                 callback(null, {url: result.imgInfo.file});
    //             } else {                    
    //                 console.log('上传至京东服务器失败，接口返回：', body)
    //                 callback({message: '上传失败，上传接口异常：'+result.retMessage, status: 500});
    //             }
    //         } catch(e) {
    //             console.log('上传至京东服务器失败，接口返回：', body + '具体错误：', e)
    //             callback({message: '上传失败', status: 500});
    //         }
    //     });

    rp({
        method: 'POST',
        url: config.uploadAPIUrl,
        formData: {
            authorKey: config.uploadAuth,
            file: fs.createReadStream(filePath)
        }
    }).then(function(body){

        var result = JSON.parse(body);
        if (result.retCode == 'SUCCESS') {
            callback(null, {url: result.imgInfo.file});
        } else {                    
            console.log('上传至京东服务器失败，接口返回：', body)
            callback({message: '上传失败，上传接口异常：'+result.retMessage, status: 500});
        }
    }).catch(function (err) {
        console.log("又出错了！！！！")
        if (err) return callback(err);
         console.log('上传至京东服务器失败，接口返回：','具体错误：', err)
        callback({message: '上传失败', status: 500});
    });
}

module.exports = {
    doUpload: doUpload,
    uploadMiddleware: multer({ dest: uploadPath}).single('file')
};