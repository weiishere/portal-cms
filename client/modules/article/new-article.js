import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {editTypeAction} from './action';
import FreeEditPage from './free-edit-page';

class NewPage extends Component {


    clickHandler (e) {
    
    }

    render () {
   

        return (

             <FreeEditPage isNewPage/>
             
        );
    }
}


const mapStateToProps = (state) => ({
    state: state
});

export default connect(mapStateToProps)(NewPage);