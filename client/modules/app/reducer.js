import Immutable from 'immutable';

import {
	SET_TOAST, 
	CLEAR_TOAST,
	TOGGLE_LOADING,
    RECEIVE_USER_INFO
} from './action';

const initialState = Immutable.fromJS({
    effect: null,
    content: null,
    time: null
});
const loadingInit = false;


// 设置 toast 内容和效果
function app(state = initialState, action) {
    const {type, content, effect, time, error} = action;
    if (type === CLEAR_TOAST) {
        return state.set('effect', effect);
    } else if (type === SET_TOAST) {
        return state.set('content', content).set('effect', effect).set('time', time);
    } else if (error) {
        return state.set('content', error).set('effect', 'enter').set('time', 3000);
    }
    return state;
}


function loading(state = loadingInit, action) {
    const {type, showLoading } = action;
    switch (type) {
    case TOGGLE_LOADING:
        return showLoading;
        break;
    default:
        return state;
    }
}


function userInfo(state = {}, action) {
    switch (action.type) {
    case RECEIVE_USER_INFO:
        return action.userInfo;
        break;
    default:
        return state;
    }
}

export default {
    app,
    loading,
    userInfo
};
