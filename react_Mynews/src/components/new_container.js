import React from 'react'
import {Row, Col, Tabs} from 'antd'
import {Carousel} from 'antd'

import NewsImageBlock from './news_Image_block'
import NewsBlock from './news_block'
import Product from './product'

import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

const TabPane = Tabs.TabPane

export default class NewsContainer extends React.Component {

  render(){
    return (
      <div className="container">
        <Row>
          <Col span={1}>1</Col>
          <Col span={22}>

            <div  className='leftContainer' >
              <Carousel autoplay className="carousel">
                <div><img src={img1} alt={'a'}/></div>
                <div><img src={img2} alt={'a'}/></div>
                <div><img src={img3} alt={'a'}/></div>
                <div><img src={img4} alt={'a'}/></div>
              </Carousel>
              <NewsImageBlock title='国际头条' width='100%' count={6} imageWidth='110px' type="guoji" />
            </div>

            <Tabs className='tabs_news' type="card">
              <TabPane key="guoji" tab="国际新闻">
                <NewsBlock count={20} type='guoji'/>
              </TabPane>
              <TabPane key="yule" tab="娱乐新闻">
                <NewsBlock count={20} type='yule'/>
              </TabPane>
            </Tabs>

            <Tabs className='tabs_product'>
              <TabPane key="Product" tab="React产品">
                <Product/>
              </TabPane>
            </Tabs>

            <NewsImageBlock title='国内新闻' width='100%' count={8} imageWidth='140px' type="guonei" />
            <NewsImageBlock title='娱乐新闻' width='100%' count={16} imageWidth='140px' type="yule" />
          </Col>

          <Col span={1}>1</Col>
        </Row>
      </div>
    )
  }
}