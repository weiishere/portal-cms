import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Popconfirm, Form, Row, Col, Input, Button, Select } from 'antd';

import { remote } from '../app/action';
import { getUsers } from './action';
import CONSTS from '../app/constant';
import './style.less';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

export class UserManage extends Component {

    constructor(props){
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            users: {}
        };

        this.columns = [{
            title: '用户名',
            dataIndex: 'userName',
            width: 200,
        }, {
            title: '状态',
            width: 150,
            render: (text, record) => {
                let status = record.status,
                    span = {
                        text: '正常',
                        color: '#093'
                    };

                if (status == '1') {
                    span.text = '冻结';
                    span.color = '#ff0000';
                }

                return <span style={{color: span.color}}>{span.text}</span>;
            }
        }, {
            title: '角色',
            width: 200,
            render: (text, record) => {
                const role = record.role;

                switch (role){
                case '0':
                    return '管理员';
                default:
                    return '一般用户';
                }
            }
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                let statusText = record.status == 0 ? '冻结' : '解冻',
                    roleText = record.role == '0' ? '一般用户' : '管理员',
                    sct = '确定' + statusText + '此账号吗？',
                    rct = '确定' + roleText + '此账号吗？';
                return (
                    <span>
                        <Popconfirm
                            placement="bottomRight"
                            title={sct}
                            onConfirm={() => {
                                this.doUpdateUserStatus(record);
                            }}
                        >
                            <a href="javascript:;">
                                {statusText}
                            </a>
                        </Popconfirm>
                      
                        <span className="ant-divider" />

                        <Popconfirm
                            placement="bottomRight"
                            title={rct}
                            onConfirm={() => {
                                this.doUpdateUserRole(record);
                            }}
                        >
                            <a href="javascript:;">
                                转成{roleText}
                            </a>
                        </Popconfirm>

                    </span>
                );
            }
        }];
    }

    doUpdateUserStatus(record){
        const me = this;
        const type = record.status == 1 ? 'unfreeze' : '';

        this.props.dispatch(
            remote({
                url: CONSTS.USER_CHANGE_STATUS,
                data: {
                    username: record.userName,
                    type
                }
            })
        ).then((json) => {
            if (json) {
                const data = {
                    ...this.props.location.query
                };
                me.fetch(data);
            } 
        });
    }

    doUpdateUserRole(record){
        let me = this,
            toRole = record.role == '0' ? '1' : '0';

        this.props.dispatch(
            remote({
                url: CONSTS.USER_CHANGE_ROLE,
                data: {
                    username: record.userName,
                    role: toRole
                }
            })
        ).then((json) => {
            if (json) {
                const data = {
                    ...this.props.location.query
                };
                me.fetch(data);
            }
        });
    }

    fetch (data) {
        if (!data.page) {
            data.page = 1;
        }

        for (const key in data){
            if (!data[key]) {
                delete data[key];
            }
        }

        this.props.dispatch(
            getUsers(data)
        );
    }

    handleTableChange(pagination) {
        if (pagination.current !== this.props.location.query.page) {
            const data = {
                ...this.props.location.query,
                page: pagination.current
            };
            this.fetch(data);
        }
    }

    componentDidMount () {        
        const currentParams = this.props.location.query;
        this.fetch(currentParams);
    }

    handleReset () {
        this.props.form.resetFields();
    }

    handleSearch (e) {
        e.preventDefault();
        const fields = this.props.form.getFieldsValue();
        this.fetch(fields);
    }

    render() {

        let userList = this.props.userList && this.props.userList.data,
            pagination = this.props.userList && this.props.userList.pagination;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
    
        return (
            <div>
                <Form
                    horizontal
                    className="search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={40}>
                        <Col span={8} key="user">
                          <FormItem {...formItemLayout} label="用户名：">
                          {getFieldDecorator('userName')(
                            <Input placeholder="查询的用户erp" />)}
                          </FormItem>
                        </Col>
                        <Col span={8} key="status">
                          <FormItem {...formItemLayout} label="状态：">
                            {getFieldDecorator('status', {rules: [{message: '请选择状态'}]})(
                                <Select placeholder="请选择状态" >
                                  <Option value="0">正常</Option>
                                  <Option value="1">冻结</Option>
                                </Select>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={8} key="role">
                          <FormItem {...formItemLayout} label="角色：">
                            {getFieldDecorator('role', {rules: [{message: '请选择角色'}]})(
                                <Select placeholder="请选择角色">
                                  <Option value="0">管理员</Option>
                                  <Option value="1">一般用户</Option>
                                </Select>
                            )}
                          </FormItem>
                        </Col>
                    </Row>
                    <Row>
                      <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                          清除
                        </Button>
                        
                      </Col>
                    </Row>
                </Form>
                <Table 
                  bordered
                  columns={this.columns} 
                  dataSource={userList} 
                  pagination={pagination} 
                  onChange={this.handleTableChange.bind(this)}
                />
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        userList: state.get('userList').get('list')
    };
}


export default connect(mapStateToProps)(createForm()(UserManage));
