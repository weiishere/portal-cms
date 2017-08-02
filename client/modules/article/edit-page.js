import React, {Component} from 'react';
import { Form, Input, Button, Select, Spin, message, Card, Modal, Popover} from 'antd';
import {connect} from 'react-redux';
import { Link, hashHistory} from 'react-router';
import { remote, updatePostState, toggleLoading} from './action';
import Uploader from './upload';
import CONSTS from './constant';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;


class Page extends Component {
    constructor (props) {
        super(props);

        this.state = {
            draftList: [],
            visible: false
        };


        this.doPublish = this.doPublish.bind(this);
        this.doNewDraft = this.doNewDraft.bind(this);
    }

    doPublish () {
        const fields = this.getFields();

        if (fields) {
            
            fields.editType = '1';

            if (this.props.isNewPage) {
                this.props.dispatch(
                    remote({
                        url: 'admin/article/new',
                        type: 'POST',
                        data: fields
                    })
                ).then((data) => {
                    data && message.success(data.msg);
                    data && hashHistory.push({
                        pathname: '/dashboard/edit-page',
                        query: {
                            pageId: data.pageId
                        }
                    });
                });
            } else {
                this.props.dispatch(
                    remote({
                        url: 'edit/' + this.state.post._id,
                        type: 'POST',
                        data: fields
                    })
                ).then((data) => {
                    data && message.success(data.msg);
                });
            }
        }
    }


    componentDidUpdate (prevProps) {        
        if (!this.props.isNewPage) {
            let currentParams = this.props.location.query,
                prevParams = prevProps.location.query,
                currentPage = currentParams.pageId,
                prevPage = prevParams.pageId || 1;

            if (currentParams.draftId !== prevParams.draftId || currentPage !== prevPage) {
                console.log('该更新后台数据了');
                this.fetchData();
            }
        }


        // setTimeout(function(){
        //     this.props.dispatch(toggleLoading(true))
        // }.bind(this), 2000)
    }

    doNewDraft () {        
        const fields = this.getFields();

        if (fields) {
            this.props.dispatch(
                remote({
                    url: 'new-draft',
                    type: 'POST',
                    data: fields
                })
            ).then((data) => {
                data && message.success(data.msg);

                if (data) {
                    if (this.props.isNewPage) {
                        const base = '/dashboard/edit-page';
                                
                        hashHistory.push({
                            pathname: base,
                            query: {
                                pageId: data.pageId || data.draft._id,
                                draftId: data.pageId ? data.draft._id : ''
                            }
                        });
                    } else {
                        if (data.pageId) {
                            const a = this.state.draftList;

                            a.unshift(data.draft);

                            this.setState({draftList: a});
                        }
                    }
                }
            });
        }
    }


    getFields (values) {
        const fields = this.props.form.getFieldsValue();

        fields.content = this.editor.getValue();

        if (fields.title && fields.content && fields.shortUrl) {
            return fields;
        } else {
            if (!fields.shortUrl) {
                message.error('页面地址不能为空');
            } else {
                message.error('请完善标题和内容，再进行操作');
            }
            return false;
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
        this.fetchData();

        const me = this;

        window.onresize = function() {
            me.timmer && clearTimeout(me.timmer);
            me.timmer = setTimeout(() => {
                me.setCodeMirrorHeight();
            }, 500);
        };
    }


    fetchData () {
        let pageId, draftId;

        if (!this.props.isNewPage) {
            pageId = this.props.location.query.pageId;
            draftId = this.props.location.query.draftId || '';
        }

        const fetchRemote = this.props.isNewPage ?         
            remote({
                url: 'admin/article/new'
            }) :
            remote({
                url: 'admin/article/edit' + pageId,
                data: {
                    draft: draftId
                }
            }); 
        this.props.dispatch(
            fetchRemote
        ).then((data) => {
            
            if (data) {
                
                this.setState(data, function() {
                    this.initCodeMirror();
                });

                pageId && this.props.dispatch(remote(
                    {
                        url: 'admin/article/draft-list',
                        type: 'POST',
                        data: {
                            id: pageId
                        }
                    }
                )).then((data) => {
                    data && this.setState({draftList: data});
                });
            }
        });
    }


    initCodeMirror () {
        let {dispatch} = this.props,
            me = this;
        dispatch(
            toggleLoading(true)
        );


        require.ensure([], () => {
            let //$ = require('jquery'),
                CodeMirror = require('codemirror'),
                textArea = document.getElementById('J_content');

            require('codemirror/lib/codemirror.css');
            require('codemirror/mode/htmlmixed/htmlmixed');
            require('codemirror/addon/display/placeholder');
            
            if (me.editor) {
                me.editor.setValue(me.state.post.content || '');
            } else {
                me.editor = CodeMirror.fromTextArea(textArea, {
                    lineNumbers: true,
                    theme: 'default',
                    mode: 'htmlmixed'
                });
            }


            me.setCodeMirrorHeight();
   
            dispatch(
                toggleLoading(false)
            );
        });   
    }


    setCodeMirrorHeight() {
        const height = window.innerHeight - (64 + 32 + 32 + 60 + 20 + 80);
        height > 300 && this.editor.setSize(null, height);
    }

    renderSelect (options, getFieldDecorator) {
        let Options = [],
            catSlug = this.state.post.category || options[0].slug;

        options.forEach((item) => {
            Options.push(<Option value={item.slug} key={item.slug}>{item.name}</Option>);
        });

        return (
            <Select style={{ width: '200px' }}
            {...getFieldDecorator('slug', {
                initialValue: catSlug
            })}
            >
                {Options}
            </Select>
        );
    }


    doUpdatePost (slug, id) {
        const hide = message.loading('正在执行中...', 0);

        this.props.dispatch(
            updatePostState(slug, id)
        ).then((data) => {
            hide();
            if (data) {
                message.success(data.msg);

                this.removeDraft(id);
            } else {                
                message.error('操作失败，请重试');
            }
        });
    }


    removeDraft (id) {
        const a = this.state.draftList;


        const r = a.filter((item) => item._id !== id);


        this.setState({draftList: r});
    }

    showUpload (e) {
        e.preventDefault();
        this.setState({
            visible: true
        });
    }


    handleOk () {

        this.setState({
            visible: false
        });
    }

    handleCancel () {
        
        this.setState({
            visible: false
        });
    }


    renderPreviewBtn () {        
        if (this.props.isNewPage) {
            return '';
        } else {
            let previewId = this.props.location.query.draftId || this.props.location.query.pageId,
                previewUrl = `${CONSTS.BASE_URL.replace('/m', '')}page/preview/${previewId}`;

            return (<a href={previewUrl} style={{
                marginLeft: 20
            }}
            target="_blank"
            >预览</a>);
        }
    }

    render() {

        const {
            getFieldDecorator
        } = this.props.form;

        let draftList = this.state.draftList,
            temp = [];

        draftList.forEach((item, idx) => {
            temp.push(
                <li key={idx}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        this.doUpdatePost('delete', item._id);
                    }} style={{marginRight: '20px'}}
                    >删除</a>
                    <Link to={{
                        pathname: '/dashboard/edit-page',
                        query: {
                            pageId: this.props.location.query.pageId,
                            draftId: item._id
                        }
                    }} style={{marginRight: '10px'}}
                    >
                    使用</Link>
                    {item.title} - {item.date}
                </li>);
        });

