export const RECEIVE_USERS = 'RECEIVE_USERS';

import { remote } from '../app/action';
import CONSTS from '../app/constant';

export function getUsers(data){
    return (dispatch, getState) => dispatch(
            remote({
                url: CONSTS.USER_LIST,
                data: data
            })
        ).then((list) => {
            if (list) {
                const data = {
                    data: list,
                    pagination: {
                        pageSize: 5,
                        total: list.length
                    }
                };
                dispatch(receiveUsers(data));
            }
        });
}

function receiveUsers(userList){
    return {
        type: RECEIVE_USERS,
        userList
    };
}