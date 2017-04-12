import React, { Component } from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'

import logo from '../images/logo.png'
const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item

class NewsHeader extends Component {
  constructor(props){
    super(props)

    this.state = {
      navKey: 'top',
      username: null,
      userID: null,
      visibleModal:false,
      isRegister:false  //该项决定用户提交登录或者注册请求
    }

  }

  //挂载组件之前看用户是否曾登录
  componentWillMount = ()=>{
    if(localStorage.username){//有值且不为null
      let {username,userID} = localStorage
      this.setState({
        userID,
        username
      })
    }
  }


  //设置导航项选中状态
  setNav = (event) => {
    const navKey = event.key
    this.setState({navKey})
  }

  //弹出登录框
  toLog =() => {
    this.setState({visibleModal:true})
  }
  //设置登录框按钮回调
  setModalVisible = (isOk) => {
    console.log(isOk);
    this.setState({visibleModal:isOk})
  }

  //登录框页签切换,清空输入框内容,并设置isRegister,
  showRegister = () => {
    const { resetFields } = this.props.form
    let isRegister = !this.state.isRegister
    resetFields()
    this.setState({isRegister})
  }

  submitHandle = () => {
    let {isRegister} = this.state
    let formIfo = this.props.form.getFieldsValue()
    let action = isRegister ? 'register' : 'login'
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&`
    if(isRegister){//注册请求
      let {r_userName, r_password, r_passwordSnd} = formIfo
      url += `r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_passwordSnd}`
      axios.get(url)
        .then(response => {//注册成功
          message.success('注册成功!')
        })
        .catch(error => {
          message.error('注册失败!')
        })
    }else {//登录请求
      let {username, password} = formIfo
      url += `username=${username}&password=${password}`
      console.log(url);

      axios.get(url)
        .then(response => {//请求正常返回
          if(response){//返回有值并不为null,登录成功,设置state,并且设置localStorage
            let {UserId, NickUserName} = response.data
            this.setState({
              username:NickUserName,
              userID:UserId
            })
            localStorage.UserID = UserId
            localStorage.username = NickUserName
          }else {//返回null,登录失败
            message.error('登录失败!')
          }
        })
        .catch(error => {
          message.error('登录失败!')
        })
    }
    this.setState({
      visibleModal:false
    })
  }
  //logout登出
  logout = () => {
    this.setState({
      username:'',
      UserId:''
    })
    localStorage.removeItem('userID')
    localStorage.removeItem('username')
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const {navKey, username,visibleModal} = this.state
    const userBar = username ?
      //显示个人中心等按钮
        <MenuItem key="userZone" className="register">
          <Button type='primary'>{username}</Button>
          &nbsp;&nbsp;
          <Button type='dashed'>
            <Link to="/user_center">个人中心</Link>
          </Button>
          &nbsp;&nbsp;
          <Button type='ghost' onClick={this.logout}>退出</Button>
        </MenuItem>
      ://显示登录注册按钮
        <MenuItem key="regist" className="register">
          <Button onClick={this.toLog}><Icon type="appstore" />注册/登录</Button>
        </MenuItem>

    return (
      <Row>
        <Col span={1}></Col>
        <Col span={3}>
          <Link to="/"  className="logo">
            <img src={logo} alt="logo"/>
            <span>ReactNews</span>
          </Link>
        </Col>
        <Col span={1}></Col>
        <Col span={18}>
          <Menu mode='horizontal' selectedKeys={[navKey]} onClick={this.setNav}>
            <MenuItem key="top">
              <Icon type="appstore" />头条
            </MenuItem>
            <MenuItem key="shehui">
              <Icon type="appstore" />社会
            </MenuItem>
            <MenuItem key="guonei">
              <Icon type="appstore" />国内
            </MenuItem>
            <MenuItem key="guoji">
              <Icon type="appstore" />国际
            </MenuItem>
            <MenuItem key="yule">
              <Icon type="appstore" />娱乐
            </MenuItem>
            <MenuItem key="tiyu">
              <Icon type="appstore" />体育
            </MenuItem>
            <MenuItem key="keji">
              <Icon type="appstore" />科技
            </MenuItem>
            <MenuItem key="shishang">
              <Icon type="appstore" />时尚
            </MenuItem>
            {userBar}
          </Menu>
          <Modal visible={visibleModal}
                 title='用户中心'
                 onOk={this.submitHandle}
                 onCancel={this.setModalVisible.bind(this,false)}
          >
            <Tabs type="card" onChange={this.showRegister}>
            {/*<Tabs type="card" onChange={()=>this.props.form.resetFields()}>*/}
              <TabPane tab="登录" key="login">
                <Form>
                  <FormItem label='帐号'>
                    {getFieldDecorator('username', {})(
                        <Input type="username" placeholder="请输入你的帐号" />
                    )}
                  </FormItem>
                  <FormItem label='密码'>
                    {getFieldDecorator('password', {})(
                        <Input type="password" placeholder="请输入你的密码"/>
                    )}
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="register">
                <Form>
                  <FormItem label='帐号'>
                    {getFieldDecorator('r_userName', {})(
                        <Input type="username" placeholder="请输入你的帐号" />
                    )}
                  </FormItem>
                  <FormItem label='密码'>
                    {getFieldDecorator('r_password', {})(
                        <Input type="password" placeholder="请输入你的密码"/>
                    )}
                  </FormItem>
                  <FormItem label='确认密码'>
                    {getFieldDecorator('r_passwordSnd', {})(
                        <Input type="password" placeholder="请确认你的密码"/>
                    )}
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        </Col>
        <Col span={1}></Col>
      </Row>
    )

  }
}

export default Form.create()(NewsHeader)