        draftList = temp.length ? 
            <Card style={{ width: 280 }} title="草稿列表">
                {temp}
            </Card> : '';    

        let dataLink = '', link = '';
        if (this.state.post && this.state.post.status == 1) {
            link = this.props.rootUrl + '/portal/' + this.state.post.shortUrl + '.htm';
            dataLink = CONSTS.BASE_URL + '/qrcode?dataLink=' + encodeURIComponent(link);
        }

        const qrcode = dataLink ? 
                <img style={{width: 130, height: 130}} src={dataLink}/>
             : '';

        const form = 
                this.state.post ? 
                <Form horizontal className="new-page-form" style={{
                    marginRight: '300px'
                }}
                >


                    <div style={{                        
                        width: '100%',
                        float: 'left'
                    }}
                    >
                    <Input type="hidden" {...getFieldDecorator('id', {
                        initialValue: this.state.post._id
                    })}
                    />
                    <FormItem>
                        <Input 
                        {...getFieldDecorator('title', {
                            initialValue: this.state.post.title
                        })}
                        type="text" placeholder="请输入页面标题"
                        />
                    </FormItem>

                    <FormItem style={{
                        marginBottom: 0
                    }}
                    >
                        页面地址：
                        {this.state.host}
                        <Input type="text"
                        {...getFieldDecorator('shortUrl', {
                            initialValue: this.state.post.shortUrl
                        })}
                        size="small"
                        style={{width: '200px', height: '24px'}}
                        placeholder="自定义页面链接"
                        />
                        .htm
                    </FormItem>

                    <p style={{
                        marginBottom: 5
                    }}
                    >
                        <a href="" onClick={this.showUpload.bind(this)}>上传图片</a>
                        {this.renderPreviewBtn()}
                        {
                            this.state.post.status == 1 && 
                               
                                <Popover content={qrcode} placement="top">
                                    <a href={link} target="_blank" style={{marginLeft: 20}}>查看</a>
                                </Popover>
                            
                        }

                    </p>

                    <FormItem>
                        <Input 
                        {...getFieldDecorator('content', {
                            initialValue: this.state.post.content
                        })}
                        type="textarea" id="J_content" placeholder="开发者模式，这里输入页面代码"
                        />
                    </FormItem>

                    </div>

                    <div style={{
                        marginRight: '-300px',
                        width: '280px',
                        float: 'right'
                    }}
                    >
                    <Card style={{ width: '280px' }} title="分类管理">
                        <FormItem label="分类：">
                            {this.renderSelect(this.state.categoryList, getFieldDecorator)}
                        </FormItem>
                    </Card>

                    <Card style={{ width: '280px' }} title="发布">
                        <FormItem>
                            <p>
                                {
                                // <a href={`${this.state.host}${this.props.form.getFieldValue('shortUrl')}.htm`} target="_blank">查看</a>
                                // <a href="" target="_blank">预览</a>
                                }

                            </p>

                            <Button type="primary" onClick={this.doPublish} htmlType="submit">
                                {this.props.isNewPage ? '立即发布' : '立即更新'}
                            </Button>
                            <Button onClick={this.doNewDraft} style={{marginLeft: '20px'}} htmlType="submit">保存草稿</Button>
                        </FormItem>
                    </Card>
                    {draftList}
                    </div>


                    <Modal title="上传图片" visible={this.state.visible}
                        maskClosable={false}
                        footer={[]} onCancel={this.handleCancel.bind(this)}
                    >
                        <Uploader uploadUrl={`${CONSTS.BASE_URL}upload`}/>
                    </Modal>

                    <p style={{clear: 'both'}}></p>
                </Form> : <div style={{
                    height: '300px',
                    width: '100%',
                    paddingTop: '20px',
                    textAlign: 'center'
                }}
                          ></div>
            ;

        return (
            <Spin spinning={this.props.loading}>
                {form}
            </Spin>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state
});


export default connect(mapStateToProps)(
        createForm()(Page)
    );