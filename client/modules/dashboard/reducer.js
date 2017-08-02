import Immutable from 'immutable';

import {HELLO} from './action';

const initialState = Immutable.fromJS({content:null});

function dashboard(state = initialState, action) {
    const {type, content} = action;
    if (type === HELLO) {
        return state.set('content', content);
    }
    return state;
}

export default dashboard;
