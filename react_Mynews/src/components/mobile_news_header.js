import React, { Component } from 'react'
import {Link} from 'react-router'
import {Icon, Modal, Form, Tabs, Input, message} from 'antd'
import axios from 'axios'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

import logo from '../images/logo.png'

class MobileNewsHeader extends Component {
  state = {
    username:'',
    userID:'',
    visibleModal:false,
    isRegister:false
  }

  //第一次登录时,查询并设置登录状态
  componentWillMount () {
    const username = localStorage.username
    this.setState({username})
  }
  //当用户登出时,通知组件更新登录状态
  componentWillReceiveProps(nextProps) {
    const username = localStorage.username
    this.setState({username})
  }
  //设置登录框是否显示
  setModalVisible = (isOK) =>{
    this.setState({visibleModal:isOK})
  }

  //切换是否注册
  isRegister = () => {
    //清空其他选项卡输入项
    this.props.form.resetFields()
    //设置isRegister
    let isRegister = !this.state.isRegister
    this.setState({isRegister})
  }

  //提交登录请求
  submitHandle = () => {
    //判断是否是注册请求
    let {isRegister} = this.state
    let action = isRegister ? 'register' : 'login'

    const {username, password, r_userName, r_password, r_passwordSnd} = this.props.form.getFieldsValue()
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_passwordSnd}`

    if(isRegister){//注册请求
      console.log(isRegister, '注册');
      axios.get(url)
          .then(res => {
            if(res){
              message.success('注册成功!')
              this.setState({visibleModal:false})
              this.props.form.resetFields()
            }else {
              message.error('注册失败!')
            }
          })
    }else { //登录请求
      console.log(isRegister, '登录');
      axios.get(url)
          .then(res => {
            if(res){
              let {UserId, NickUserName} = res.data
              this.setState({
                username:NickUserName,
                userID:UserId,
                visibleModal:false
              })
              localStorage.UserID = UserId
              localStorage.username = NickUserName
              this.props.form.resetFields()
              message.success('登陆成功!')
            }else {
              message.error('登陆失败!')
            }
          })

    }
  }

  render(){
    const {visibleModal, username} = this.state
    const {getFieldDecorator} = this.props.form
    //用户操作区
    let userZone = username?
          <Link to="/user_center"><Icon type="setting"/></Link>
        : <span onClick={this.setModalVisible.bind(this,true)}> <Icon type="inbox"/></span>

    //

    return (
      <div id="mobileheader">
        <header>
          <Link to="/">
            <img src={logo} alt="logo"/>
            <span>ReactNews</span>
          </Link>
          {userZone}

        </header>
        <Modal visible={visibleModal}
               title='用户中心'
               onOk={this.submitHandle}
               onCancel={this.setModalVisible.bind(this,false)}
        >
          <Tabs onChange={this.isRegister}>
            <TabPane tab="登录" key="1">
              <Form>
                <FormItem label='请输入帐号'>
                  {
                    getFieldDecorator('username')(
                      <Input type="text"/>
                    )
                  }
                </FormItem>
                <FormItem label='请输入密码'>
                  {
                    getFieldDecorator('password')(
                      <Input type="password"/>
                    )
                  }
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form>
                <FormItem label='请输入帐号'>
                  {
                    getFieldDecorator('r_userName')(
                        <Input type="text"/>
                    )
                  }
                </FormItem>
                <FormItem label='请输入密码'>
                  {
                    getFieldDecorator('r_password')(
                        <Input type="password"/>
                    )
                  }
                </FormItem>
                <FormItem label="请确认密码">
                  {
                    getFieldDecorator('r_passwordSnd')(
                        <Input type="password"/>
                    )
                  }
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>

        </Modal>
      </div>
    )

  }
}

export default Form.create({})(MobileNewsHeader)