// utils 函数
/**
 * 获得地址栏传递参数
 * @returns {null}
 */
export const getLocationParams = () => {
    let search = location.search;
    if (search.length > 1) {
        const params = {};
        search = search.substring(1);
        search.split('&').forEach((item) => {
            const tempParam = item.split('=');
            params[tempParam[0]] = tempParam[1] === '' ? null : decodeURIComponent(tempParam[1]);
        });
        return params;
    }
    return null;
};

/**
 * 返回 location.origin, 例如： http://www.example.com:9090
 * @returns {string}
 */
export const getLocationOrigin = () => location.origin;

/**
 * 返回根路径，例如 http://www.example.com:9090/context/
 * @returns {*}
 */
export const getLocationRoot = () => {
    const pathname = location.pathname;
    const origin = location.origin;
    const root = pathname.match(/\/[\w\d-_]+\//)[0];
    return origin + root;
};

/**
 * 返回上下文路径，例如 /context/
 * @returns {*}
 */
export const getLocationContext = () => location.pathname.match(/\/[\w\d-_]+\//)[0];

// 格式化 json 数据
export const parseJSON = (str) => {
    if (!str) {
        return null;
    }
    let json = null;
    try {
        json = JSON.parse(str);
    } catch (e) {
        json = null;
        console.info(e);
    }
    return json;
};

// 把 json 数据转换为字符串
export const stringifyJSON = (json) => {
    let str = null;
    try {
        str = JSON.stringify(json);
    } catch (e) {
        str = null;
        console.info(e);
    }
    return str;
};

/**
 * 时间格式转换 time ms
 * @param time
 * @param showMs 是否显示毫秒
 * @param showYear 是否显示年
 * @returns {*}
 */
/*eslint-disable prefer-template*/
export const formatDate = ({time, showMs = false, showYear = false}) => {
    if (!time) {
        return '';
    }
    let date = new Date(Number(time));
  // 在 ios 下需要显式的转换为字符串
    if (date.toString() === 'Invalid Date') {
        date = this.createDate(time);
        if (date.toString() === 'Invalid Date') {
            return '';
        }
    }
    const H = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
    const M = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
    const S = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();
    let MS = date.getMilliseconds();
    if (MS <= 9) {
        MS = '00' + MS;
    } else if (MS <= 99) {
        MS = '0' + MS;
    }

    const hms = showMs ? ` ${H}:${M}:${S}.${MS}` : ` ${H}:${M}:${S}`;
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;

    let day = date.getDate();
    day = day <= 9 ? '0' + day : day;

    return (showYear ? year + '-' : '') + month + '-' + day + hms;
};

/**
 * 标准创建时间格式 new Date(y, m, d, h, M, s, ms)
 * 如果对于时间格式比较复杂的情况，可参考 Moment 库 http://momentjs.com/
 *
 * @param input 支持 yyyy-MM-dd HH:mm:ss.SSS 或 yyyy-MM-dd HH:mm:ss:SSS 或 yyyy/MM/dd HH:mm:ss.SSS
 * 2016-06-02 13:01:50.333  2016-06-02 13:01:50:333 2016/06/02 13:01:50:333
 * 标准写法为 2016-06-02T05:01:50.333Z
 * @returns {Date}
 */
export const createDate = (input) => {
    if (!input || typeof input !== 'string') {
        return null;
    }
    let y = 0, m = 0, d = 0, h = 0, M = 0, s = 0, ms = 0;
    const inputs = input.replace(/\//g, '-').split(' ');
    if (inputs.length > 0) {
        const ymd = inputs[0].split('-');
        y = Number(ymd[0]);
        m = Number(ymd[1]) - 1;
        d = Number(ymd[2]);
    }
    if (inputs.length === 2) {
        const hms = inputs[1].split(':');
        h = Number(hms[0]);
        M = Number(hms[1]);
    //格式 2016-06-02 13:01:50.333
        const sms = hms[2].split('.');
        if (sms.length === 2) {
            s = Number(sms[0]);
            ms = Number(sms[1]);
        } else {
            s = Number(hms[2]);
        }
    // 格式 2016-06-02 13:01:50:333
        if (hms[3]) {
            ms = hms[3];
        }
    }
    return new Date(y, m, d, h, M, s, ms);
};

/**
 * 判断样式在浏览器中是否支持
 * @param styleProp
 * @returns {boolean}
 */
export const styleSupport = (styleProp) => {
    const prefix = ['webkit', 'moz', 'ms', 'o'];
    const $el = document.createElement('div');
    const styleText = $el.style;
    if (styleText[styleProp] !== undefined) {
        return true;
    }

    for (let i = 0; i < prefix.length; i++) {
        const _styleProp = prefix[i] + styleProp[0].toUpperCase() + styleProp.substring(1);
        if (styleText[_styleProp] !== undefined) {
            return true;
        }
    }
    return false;
};

/**
 * 判断是否支持 history.pushState
 * @returns {*|pushState|replaceState}
 */
export const historyH5Support = () => history.pushState && history.replaceState;

/**
 * 判断是否为 ie8
 * @returns {boolean}
 */
export const ie8 = () => {
    const nav = window.navigator;
    const browser = nav.appName;
    const version = nav.appVersion;
    return browser === 'Microsoft Internet Explorer' &&
    version.split(';')[1].replace(/[ ]/g, '') === 'MSIE8.0';
};

export default {
    getLocationParams,
    getLocationOrigin,
    getLocationRoot,
    getLocationContext,
    parseJSON,
    stringifyJSON,
    formatDate,
    createDate,
    styleSupport,
    historyH5Support,
    ie8
};

