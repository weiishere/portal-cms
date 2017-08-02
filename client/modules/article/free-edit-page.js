import React, {Component} from 'react';
import { Form, Input, Button, Select, Spin, message, Card, /*Modal, Popover*/} from 'antd';
import {connect} from 'react-redux';
import { Link, hashHistory} from 'react-router';
import {remote, updatePostState} from './action';
//import Uploader from './upload';
import CONSTS from './constant';
//import Simditor from 'simditor';
import 'simditor/styles/simditor.css';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

class FreePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            draftList: [],
            visible: false
        };

        this.previewHandle = this.previewHandle.bind(this);
        this.doPublish = this.doPublish.bind(this);
        this.doNewDraft = this.doNewDraft.bind(this);
    }

    doPublish () {
        const fields = this.getFields();

        if (fields) {

            if (this.props.isNewPage) {
                this.props.dispatch(
                    remote({
                        url: 'admin/article/new',
                        type: 'POST',
                        data: fields
                    })
                ).then((data) => {
                    data && message.success(data.msg);
                    // data && hashHistory.push({
                    //     pathname: 'admin/article/edit/',
                    //     query: {
                    //         pageId: data.pageId
                    //     }
                    // });
                });
            } else {
                this.props.dispatch(
                    remote({
                        url: 'admin/article/update?id=' + this.state.post._id,
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
                        const base = 'admin/article/edit?';
                                
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

        //if (this.FreeEdit) {
        //    fields.content = this.FreeEdit.getValue();
        //} else {
        //fields.content = this.state.post.content;
        //}
        try{
            //检测格式
            fields.content=JSON.parse(fields.content);
            //转为字符串
            fields.content=JSON.stringify(fields.content);
        }catch(e){
            message.error('请检查内容格式，需要输入标准的json格式');
            return false;
        }
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

        //const me = this;

        // window.onresize = function(){
        //     me.timmer && clearTimeout(me.timmer);
        //     me.timmer = setTimeout(function(){
        //         me.setCodeMirrorHeight();
        //     }, 500)
        // }


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
                url: 'admin/article/edit?id=' + pageId,
                data: {
                    draft: draftId
                }
            }); 

        this.props.dispatch(
            fetchRemote
        ).then((data) => {
            const _data = data;

            if (data) {
                
                if (_data.post && !_data.post.content) {
                    _data.post.content = '';
                }

                this.setState(_data, function() {
                    this.initEdit();
                });
                // pageId && this.props.dispatch(remote(
                //     {
                //         url: 'draft-list',
                //         type: 'POST',
                //         data: {
                //             id: pageId
                //         }
                //     }
                // )).then((data) => {
                //     data && this.setState({draftList: data});
                // });
            }
        });
    }


    initEdit() {
        
      
        //let textArea = document.getElementById('J_content');
        //
        //this.FreeEdit = new Simditor({
        //    textarea: textArea,
        //    placeholder: '这里输入文字...',
        //    pasteImage: true,
        //    defaultImage: 'images/image.png',
        //    upload: {
        //        url: CONSTS.BASE_URL + 'admin/upload',
        //        fileKey: 'upload_file',
        //        leaveConfirm: '正在上传'
        //    }
        //});

        /*默认显示内容*/
        //if (this.state.post && this.state.post.content) {
        //    this.FreeEdit.setValue(this.state.post.content);
        //}
        
    }


    renderSelect (options, getFieldDecorator) {
        let Options = [],
            _options = options ? options : []
        ;
        
        if( !_options || _options.length < 1){
            return;
        }

        options.forEach((item,key) => {
            Options.push(<Option value={this.state.post.category ? item.shortName : item._id} key={key}>{item.name}</Option>);
        });
        

        return (
           <FormItem label="分类：">
                {getFieldDecorator('categoryId', {
                    initialValue: this.state.post.categoryId || this.state.post.category || this.state.categoryList[0]._id
                })(
                    <Select style={{ width: '200px' }} >
                        {Options}
                    </Select>
                )}
            </FormItem>
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

    previewHandle() {
        let previewId = this.props.location.query.draftId || this.props.location.query.pageId,
            previewUrl = `${CONSTS.BASE_URL.replace('/m', '')}portal/preview/${previewId}`;

        window.open(previewUrl+'?previewData='+JSON.stringify(this.getFields())); 
    }

    renderPreviewBtn () {        
        if (this.props.isNewPage) {
            return '';
        } else {

            return (
                <a style={{margin: 20}}
                  onClick={this.previewHandle}
                >
                    预览
                </a>
            );
        }
    }


    renderTemplateList(getFieldDecorator) {
        let Options = [],
            templateList = this.state.templateList ? this.state.templateList : []
        ;
        
        if( !templateList || templateList.length < 1){
            return;
        }

        templateList.forEach((item,key) => {
            Options.push(<Option value={item._id} key={key}>{item.Name}</Option>);
        });

        return (
           <FormItem label="模板：">
                {getFieldDecorator('template', {
                    initialValue: this.state.post.template || this.state.templateList[0]._id
                })(
                    <Select style={{ width: '200px' }}>
                        {Options}
                    </Select>
                )}
            </FormItem>
        );
    }

    /**
     * 格式化内容，便于阅读
     */
    formatContent(content){
        if(!content){
            return content;
        }
        let cent=JSON.parse(content),
            arr=['{\n'],
            i;
        for(i in cent){
            if(i){
                if(arr.length!==1){
                    arr.push(',\n\t"'+i+'" : '+JSON.stringify(cent[i])+'');
                }else{
                    arr.push('\t"'+i+'" : '+JSON.stringify(cent[i])+'');
                }
            }
        }
        arr.push('\n}');
        return arr.join('');
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
                        this.doUpdatePost('admin/article/delete', item._id);
                    }} style={{marginRight: '20px'}}
                    >删除</a>
                    <Link to={{
                        pathname: 'admin/article/edit/',
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

        //let dataLink = '', link = '';
        //if (this.state.post && this.state.post.status == 1) {
        //    link = this.props.rootUrl + 'portal/' + this.state.post.shortUrl + '.htm';
        //    dataLink = CONSTS.BASE_URL + '/qrcode?dataLink=' + encodeURIComponent(link);
        //}
        //
        //const qrcode = dataLink ?
        //        <img style={{width: 130, height: 130}} src={dataLink}/>
        //     : '';

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
                    
                    {getFieldDecorator('id',{initialValue: this.state.post.id})(
                        <Input type="hidden" />
                    )}
                    <FormItem>
                        {getFieldDecorator('title',{initialValue: this.state.post.title})(
                            <Input type="text" placeholder="请输入页面标题" />
                        )}
                    </FormItem>

                    <FormItem style={{
                        marginBottom: 0
                    }}
                    >
                        页面地址：
                        {this.state.host}
                        {getFieldDecorator('shortUrl',{initialValue: this.state.post.shortUrl})(
                            <Input type="text" 
                                   size="small" 
                                   style={{width: '200px', height: '24px'}} 
                                   placeholder="自定义页面链接"          
                            />
                        )}
                        .htm
                    </FormItem>
                        <p style={{'padding':'10px 0px'}}>输入模板中所需变量</p>
                    <FormItem>
                        {getFieldDecorator('content',{
                            rules: [{
                                required: true, message: '请输入内容'
                            }],
                            initialValue: this.formatContent(this.state.post.content)||'{\n' +
                            '\t"key":"value"\n' +
                            '}'
                        })(
                            <Input id="J_content" type="textarea" style={{minHeight:'300px',fontSize:18,color:'#333'}}/>
                        )}
                    </FormItem>

                    </div>

                    <div style={{
                        marginRight: '-300px',
                        width: '280px',
                        float: 'right'
                    }}
                    >
                    <Card style={{ width: '280px' }} title="分类菜单">
                        {this.renderSelect(this.state.categoryList,getFieldDecorator)}
                    </Card>

                    <Card style={{ width: '280px' }} title="模板菜单">
                        {this.renderTemplateList(getFieldDecorator)}
                    </Card>

                    <Card style={{ width: '280px' }} title="发布菜单">
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
                            <Button type="primary" style={{marginLeft:'20px'}}>
                               {this.renderPreviewBtn()}
                            </Button>
                        </FormItem>
                    </Card>
                    {draftList}
                    </div>
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

function mapStateToProps (state) {
    return {
        loading: state.get('loading')
    };
}


export default connect(mapStateToProps)(
        createForm()(FreePage)
    );