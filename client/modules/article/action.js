import CONSTS from './constant';
import { remote, toggleLoading} from '../app/action';

function getPages(cat = 'all', page = 1) {
    return (dispatch, getState) => dispatch(
            remote({
                url: 'admin/article/list',
                data: {
                    cat,
                    page
                }
            })
        )
        .then((json) => {
            if (json) {
                const pageData = {
                    data: json.articles,
                    pagination: {
                        current: parseInt(json.currentPage, 10),
                        pageSize: 10,
                        total: json.total * 10
                    }
                };
                
                dispatch(receivePages(pageData));
                dispatch(receiveCategoryList({data: json.categoryList}));
                return json;
            }
        });
}

function updatePostState(actionSlug, postId) {
    return (dispatch, getState) => dispatch(
            remote({
                url: actionSlug + '/' + postId
            })
        )
        .then((json) => {
            if (json) {
                console.log(json);
                return json;
            }
        });
}

function receiveCategoryList(categoryList) {
    return {
        type: CONSTS.RECEIVE_CATEGORY_LIST,
        categoryList
    };
}


function receivePages(pages){
    return {
        type: CONSTS.RECEIVE_PAGES,
        pages
    };
}

export {
	remote,
	getPages,
    receivePages,
    toggleLoading,
	updatePostState,
	receiveCategoryList
};

