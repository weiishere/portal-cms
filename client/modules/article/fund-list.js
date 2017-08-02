import React, {Component} from 'react';
import { Tabs, Table, Icon, Menu, Dropdown, message, Modal, Tag} from 'antd';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import {getPages, updatePostState} from './action';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;


class ArticleList extends Component {
    constructor (props) {
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);

        const me = this;

        const menu = function(record) {
            let link = record.link.indexOf('https://') === 0 ||
                record.link.indexOf('http://') === 0 ?
                record.link : me.props.rootUrl + record.link,
                delMenuItem = null,
                isInTrash = me.props.params.cat === 'trash';

            if (isInTrash ) {
                delMenuItem = 
                    (<a href="javascript:;" onClick={() => {
                        confirm({
                            title: '删除页面',
                            content: '您确认彻底删除此页面吗？',
                            onOk() {
                                me.doUpdatePost('admin/article/delete', record._id);
                            }
                        });
                    }}>彻底删除</a>)
                ;
            } else if (!isInTrash) {
                delMenuItem = 
                    (<a href="javascript:;" onClick={() => {
                        confirm({
                            title: '删除页面',
                            content: '您确认删除此页面吗？',
                            onOk() {
                                me.doUpdatePost('admin/article/del', record._id);
                            }
                        });
                    }}>删除</a>)
                ;
            }

            return (
                <Menu style={{width: '100px', textAlign: 'center'}}>
                    <Menu.Item key="1">
                        <a href={link} target="_blank">查看</a>
                    </Menu.Item>
                    <Menu.Item key="2">
                        {delMenuItem}
                    </Menu.Item>
                </Menu>
            );
        };

