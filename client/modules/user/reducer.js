import Immutable from 'immutable';

import {RECEIVE_USERS} from './action';
const initialState = Immutable.fromJS({
    list: null
});

function userList(state = initialState, action) {
    if (action.type === RECEIVE_USERS) {
        console.log(action.userList);
        return state.set('list', action.userList);
    }
    return state;
}


export default { userList };