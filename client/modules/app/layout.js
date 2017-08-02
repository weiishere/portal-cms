import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {clearToast, receiveUserInfo} from './action';
import { Menu, Icon, Row, Col, Button } from 'antd';
import callApi from '../../util/fetch';
import CONSTS from '../../consts';

const SubMenu = Menu.SubMenu;
import './styles.less';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './less/app.less';

export class Layout extends Component {

    static propTypes = {
        userInfo: PropTypes.object,
        children: PropTypes.node,
        toast: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            pathname: ''
        };
    }
    componentDidMount() {
        this.getUserInfo();
    }

    componentDidUpdate() {
        const {
      toast, dispatch
    } = this.props;

        if (toast && toast.get('effect') === 'enter') {
            if (this.toastTimeoutId) {
                clearTimeout(this.toastTimeoutId);
            }
            this.toastTimeoutId = setTimeout(() => {
                dispatch(clearToast());
                this.toastTimeoutId = null;
            }, toast.get('time'));
        }
    }

    getUserInfo () {
        callApi({
            url: CONSTS.GET_USER_INFO,
            body: {}
        }).then((res) => {
            if (res.code === '0') {
                this.props.dispatch(receiveUserInfo(res.data));
            }
        });
    }

    menuHandler(item, key, keyPath) { 
        const { router } = this.context; 
    
        if (item && item.key) {
            //if (this.state.pathname !== item.key) {
            if (item.key === 'new-template') {
                router.push({
                    pathname: item.key,
                    state:{
                        isNewTemplate:true,
                        currentTemplate: {}
                    }
                });
            } else {
                router.push({
                    pathname: item.key
                });
            }
            
            this.setState({
                pathname: item.key
            });
            //}
        }
    }

    logoutHandler () {
        window.location.href = 'admin/logout';
    }

    render () {

        return (
            <div className="jrft-layout-aside">
              <aside className="jrft-layout-sider">
                <div className="jrft-layout-logo"></div>
                <Menu   
                      mode="inline" 
                      theme="dark"
                      defaultSelectedKeys={['1']} 
                      defaultOpenKeys={['sub1']}
                      onClick={this.menuHandler.bind(this)}
                >
                  <SubMenu key="sub1" title={<span><Icon type="file-text" />文章管理</span>}>
                    <Menu.Item key="article-list">
                      文章列表
                    </Menu.Item>
                    <Menu.Item key="new-article">
                      添加文章
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="file-text" />分类管理</span>}>
                    <Menu.Item key="category">
                      分类列表
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="file-text" />模板管理</span>}>
                    <Menu.Item key="template">
                      模板列表
                    </Menu.Item>
                    <Menu.Item key="new-template">
                      新建模板
                    </Menu.Item>
                  </SubMenu>

                  <SubMenu key="sub4" title={<span><Icon type="setting" />系统设置</span>}>
                    <Menu.Item key="user-manage">用户管理</Menu.Item>
                  </SubMenu>

                </Menu>
              </aside>
              <div className="jrft-layout-main">
                <div className="jrft-layout-header">
                {this.props.userInfo ? (
                  <Row type="flex" justify="end" align="middle" style={{height: '100%',fontSize: '18px'}}>
                    <Col span={20} style={{textAlign: 'right'}}>欢迎：{this.props.userInfo.username ? this.props.userInfo.username :'userName'}</Col>
                    <Col span={3} offset={1}><Button type="ghost" shape="circle-outline" icon="logout" onClick={this.logoutHandler.bind(this)}/></Col>
                  </Row>
                ) : null}
                </div>
                <div className="jrft-layout-container">
                  <div className="jrft-layout-content">

                    {this.props.children}

                  </div>
                </div>
                <div className="jrft-layout-footer">
                  @2016 京东金融科技门户管理系统
                </div>
              </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        toast: state.get('toast'),
        userInfo: state.get('userInfo')
    };
}

export default connect(mapStateToProps)(Layout);

