import React from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {Row, Col, Card, Tabs} from 'antd'
import MyUpload from './myUpload'
const TabPane = Tabs.TabPane


export default class UserCenter extends React.Component {

  state = {
    myNews: [],
    myComments: []
  }

  componentWillMount(){
    const userID = localStorage.UserID

    if(userID){//当用户登录时才返回列表
      //获取收藏列表
      let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userID}`
      axios.get(url)
          .then(res => {
            let myNews = res.data
            this.setState({myNews})
          })
      //获取评论列表
      let commentsUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userID}`
      axios.get(commentsUrl)
          .then(res => {
            let myComments = res.data
            this.setState({myComments})
          })

    }
  }

  render() {

    const {myNews, myComments} = this.state
    let content = '请先登录!'
    if(localStorage.UserID){
      let newsList = myNews.map((item, index) => {
        return (
            <Card key={index} title={item.uniquekey}
                  extra={
                    <Link to={`/new_detail/${item.uniquekey}`}>查看</Link>
                  }>
              <p>{item.Title}</p>
            </Card>
        )
      })
      let commentsList = myComments.map((item, index) => {
        return (
            <Card key={index} title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`}
                  extra={
                    <Link to={`/new_detail/${item.uniquekey}`}>查看</Link>
                  }>
              <p>{item.Comments}</p>
            </Card>
        )
      })
      content = (
          <Row>
            <Col span={1}></Col>
            <Col span={22}>
              <Tabs>
                <TabPane tab="收藏列表" key="1">
                  {newsList}
                </TabPane>
                <TabPane tab="评论列表" key="2">
                  {commentsList}
                </TabPane>
                <TabPane tab="上传头像" key="3">
                  <MyUpload />
                </TabPane>
              </Tabs>
            </Col>
            <Col span={1}></Col>
          </Row>
      )
    }


    return (
        <div>
          {content}
        </div>
    )
  }
}