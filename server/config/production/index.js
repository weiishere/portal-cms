/**
 * 环境配置 生产环境
 */


module.exports.PORT = process.env.PORT = 8888;
module.exports.uploadAPIUrl = 'http://rmk.jdpay.local/img/uploadimg';
module.exports.uploadPath='./uploads/';
module.exports.uploadAuth='!@#EWQSRDFT%^&*XSDTW';
module.exports.rootUrl = '';
module.exports.NODE_ENV = process.env.NODE_ENV = 'production';
module.exports.SSA_URL = process.env.SSA_URL = 'http://ssa.jd.com/sso/verify'; //ssa单点登录授权地址
module.exports.DB_URL = process.env.DB_URL = 'mongodb://portal-cms:go2ZhcBs40q4@mongodb-protal-cms-01.db.jdfin.local:27017/portal-cms'; //mongodb生产环境
//module.exports.DB_URL = process.env.DB_URL = 'mongodb://172.25.47.50/portal-cms'; //mongodb开发环境
module.exports.superAdmin = process.env.superAdmin = 'superAdmin';
module.exports.superPwd = process.env.superPwd = 'frontend1234567';
module.exports.javaServerUrl='http://ft.jdpay.local';