import React, {Component} from 'react';
import { message, Modal, Button, Form, Input, Select} from 'antd';
import callApi from '../../util/fetch';
import CONSTS from '../../consts';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;


class EditCategory extends Component {
    state = {
        templateList: [],
    };

    componentWillMount = () => {
        this.getTemplate();
    };

    componentDidMount = () => {
        this.props.form.resetFields();
    };

    getTemplate = () => {

        callApi({
            url: CONSTS.GET_ALL_TEMPLATE,
            body: {}
        })
    .then((res) => {
        if (res.data) {
            this.setState({
                templateList: res.data.list
            });
        } else {                
            message.error('操作失败，请重试');
        }
    });
    };

    doUpdate = (fields) => {
        const _url = this.props.isNewCategory ? CONSTS.ADD_CATEGORY : CONSTS.UPDATE_CATEGORY,
            _text = this.props.isNewCategory ? '创建' : '更新';
        callApi({
            url: _url,
            body: this.props.isNewCategory ? {
                name: fields.name,
                shortDesc: fields.shortDesc,
                shortName: fields.shortName,
                templateName: fields.templateName
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

        if (!this.props.isNewCategory && !fields.id) {            
            message.error('编辑参数异常，请重试');
            return false;
        }

        if (fields.name && fields.shortName) {            
            return fields;
        } else {
            if (!fields.name) {
                message.error('请输入分类名称');
            } else if (!fields.shortName) {
                message.error('请输入分类短名称');
            } else if (!fields.shortDesc) {
                message.error('请输入分类描述');
            } else if (!fields.templateName) {
                message.error('请选择模板');
            } else {
                message.error('请完善表单信息在提交');
            }
            return false;
        }
    };

    setSelectionItem = () => {
        const arr = [];
        this.state.templateList.forEach((item, index) => {
            arr.push(<Option value={item._id} key={{index}}>{item.Name}</Option>);
        });
        return arr;
    };

    render = () => {
        const {category} = this.props;

        const {
          getFieldDecorator
        } = this.props.form;

    // console.log(category)

        return (
      <Modal ref="modal"
        visible={this.props.visible}
        title={this.props.isNewCategory ? '新增分类' : '编辑分类'}
        closable={false}
        footer={[
            <Button key="back" type="ghost" size="large" 
          onClick={this.handleCancel}
            >取消</Button>,
            <Button key="submit" type="primary" size="large"
          loading={this.props.loading} 
          onClick={this.handleOk}
            >
           {this.props.isNewCategory ? '新增' : '更新'}
          </Button>,
        ]}
      >


        {
          <Form horizontal key="form" style={{
              marginRight: '120px'
          }}
          >
            <Input type="hidden" {...getFieldDecorator('id', {
                initialValue: category._id
            })}
            />
            <FormItem label="分类名称">
              {
                getFieldDecorator('name', {
                    rules: [
                    { required: true, message: '请输入分类名称' },
                    ],
                    initialValue: category.name 
                })(
                  <Input type="text"/>
                )
              }
              
            </FormItem>
            <FormItem label="分类短名称">
              {
                getFieldDecorator('shortName', {
                    rules: [
                    { required: true, message: '请输入分类短名称' },
                    ],
                    initialValue: category.shortName 
                })(
                  <Input type="text"/>
                )
              }
            </FormItem>
            <FormItem label="分类描述">
              
              {
                getFieldDecorator('shortDesc', {
                    rules: [
                    { message: '请输入分类描述' },
                    ],
                    initialValue: category.shortDesc 
                })(
                <Input type="textarea"/>
              )}

              
            </FormItem>
            <FormItem label="模板名称">
              {
                getFieldDecorator('templateName', {
                    initialValue: category.templateName 
                })(
                  <Select placeholder="请选择模板">
                    {
                      this.setSelectionItem()
                    }
                  </Select>
                )
              }
            </FormItem>
          </Form>
        }
      </Modal>
        );
    }
}

export default createForm()(EditCategory);