import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import MediaQuery from 'react-responsive'

import App from './components/app'
import NewContainer from './components/new_container'
import NewDetail from './components/new_detail'
import UserCenter from './components/user_center'


//移动端组件
import MobileApp from './components/mobile_app'
import MobileUserCenter from './components/mobile_user_center'
import MobileNewContainer from './components/mobile_news_container'
import MobileNewDetail from './components/mobile_news_detail'


ReactDOM.render(
    (
        <div>
          <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
              <Route path='/' component={App}>
                <IndexRoute component={NewContainer}></IndexRoute>
                <Route path='/new_detail/:newsID' component={NewDetail}></Route>
                <Route path='/user_center' component={UserCenter}></Route>
              </Route>
            </Router>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <Router history={hashHistory}>
              <Route path='/' component={MobileApp}>
                <IndexRoute component={MobileNewContainer}></IndexRoute>
                <Route path='/new_detail/:newsID' component={MobileNewDetail}></Route>
                <Route path='/user_center' component={MobileUserCenter}></Route>
              </Route>
            </Router>
          </MediaQuery>

        </div>


    ),
  document.getElementById('root')
);
