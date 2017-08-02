import React, {Component} from 'react';
import { Input, Button, message } from 'antd';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

const InputGroup = Input.Group;

class SearchInput extends Component {
    constructor (props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFocusBlur = this.handleFocusBlur.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            value: '',
            focus: false,
        };
    }

    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
    }

    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    }

    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        } else {
            const value = this.state.value.trim();
            if (value == '') {
                message.error('查询内容不能为空');
            } else {
                this.fetch(value, 1).then(() => {
                    hashHistory.push('/dashboard/search/' + value);
                });             
            }   
        }
    }

    fetch (text, page) {
        // return this.props.dispatch(
        //     getSearchPages(text, page)
        // );
    }

    render() {
        const { style, size, placeholder } = this.props;
        
        const searchCls = this.state.focus ? 'ant-search-input ant-search-input-focus' : 'ant-search-input';
        const btnCls = this.state.value.trim() ? 'ant-search-btn ant-search-btn-noempty' : 'ant-search-btn';

        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                    <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
                      onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
                    />
                    <div className="ant-input-group-wrap">
                      <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
                    </div>
                </InputGroup>
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
        // isMaster: state.userInfo.isMaster,
        // loading: state.loading,
        // rootUrl: state.userInfo.rootUrl,
        // pageData: state.pageData,
        // categoryList: state.categoryList
});

export default connect(mapStateToProps)(SearchInput);