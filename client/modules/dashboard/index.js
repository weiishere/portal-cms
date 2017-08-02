import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router';

export class Dashboard extends Component {

    static propTypes = {
        children: PropTypes.node
    };

    state = {

    }

    render() {
        return (
      <div>
      {
        this.props.children ? this.props.children : (
          <Row style={{marginTop: 20}} gutter={20}>
                <Col span="12">
                    <Card title="常用功能" style={{height: 234}}>
                        <ul style={{lineHeight: '30px'}}>
                            
                            <li>
                                <Link to={{
                                    pathname: 'new-article'
                                }}>
                                    新建文章
                                </Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: 'template'
                                }}>
                                    查看模板
                                </Link>
                            </li>
                        </ul>
                    </Card>
                </Col>
                <Col span="12">
                    <Card title="问题意见反馈">
                        <h3 style={{marginBottom: 10}}>反馈入口：</h3>
                        <p>
                          <a
                              href="http://gitlab.cbpmgt.com/fe-team/portal-cms/issues" 
                              target="_blank">GitLab</a>
                        </p>
                    </Card>
                </Col>
            </Row>
        )
      }
      </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        dashboard: state.get('dashboard')
    };
}


export default connect(mapStateToProps)(Dashboard);
