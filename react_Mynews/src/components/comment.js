import React, { Component } from 'react'
import {Card} from 'antd'

export default class Comment extends Component {


  render(){
    const {name, commentStr, datetime} = this.props
    return (

        <Card title={name} extra={<a href="#">发表时间:{datetime}</a>}>
          {commentStr}
        </Card>
    )

  }
}