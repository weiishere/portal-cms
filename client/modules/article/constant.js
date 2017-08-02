import consts from '../app/constant';

const allConsts = Object.assign(
	{},
	consts,
    {
        EDIT_TYPE: 'EDIT_TYPE',
        RECEIVE_USER_INFO: 'RECEIVE_USER_INFO',
        RECEIVE_PAGES: 'RECEIVE_PAGES',
        RECEIVE_USERS: 'RECEIVE_USERS',
        RECEIVE_CATEGORY_LIST: 'RECEIVE_CATEGORY_LIST',
    });

export default allConsts;