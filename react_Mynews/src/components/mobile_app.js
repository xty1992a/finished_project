import React from 'react'

import MobileNewsHeader from './mobile_news_header'
import NewsFooter from './news_footer'
import {BackTop} from 'antd'
import '../mobile.css'

export default class MobileApp extends React.Component {

  render(){

    return (
        <div>
          <MobileNewsHeader></MobileNewsHeader>
          {this.props.children}
          <NewsFooter></NewsFooter>
          <BackTop />
        </div>
    )
  }
}