import React, {Component} from 'react';
import { message, Button, Form, Input, Menu} from 'antd';
import {hashHistory} from 'react-router';
import callApi from '../../util/fetch';
import CONSTS from '../../consts';

const FormItem = Form.Item;
const createForm = Form.create;


class EditTemplate extends Component {

    state = {
        templateList: [],
        isNewTemplate:this.props.location.state.isNewTemplate
    };

    componentDidMount = () => {
        this.props.form.resetFields();
    };

    doUpdate = (fields) => {
        let isNewTemplate = this.state.isNewTemplate;
        const _url = isNewTemplate ? CONSTS.ADD_TEMPLATE : CONSTS.UPDATE_TEMPLATE,
            _text = isNewTemplate ? '创建' : '更新';
        callApi({
            url: _url,
            method: 'post',
            body: isNewTemplate ? {
                name: fields.name,
                content: fields.content,
                desc: fields.desc
            } : fields
        })
        .then((res) => {
            if (res) {
                // this.props.updateModalStatus(false, this.props.form, res.data[0]);
                message.success(_text + '成功');
                hashHistory.push('/template');

            } else {                
                message.error('操作失败，请重试');
            }
        });
    };

    handleOk = () => { 
        const fields = this.getFields();

        if (fields) {
            this.doUpdate(fields);
        }
    };


    getFields = () => {
        const fields = this.props.form.getFieldsValue();

        if (!this.props.location.state.isNewTemplate && !fields.id) {            
            message.error('编辑参数异常，请重试');
            return false;
        }

        if (fields.name && fields.content) {            
            return fields;
        } else {
            if (!fields.name) {
                message.error('请输入模板名称');
            } else if (!fields.content) {
                message.error('请输入模板内容');
            } else if (!fields.desc) {
                message.error('请输入模板描述');
            } else {
                message.error('请完善表单信息在提交');
            }
            return false;
        }
    };

    blurHandler = (e) => {
        //let val = e.target.value.replace(/\s+/g,' ');
        // e.target.value = val;
    }

    render = () => {
        const _state = this.props.location.state,
            currentTemplate = _state.currentTemplate,
            isNewTemplate = _state.isNewTemplate;

        const {getFieldDecorator} = this.props.form,
            _variable = '1,模板嵌套 {{> 模板ID}}( 注意：模板ID前有一个空格，结束后无空格)',
            _variable1='2,普通模板变量 例如：{{title}}',
            _variable2='3,内容需识别为html的变量 例如:{{{body}}}';
        return (
          <div>
            <Menu mode="horizontal" selectedKeys={['1']} style={{backGround: 'none', marginBottom:'20px'}}>
                {
                    isNewTemplate ? <Menu.Item key="1">新增模板</Menu.Item> : <Menu.Item>编辑模板</Menu.Item>
                }
            </Menu>
            {
              <Form horizontal key="form" style={{
                  marginRight: '120px'
              }}
              >
                {
                    getFieldDecorator('id', {
                        initialValue: currentTemplate._id
                    })(
                        <Input type="hidden" />
                    )
                }
                
                <FormItem label="模板名称">
                  {
                    getFieldDecorator('name', {
                        rules: [
                        { required: true, message: '请输入模板名称' },
                        ],
                        initialValue: currentTemplate.Name 
                    })(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
                <FormItem label="模板描述">
                  {
                    getFieldDecorator('desc', {
                        rules: [
                        { message: '请输入模板描述' },
                        ],
                        initialValue: currentTemplate.desc !== 'undefined' ? currentTemplate.desc : ''
                    })(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
                <FormItem label="模板内容">
                <div style={{color:'red'}}>
                    <p>模板内的变量需要使用花括号括起来。例：</p>
                    <pre>{_variable}</pre>
                    <pre>{_variable1}</pre>
                    <pre>{_variable2}</pre>
                </div>
                  {
                    getFieldDecorator('content', {
                        rules: [
                        { required: true, message: '请输入模板内容' },
                        ],
                        initialValue: currentTemplate.content 
                    })(
                      <Input type="textarea" onBlur={this.blurHandler} style={{height:'200px'}}/>
                    )
                  }
                </FormItem>
              </Form>
            }
            <div>
                <Button key="submit" type="primary" size="large"
                  loading={this.props.loading} 
                  onClick={this.handleOk}
                    >
                   {isNewTemplate ? '新增' : '更新'}
                </Button>
            </div>
          </div>
        );
    }
}

export default createForm()(EditTemplate);
