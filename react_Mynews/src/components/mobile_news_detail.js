import React from 'react'
import {Form, Input, Button, message, notification} from 'antd'
import axios from 'axios'

import Comment from './comment'

const FormItem = Form.Item

class MobileNewDetail extends React.Component {

  constructor(props){

    super(props)
    this.state = {
      pageContent:null,
      commentList:null
    }
  }
  componentWillMount(){
    const {newsID} = this.props.params

    this.showPage(this.props)
    //获取新闻评论
    let commentUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsID}`
    axios.get(commentUrl)
        .then(response => {
          let commentList = response.data.map((comment, index)=>{
            return (
                <Comment key={index} name={comment.UserName}
                         commentStr={comment.Comments}
                         datetime={comment.datetime}
                />
            )
          })
          this.setState({commentList})
        })
        .catch(error => console.log(error))
  }

  componentWillReceiveProps(nextProps){
    this.showPage(nextProps)
  }

  showPage = (props) => {
    const {newsID} = props.params
    let newsUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsID}`

    //获取新闻详情
    axios.get(newsUrl)
        .then(response => {
          let {pagecontent} = response.data
          this.setState({pageContent:pagecontent})
        })
        .catch(error => console.log(error))
  }

  commit = () =>{
    let UserID = localStorage.UserID
    if(UserID){
      let {newsID} = this.props.params
      let content = this.props.form.getFieldValue('content')
      let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${UserID}&uniquekey=${newsID}&commnet=${content}`
      axios.get(url)
          .then(res => {
            if(res){
              message.success('提交成功!')
              this.componentWillMount()
            }
          })
    }else {
      message.warn('请先登录!')
    }
  }
  save = () =>{
    let UserID = localStorage.UserID
    if(UserID){
      let {newsID} = this.props.params
      let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${UserID}&uniquekey=${newsID}`
      axios.get(url)
          .then(res => {
            if(res){
              notification.success({
                message:'React News',
                description:'收藏成功!'
              })
            }
          })
    }else {
      message.warn('请先登录!')
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form


    return (
        <div style={{padding: '10px'}}>
              <div dangerouslySetInnerHTML={{__html:this.state.pageContent}}></div>
              <div>
                {this.state.commentList}
                <Form style={{textAlign:'center'}}>
                  <FormItem label='输入评论'>
                    {
                      getFieldDecorator('content')(
                          <Input type="textarea" style={{margin:'0 0 0'}}/>
                      )
                    }
                  </FormItem>
                </Form>
                <Button type='primary' onClick={this.commit}>提交评论</Button>
                &nbsp;
                <Button type='primary' onClick={this.save} style={{float: 'right'}}>收藏文章</Button>
              </div>
        </div>
    )
  }
}

export default Form.create({})(MobileNewDetail)