        this.columns = [
            {
                title: '页面标题',
                render (text, record, idx) {
                    const link = record.link.indexOf('https://') === 0 ||
                        record.link.indexOf('http://') === 0 ?
                        record.link : me.props.rootUrl + record.link;
                        //url = CONSTS.BASE_URL + '/qrcode?dataLink=' + encodeURIComponent(link);

                    // const qrcode = 
                    //     <img style={{width: 130, height: 130}} src={url}/>
                    // ;

                    return (
                         <a href={link} target="_blank">{record.title}</a>
                    );
                }
            },
            {
                title: '当前分类',
                sorter: (a, b) => {
                    const _a = a.categoryId ? a.categoryId : a.category ;
                    const _b = b.categoryId ? b.categoryId : b.category ;

                    return _a.length - _b.length;
                },
                render (text, record) {

                    let _color = ['yellow', 'green', 'red', 'blue', 'gray'],
                        _categoryList = me.props.categoryList.data,
                        _c = '',
                        _return = record.category ? record.category : ''
                        ;

                    if (_categoryList && _categoryList.length > 0) {

                        _categoryList.map((o, i) => {

                            if (i >= _color.length) {
                                i = 4;
                            }
                            

                            if( !record.categoryId ){
                                if (record.category == o.slug) {
                                    _c = _color[i];
                                }
                            }else{
                                if (record.categoryId == o._id) {
                                    _c = _color[i];
                                    _return = o.shortName;
                                }
                            }
                            return;
                        });
                    }

                    return <Tag color={_c} >{_return}</Tag>;
                    
                }
            },
            {
                title: '当前状态',
                //sorter: (a, b) => a.status.length - b.status.length,
                render (text, record) {
                    switch (record.status) {
                    case 0 :
                        return <span style={{color: '#FF0000'}}>已下线</span>;

                    case 1 :
                        return <span style={{color: '#093'}}>已上线</span>;

                    case 2 :
                        return <span style={{color: '#FF0000'}}>已删除</span>;

                    case 3 :
                        return <span>草稿</span>;

                    default:
                        return '未知状态';
                    }
                }
            },
            {
                title: '修改时间',
                dataIndex: 'updateStr'
            },  
            {
                title: '发布时间',
                dataIndex: 'dateStr'
            },
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => {
                    
                    return (
                    <span className="page-actions">
                        {record.actionSlug !== 'revert' && (<a href={'#/edit-page?pageId=' + record._id}>编辑</a>)}
                        <span className="ant-divider"></span>
                        <a href="javascript:;" onClick={() => {
                            this.doUpdatePost('admin/article/'+record.actionSlug, record._id);
                        }}
                        >
                            {record.actionName}
                        </a>
                        <span className="ant-divider"></span>
                        <Dropdown overlay={menu(record)}>
                          <a href="javascript:;"><span>更多</span> <Icon type="down" /></a>
                        </Dropdown>

                    </span>);

                }
            }
        ];


        // if (this.props.isMaster) {
        this.columns.splice(1, 0,{
            title: '发布人',
            sorter: (a, b) => a.authorId.length - b.authorId.length,
            render (text, record, idx) {
                return record.authorId;
            }
        });
        // }
    }

    createQrcode(link) {
        console.log(link);
    }

    doUpdatePost (slug, id) {
        const hide = message.loading('正在执行中...', 0);
        
        this.props.dispatch(
            updatePostState(slug, id)
        ).then((data) => {
            hide();
            if (data) {
                const currentParams = this.props.params;
                this.fetch(currentParams.cat, currentParams.page)
                .then((data) => {
                    if (data) {
                        message.success('操作成功');
                    } else {
                        message.error('自动刷新失败，请手动刷新页面');
                    }
                });
            } else {
                message.error('操作失败，请重试');
            }
        });
    }

    logOut (e) {
        e.preventDefault();
    }


    componentDidMount () {
        const currentParams = this.props.params;
        this.fetch(currentParams.cat, currentParams.page);

        console.log(this);
    }

    handleTabChange(key) {
        // body...
        console.log(this);
        this.fetch(key, 1).then(() => {
            hashHistory.push('/article-list/' + key);
        });
    }

    fetch (cat, page) {
        return this.props.dispatch(
            getPages(cat, page)
        );
    }   


    componentDidUpdate (prevProps) {
        let currentParams = this.props.params,
            prevParams = prevProps.params,
            currentPage = currentParams.page || 1,
            prevPage = prevParams.page || 1;

        if (currentParams.cat !== prevParams.cat || currentPage !== prevPage) {
            // console.log('该更新后台数据了');
        }
    }

    handleTableChange (pagination) {
        const cat = this.props.params.cat || 'all';
        if (pagination.current !== this.props.params.page) {
            this.fetch(cat, pagination.current)
                .then(() => {
                    hashHistory.push('/article-list/' + cat + '/' + pagination.current);
                });
        }
    }


    render() {
        let pageData = this.props.pageData || {},
            defaultActiveKey = this.props.params.cat || 'all';

        return (
            <div>
                <Tabs defaultActiveKey={defaultActiveKey} onChange={this.handleTabChange.bind(this)}>
                    <TabPane tab="全部" key="all"></TabPane>
                    <TabPane tab="已上线" key="online"></TabPane>
                    <TabPane tab="已下线" key="offline"></TabPane>
                    <TabPane tab="回收站" key="trash"></TabPane>
                </Tabs>
                <Table columns={this.columns}
                    bordered
                    dataSource={pageData.data}
                    rowKey={(record, index) => record._id}
                    pagination={pageData.pagination}
                    loading={this.props.loading}
                    onChange={this.handleTableChange.bind(this)}
                />
            </div>
        );
    }
}

/*
*/


const mapStateToProps = (state) => {
    
    
    const _isMaster = state.get('userInfo').role === '0' ? 1 : 0;

    return {
        isMaster:_isMaster,
        loading: state.get('loading'),
        pageData:state.get('pageData'),
        rootUrl:window.location.origin,
        categoryList: state.get('categoryList')
    };
};

export default connect(mapStateToProps)(ArticleList);
