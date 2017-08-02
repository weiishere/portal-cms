/**
 * 环境配置 功能或闭环
 */

module.exports.PORT = process.env.PORT = 8888;
module.exports.uploadAPIUrl = 'http://172.24.5.10:8011/img/uploadimg';
module.exports.uploadPath='./uploads/';
module.exports.uploadAuth='!@#EWQSRDFT%^&*XSDTW';
module.exports.rootUrl = '';
module.exports.NODE_ENV = process.env.NODE_ENV = 'beta';
module.exports.SSA_URL = process.env.SSA_URL = 'http://ssa.jd.com/sso/verify'; //ssa单点登录授权地址
module.exports.DB_URL = process.env.DB_URL = 'mongodb://172.25.47.50/portal-cms'; //mongodb闭环
module.exports.superAdmin = process.env.superAdmin = 'superAdmin';
module.exports.superPwd = process.env.superPwd = 'frontend1234567';
module.exports.javaServerUrl='http://172.24.5.4:8128';