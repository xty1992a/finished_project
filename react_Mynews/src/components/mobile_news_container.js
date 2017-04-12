import React, { Component } from 'react'
import {Carousel, Tabs} from 'antd'

const TabPane = Tabs.TabPane

import MobileNewsBlock from './mobile_news_block'

import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

export default class MobileNewContainer extends Component {
  state = {
    navKey:''
  }

  render(){
    return (
        <div  style={{width:'100%'}}>

          <Tabs >
            <TabPane tab="头条" key="toutiao">
              <Carousel autoplay infinite className="slick-list">
                <div><img src={img1} alt={'a'}/></div>
                <div><img src={img2} alt={'b'}/></div>
                <div><img src={img3} alt={'c'}/></div>
                <div><img src={img4} alt={'d'}/></div>
              </Carousel>
              <MobileNewsBlock count={15} type="guoji"/>

            </TabPane>
            <TabPane tab="国际" key="guoji">
              <MobileNewsBlock count={15} type="guoji"/>
            </TabPane>
            <TabPane tab="娱乐" key="yule">
              <MobileNewsBlock count={15} type="yule"/>
            </TabPane>
            <TabPane tab="体育" key="tiyu">
              <MobileNewsBlock count={15} type="tiyu"/>
            </TabPane>
            <TabPane tab="国内" key="guonei">
              <MobileNewsBlock count={15} type="guonei"/>
            </TabPane>
          </Tabs>
        </div>
    )

  }
}