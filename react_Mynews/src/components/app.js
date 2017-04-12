import React from 'react'
// import {Link} from 'react-router'
// import {Button, Row, Col} from 'antd'
import {BackTop} from 'antd'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'

import '../index.css';

export default class App extends React.Component {

  render(){

    return (
      <div>
        <NewsHeader></NewsHeader>
        {this.props.children}
        <NewsFooter></NewsFooter>
        <BackTop/>
      </div>
    )
  }
}