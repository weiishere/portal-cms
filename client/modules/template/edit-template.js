import React, {Component} from 'react';
import { message, Modal, Button, Form, Input} from 'antd';
import callApi from '../../util/fetch';
import CONSTS from '../../consts';

const FormItem = Form.Item;
const createForm = Form.create;


class EditTemplate extends Component {

    state = {
        templateList: [],
    };

    componentDidMount = () => {
        this.props.form.resetFields();
    };

    doUpdate = (fields) => {
        const _url = this.props.isNewTemplate ? CONSTS.ADD_TEMPLATE : CONSTS.UPDATE_TEMPLATE,
            _text = this.props.isNewTemplate ? '创建' : '更新';
        callApi({
            url: _url,
            method:'post',
            body: this.props.isNewTemplate ? {
                name: fields.name,
                content: fields.content,
                desc: fields.desc
            } : fields
        })
    .then((res) => {
        if (res) {
            this.props.updateModalStatus(false, this.props.form, res.data[0]);
            message.success(_text + '成功');
        } else {                
            message.error('操作失败，请重试');
        }
    });
    };

    handleCancel = () => {
        this.props.updateModalStatus(false, this.props.form);
    };

    handleOk = () => { 
        const fields = this.getFields();

        if (fields) {
            this.doUpdate(fields);
        }
    };


    getFields = () => {
        const fields = this.props.form.getFieldsValue();

        if (!this.props.isNewTemplate && !fields.id) {            
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


    render = () => {
        const {template} = this.props;

        const {
          getFieldDecorator
        } = this.props.form,
            _variable = '{{variable}}(普通文字内容)',
            _variable1 = '{{{variable}}}(里面带有标签形式的)';
        return (
      <Modal ref="modal"
        visible={this.props.visible}
        title={this.props.isNewTemplate ? '新增模板' : '编辑模板'}
        closable={false}
        footer={[
            <Button key="back" type="ghost" size="large" 
          onClick={this.handleCancel}
            >取消</Button>,
            <Button key="submit" type="primary" size="large"
          loading={this.props.loading} 
          onClick={this.handleOk}
            >
           {this.props.isNewTemplate ? '新增' : '更新'}
          </Button>,
        ]}
      >


        {
          <Form horizontal key="form" style={{
              marginRight: '120px'
          }}
          >
            <Input type="hidden" {...getFieldDecorator('id', {
                initialValue: template._id
            })}
            />
            <FormItem label="模板名称">
              {
                getFieldDecorator('name', {
                    rules: [
                    { required: true, message: '请输入模板名称' },
                    ],
                    initialValue: template.Name 
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
                    initialValue: template.desc 
                })(
                  <Input type="text"/>
                )
              }
            </FormItem>
            <FormItem label="模板内容">
            <div>
                <p style={{color:'red'}}>模板内的变量需要使用花括号括起来。例：</p>
                <pre style={{color:'gray'}}>{_variable}</pre>
                <pre style={{color:'gray'}}>{_variable1}</pre>    
            </div>
              {
                getFieldDecorator('content', {
                    rules: [
                    { required: true, message: '请输入模板内容' },
                    ],
                    initialValue: template.content 
                })(
                  <Input type="textarea"/>
                )
              }
            </FormItem>
          </Form>
        }
      </Modal>
        );
    }
}

export default createForm()(EditTemplate);
