import React, {Component} from 'react';
import { Table, message, Menu} from 'antd';
import callApi from '../../util/fetch';
import EditCategory from './edit-category';
import CONSTS from '../../consts';


export class CategoryPage extends Component {
    state = {
        categoryList: {
            data: [],
            pagination: {
            }
        },
        currentCategory: {},
        visible: false,
        isNewCategory: true
    }

    componentDidMount = () => {
        this.fetch();
    };


    fetch = (page = 1) => {
        callApi({
            url: CONSTS.GET_ALL_CATEGORY,
            body: {
                _id: 'lzc'
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    categoryList: {
                        data: res.data.list,
                        pagination: {
              // current: parseInt(data.currentPage, 10),
              // pageSize: 10,
              // total: data.total * 10
                        }
                    }
                });
            }
        });
    };

    tableModel = [
        {
            title: '分类名称',
            dataIndex: 'name'
        },
        {
            title: '分类ID',
            dataIndex: '_id'
        },
        {
            title: '分类短名称',
            dataIndex: 'shortName'
        },
        {
            title: '描述',
            dataIndex: 'shortDesc',
            render(text, record){
                return record.shortDesc === 'undefined' ? '' : record.shortDesc;
            }
        },
        {
            title: '模板',
            dataIndex: 'templateName',
            render(text, record){
                return record.templateName === 'undefined' ? '' : record.templateName;
            }
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => 
          <span>
            <a onClick={this.clickEditCategory.bind(this, record)}>编辑</a>
            <a style={{marginLeft: '10px'}} onClick={this.removeCategory.bind(this, record)}>删除</a>
          </span>
        
        }
    ];

    clickEditCategory = (record) => {
        this.setState({
            currentCategory: this.getCategoryById(record._id),
            isNewCategory: false,
            visible: true
        });
    };

    removeCategory = (record) => {
        const id = record._id;
        callApi({
            url: CONSTS.REMOVE_CATEGORY,
            body: {
                id
            }
        }).then((res) => {
            if (res) {
                if (res.code === '0'){
                    message.success('删除成功');
                    this.setState({
                        categoryList: {
                            data: res.data.list
                        }
                    });
                } else {
                    message.error('操作失败，请重试');
                }
            }
        });
    };


    handleTableChange = (pagination) => {
    // if (pagination.current !== this.props.location.query.page) {
    //   this.fetch(pagination.current)
    //     .then(() => {
    //       hashHistory.push({
    //         pathname: '/dashboard/categorys',
    //         query: {
    //           page: pagination.current
    //         }
    //       })
    //     });
    // }
    };

    updateModalStatus = (visible, form, category) => {
        const obj = {
            visible: visible || false
        };
        if (!visible) {
            form.resetFields();
            if (category) {
                let data;
                obj.categoryList = {};

                if (this.state.isNewCategory) {
                    data = this.state.categoryList.data.slice();
                    data.unshift(category);
                } else {
                    data = this.updateCategoryList(category);
                }

                obj.categoryList.data = data;
            }
        }

        this.setState(obj);
    };

    updateCategoryList = (category) => {
        const data = this.state.categoryList.data.slice();

        for (let i = 0; data[i]; i++) {
            if (data[i]._id === category._id) {
                console.log('data[i]:' + data[i]._id + ' category._id' + category._id);
                data[i] = category;
                break;
            }
        }

        return data;
    };

    getCategoryById = (categoryId) => {

        const temp = this.state.categoryList.data.filter(
      (item) => categoryId === item._id
    );

        return temp[0];
    };

    newCategory = (e) => {
        e.preventDefault();

        this.setState({
            visible: true,
            isNewCategory: true,
            currentCategory: {}
        });
    };

    getrowKey = (record, index) => record._id;

    render() {
        const categoryList = this.state.categoryList;

        return (
        <div>
          <Menu mode="horizontal" selectedKeys={['1']} style={{backGround: 'none'}}>
            <Menu.Item key="1">
              分类列表
            </Menu.Item>
            <Menu.Item key="new-cat" style={{marginLeft: 20}}>
                <a href="#" onClick={this.newCategory}>新建分类</a>
            </Menu.Item>
          </Menu>

          <Table columns={this.tableModel}
            style = {{marginTop: 20}}
            bordered
            dataSource={categoryList.data}
            rowKey={this.getrowKey}
            pagination={categoryList.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />

          {
            this.state.visible && <EditCategory
            visible={this.state.visible}
            isNewCategory={this.state.isNewCategory}
            updateModalStatus={this.updateModalStatus}
            category={this.state.currentCategory}
                                  />
          }
            
        </div>
        );
    }
}

export default CategoryPage;
