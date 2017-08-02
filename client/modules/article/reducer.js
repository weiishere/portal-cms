import CONSTS from './constant';

const initState = {
    pageData: {
        data: [],
        pagination: {}
    },
    categoryList: {
        data: [],
        pagination: {}
    }
};


function categoryList(state = {
    ...initState.categoryList
}, action) {
    switch (action.type) {
    case CONSTS.RECEIVE_CATEGORY_LIST:
        return {
            ...action.categoryList
        };
        break;
    default:
        return state;
    }
}

function pageData(state={
    ...initState.pageData
}, action) {
    switch (action.type) {
    case CONSTS.RECEIVE_PAGES:
        return {
            ...action.pages
        };
        break;
    default:
        return state;
    }
}

export default {
    pageData,
    categoryList
};
