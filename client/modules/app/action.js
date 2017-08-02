export const SET_TOAST = 'SET_TOAST';
export const CLEAR_TOAST = 'CLEAR_TOAST';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

import fetch from 'isomorphic-fetch';
import {message} from 'antd';
import CONSTS from './constant';


/**
 * @param  {Boolean} 是否显示Loading状态
 * @return {Object} action 对象
 */
export function toggleLoading(showLoading = false) {
    return {
        type: TOGGLE_LOADING,
        showLoading
    };
}
// 设置 toast，包括内容和样式
export function setToast({content = '', effect = 'enter', time = 3000}) {
    return {
        type: SET_TOAST,
        content,
        effect,
        time,
    };
}

// 清空 toast，这里只是修改了效果，没有清空内容
export function clearToast(effect = 'leave') {
    return {
        type: CLEAR_TOAST,
        effect
    };
}


export function receiveUserInfo(userInfo) {
    return {
        type: RECEIVE_USER_INFO,
        userInfo
    };
}


/**
 * lzc
 * 基础的AJAX方法
 * @type {}
 */

export function remote(options) {
    return (dispatch, getState) => {
  
        options = {
            type: 'GET',
            data: {},
            ...options
        };

        const fetchOptions = {
            credentials: 'include',
        };
        options.data = {
            ...options.data
        };

        fetchOptions.headers = {
            'Accept': 'application/json, text/javascript, */*;',
            'Content-Type': 'application/json; charset=utf-8'
        };


        if (options.type.toUpperCase() === 'GET' && options.data) {
            let concatStr = '?';

            if (options.url.indexOf(concatStr) > -1) {
                concatStr = '&';
            }

            options.url += concatStr + param(options.data);
        } else {
            fetchOptions.method = options.type;

      // fetchOptions.headers = {
      //   'Content-Type': 'application/json',
      //   'X-Requested-With': 'XMLHttpRequest'
      // };

            fetchOptions.body = JSON.stringify(options.data);
      
        
        }
        dispatch(toggleLoading(true));

        return fetch(CONSTS.BASE_URL + options.url, fetchOptions)
            .then(res => res.json())
            .then(json => {
                dispatch(toggleLoading(false));
                if (json.code) {
                    if (json.code == 0) {
                        return json.data || {};  
                    } else {
                        message.error(json.msg || '数据返回异常');
                    }
                } else {
                    message.error(json.msg || '网络繁忙，出现未知错误请稍后重试');
                }
            })
            .catch(e => {
                dispatch(toggleLoading(false));
                const errText = '网络异常：' + e;
                console.log(errText);
                message.error(errText);
            });

    };
}

function param (obj) {
    const str = [];

    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }

    return str.join('&');
}
