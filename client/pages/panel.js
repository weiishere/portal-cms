import React from 'react';
import { render } from 'react-dom';
import {Route, IndexRoute} from 'react-router';
import {combineReducers} from 'redux-immutable';


/**
 * 这里用来配置路由规则
 */
import Layout from '../modules/app/layout';
import Dashboard from '../modules/dashboard/index';
import CategoryPage from '../modules/category/CategoryPage';
import ArticleList from '../modules/article/article-list';
import FreeEditPage from '../modules/article/free-edit-page';
import NewArticle from '../modules/article/new-article';
import TemlatePage from '../modules/template/TemplatePage';
import NewTemlate from '../modules/template/new-template';
import UserManage from '../modules/user/index';

// window.logTimes = function(){
  
//   console.log(timer)
// }

const routes = 
  (<Route path="/" component={Layout}>
    <IndexRoute component={Dashboard}/>
    <Route path="/dashboard" component={Dashboard}>
      <Route path="/category" component={CategoryPage}/>
      <Route path="/article-list" component={ArticleList}>
            <Route path=":cat" component={ArticleList}/>
            <Route path=":cat/:page" component={ArticleList}/>
      </Route>
      <Route path="/edit-page" component={FreeEditPage}/>
      <Route path="/new-article" component={NewArticle}/>
      <Route path="/template" component={TemlatePage}/>
      <Route path="/new-template" component={NewTemlate}/>
      <Route path="/user-manage" component={UserManage}/>
    </Route>
  </Route>)
;

/**
 * 这里用来load reducers
 */
import routing from '../util/routing';
import app from '../modules/app/reducer'; //app全局
import dashboard from '../modules/dashboard/reducer'; //面板首页
import article from '../modules/article/reducer'; //文章
import userList from '../modules/user/reducer'; //用户


const reducers = combineReducers(Object.assign(
    { 
        routing,
        dashboard
    },
  app,
  userList,
  article
));


/**
 * render document
 */
import Root from '../Root';
render(
  <Root routes={routes} reducers={reducers}/>,
  document.getElementById('layout')
);
