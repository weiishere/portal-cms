import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import { Table, message, Menu} from 'antd';
import callApi from '../../util/fetch';
import EditTemplate from './edit-template';
import CONSTS from '../../consts';
import $ from 'jquery';


export class TemplatePage extends Component { 
    state = {
        templateList: {
            data: [],
            pagination: {
            }
        },
        currentTemplate: {},
        visible: false,
        isNewTemplate: true
    }

    componentWillMount = () => {
        this.fetch();
    };


    fetch = (page = 1) => {
        callApi({
            url: CONSTS.GET_ALL_TEMPLATE,
            body: {
                _id: 'lzc'
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    templateList: {
                        data: res.data.list,
                        pagination: {
                        // current: parseInt(data.currentPage, 10),
                        // pageSize: 10,
                        // total: data.total * 10
                        }
                    }
                });
                this.sendTemplate();
            }
        });
    };

    tableModel = [
        {
            title: '模板名称',
            dataIndex: 'Name',
            width: 150
        },
        {
            title: '模板 ID',
            dataIndex: '_id',
            width: 200
        },
        {
            title: '描述',
            dataIndex: 'desc',
            width: 300,
            render: (text, record) => {
                return record.desc === 'undefined' ? '' : record.desc;
            }
        },
        {
            title: '内容',
            dataIndex: 'content',
            render: (text, record) => {
                return <p style={{
                    // maxHeight:'18px',
                    display:'-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, 
                    overflow: 'hidden'}}>
                    {record.content}
                </p>;
            }
        },
        {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => <span>
                        <a onClick={this.clickEditTemplate.bind(this, record)}>编辑</a>
                        <a style={{marginLeft: '10px'}} onClick={this.removeTemplate.bind(this, record)}>删除</a>
                      </span>
          
        
        }
    ];

    clickEditTemplate = (record) => {
        // this.setState({
        //     currentTemplate: this.getTemplateById(record._id),
        //     isNewTemplate: false,
        //     visible: true
        // });
        // 
        // 
        hashHistory.push({pathname:'/new-template',state:{
            isNewTemplate:false,
            currentTemplate: this.getTemplateById(record._id)
        }});
    };

    removeTemplate = (record) => {
        const id = record._id;
        callApi({
            url: CONSTS.REMOVE_TEMPLATE,
            body: {
                id
            }
        }).then((res) => {
            if (res) {
                if (res.code === '0'){
                    message.success('删除成功');
                    this.setState({
                        templateList: {
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
    //         pathname: '/dashboard/templates',
    //         query: {
    //           page: pagination.current
    //         }
    //       })
    //     });
    // }
    };

    updateModalStatus = (visible, form, template) => {
        const obj = {
            visible: visible || false
        };
        if (!visible) {
            form.resetFields();
            if (template) {
                let data;
                obj.templateList = {};

                if (this.state.isNewTemplate) {
                    data = this.state.templateList.data.slice();
                    data.unshift(template);
                } else {
                    data = this.updateTemplateList(template);
                }

                obj.templateList.data = data;
            }
        }

        this.setState(obj);
    };

    updateTemplateList = (template) => {

        const data = this.state.templateList.data.slice();

        for (let i = 0; data[i]; i++) {
            if (data[i]._id === template._id) {
                // console.log('data[i]:' + data[i]._id + ' template._id' + template._id);
                data[i] = template;
                break;
            }
        }

        return data;
    };

    getTemplateById = (templateId) => {

        const temp = this.state.templateList.data.filter(
      (item) => templateId === item._id
    );

        return temp[0];
    };

    newTemplate = (e) => {
        e.preventDefault();

        // this.setState({
        //     visible: true,
        //     isNewTemplate: true,
        //     currentTemplate: {}
        // });
        hashHistory.push({
            pathname: 'new-template',
            state:{
                isNewTemplate:true,
                currentTemplate: {}
            }
        });
    };

    sendTemplate = () => {
        callApi({
            url: CONSTS.RUNTIME_TEMPLATE_FILE
        }).then((res) => {
            if (res) {
                if (res.code === '0'){
                    message.success('生成模板成功');
                } else {
                    message.error('生成失败，'+ res.msg);
                }
            }
        });
        $.ajax({  
            url: CONSTS.ONLINE_RUN_TEMPLATE,  
            type:'GET',  
            cache: false,  
            success: function(){
                message.success(' 生成线上模板成功');  
            }
        });
        
        // callApi({
        //     url: CONSTS.ONLINE_RUN_TEMPLATE
        // }).then((res) => {
        //     if (res) {
        //         if (res.code === '0'){
        //             message.success('生成线上模板成功');
        //         } else {
        //             message.error('生成线上模板失败，'+ res.msg);
        //         }
        //     }
        // });
    };

    getrowKey = (record, index) => record._id;

    render() {
        const templateList = this.state.templateList;

        return (
        <div>
          <Menu mode="horizontal" selectedKeys={['1']} style={{backGround: 'none'}}>
            <Menu.Item key="1">
              模板列表
            </Menu.Item>
            <Menu.Item key="new-tem" style={{marginLeft: 20}}>
                <a href="#" onClick={this.newTemplate}>新建模板</a>
            </Menu.Item>
            <Menu.Item key="send-tem" style={{marginLeft: 20}}>
                <a href="#" onClick={this.sendTemplate}>生成模板</a>
            </Menu.Item>
          </Menu>

          <Table columns={this.tableModel}
            style = {{marginTop: 20}}
            bordered
            dataSource={templateList.data}
            rowKey={this.getrowKey}
            pagination={templateList.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />

          {
            this.state.visible && <EditTemplate
            visible={this.state.visible}
            isNewTemplate={this.state.isNewTemplate}
            updateModalStatus={this.updateModalStatus}
            template={this.state.currentTemplate}
                                  />
          }
            
        </div>
        );
    }
}

export default TemplatePage;
