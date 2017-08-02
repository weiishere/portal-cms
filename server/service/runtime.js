var fs=require('fs');
var path=require("path");
var TemplateService=require('./template');
var cheerio=require("cheerio");
var loadDependencies=function (content,callback) {
    var dependenciesArr=content.match(/\{\{\>\s[a-zA-Z0-9\-_]+\}\}/g),
        i=0,
        regex_1=/[a-zA-Z0-9\-_]+/,
        fileName='';
    function iterator(){
        if(i===dependenciesArr.length){
            return callback(content);
        }
        fileName=dependenciesArr[i].match(regex_1);
        if(!fileName){
            i++;
            iterator();
        }
        var filePath=path.resolve(__dirname,'../views/runtime/'+fileName[0]+'.hbs');
        fs.readFile(filePath,'utf8', function (err, data) {
            if(!err){
                content=content.replace(dependenciesArr[i],data);
                loadDependencies(content,callback);
            }else{
                i++;
                iterator();
            }
        } )
    }
    if(!dependenciesArr){
        return callback(content);
    }else{
        iterator();
    }
}

var generateFile= function (object,callback,length,count) {
    callback=!callback? function () {}:callback;

    var arr=[];
    var filePath=path.resolve(__dirname,'../views/runtime/'+object._id+'.hbs');
    fs.open(filePath,'w', function (err,fd){
        loadDependencies(object.content, function (content) {
            var $=cheerio.load(content),
              $hiddenInput=$("#uniqueStamp"),
              hiddenInput="";
            if($hiddenInput.length===0){
              hiddenInput="<input type='hidden' value='"+Date.now()+"' id='uniqueStamp' />";
              content+=hiddenInput;
            }else{
              $hiddenInput.attr("value",Date.now());
            }
            fs.writeFile(fd,content,'utf8', function (err) {
                if(err){
                    arr.push(err);
                }
                if(count===length){
                    if(arr.length===0){
                        callback(content);
                    }else{
                        callback(null,'生成runtime文件失败')
                    }
                }

            })
        });
    })
}
var generateRuntimeFile=function (doc,callback) {
        var i=0;
        for(;i<doc.length;i++){
            try{
                generateFile(doc[i],callback,doc.length,i+1);
            }catch(e){
                //console.log(e);
            }
        }
    }
var readFile= function (templateId,callback) {

    var filePath=path.resolve(__dirname,'../views/runtime/'+templateId+'.hbs');

    fs.readFile(filePath,'utf8', function (err, data) {
        if(err){
            //缓存文件读取失败,查询数据库
            TemplateService.getTemplate(templateId, function (doc,err) {
                if(!doc){
                    callback(doc,err);
                }else{
                    // callback(doc[0].content);
                    generateRuntimeFile(doc,callback)
                }
            })
        }else{
          uniqueTemplateFile(templateId,data,callback)
          // callback(data);
        }
    })
}
var uniqueTemplateFile=function (templateId,fileContent,callback) {
    var $=cheerio.load(fileContent),
      hiddenInput=$("#uniqueStamp"),
      timeStamp=(hiddenInput.attr('value'))||0,
      nowStamp=Date.now(),
      gapTime=60000;
      if(Math.abs(timeStamp-nowStamp)>=gapTime){
        TemplateService.getTemplate(templateId, function (doc,err) {
          if(!doc){
            callback(doc,err);
          }else{
            // callback(doc[0].content);
            generateRuntimeFile(doc,callback)
          }
        })
      }else{
          callback(fileContent);
      }
}
module.exports = {
    /**
     * 生成runtime文件
     * @param doc Array
     */
    generateRuntimeFile: function (doc,callback) {
        var i=0;
        for(;i<doc.length;i++){
            try{
                generateFile(doc[i],callback,doc.length,i+1);
            }catch(e){
                //console.log(e);
            }
        }
    },
    /**
     * 获取runtime文件内容，如果没有获取到则去数据库查询
     * @param templateId
     */
    getRuntimeFile: function (templateId,callback) {
        try{
            readFile(templateId,callback);
        }catch(e){
            //缓存文件读取失败,查询数据库
            TemplateService.getTemplate(templateId, function (doc,err) {
                if(!doc){
                    callback(doc,err);
                }else{
                    callback(doc);
                }
            })
        }
    },
    /**
     * 删除模板对应的hbs文件
     * @param templateId
     * @param callback
     */
    deleteRuntimeFile: function (templateId,callback) {
        var filePath=path.resolve(__dirname,'../views/runtime/'+templateId+'.hbs');
        fs.unlink(filePath, function (err) {
            if(err){
                callback(null,err);
            }else{
                callback("删除成功");
            }
        })
    }
}