import React, { Component } from 'react'

import {Row, Col} from 'antd'

export default class NewsFooter  extends Component {


  render(){
    return (
        <Row className='footer'>
          <Col span={24}>© 2016 ReactNews. All Rights Reserved.</Col>
        </Row>
    )

  }
}