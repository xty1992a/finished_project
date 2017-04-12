import React, { Component } from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'

export default class MobileNewsBlock extends Component {
  state = {
    newsArr: []
  }

  componentWillMount () {
    const {count, type} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
        .then(response => {
          let newsArr = response.data.map(news=>{
            return {
              title:news.title,
              dateTime:news.date,
              imgUrl:news.thumbnail_pic_s,
              newsID:news.uniquekey,
              realtype:news.realtype
            }
          })
          this.setState({newsArr})
        })

        .catch(error => {
          console.log(error);
        })

  }

  render(){
    const {newsArr} = this.state

    const newsList =newsArr.length ?  newsArr.map((news, index) => {
      return (
          <Card key={index}
                className="m_article list-item special_section clearfix">
            <Link to={`/new_detail/${news.newsID}`}>
              <div className="m_article_img">
                <img src={news.imgUrl} alt={`img${index}`}/>
              </div>
              <div className="m_article_info">
                <div className="m_article_title">
                  <span>{news.title}</span>
                </div>
                <div className="m_article_desc clearfix">
                  <div className="m_article_desc_l">
                    <span className="m_article_channel">{news.realtype}</span>
                    <span className="m_article_time">{news.dateTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
      )
    }):'没有加载到任何数据'

    return (

        <div className="m_article">
          {newsList}
        </div>
    )

  }
}