import React, { Component } from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsImageBlock extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newsArr: []
    }
  }


  componentWillMount () {
    const {count, type} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
        .then(response => {
          let newsArr = response.data.map(news=>{
            return {
              title:news.title,
              authorName:news.author_name,
              imgUrl:news.thumbnail_pic_s,
              newsID:news.uniquekey
            }
          })
          this.setState({newsArr})
          console.log('to setState');
        })

        .catch(error => {
          console.log(error);
        })

  }


  render(){
    const {newsArr} = this.state
    const {title, width, imageWidth} = this.props
    let cardContent = null
    let imgStyle = {
      width: imageWidth,
      height: '90px'
    }
    let titleStyle = {
      width: imageWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    if(newsArr.length){
      cardContent = newsArr.map((news, index)=>{
        return (
          <div key={index} className="imageblock">
            <Link to={`/new_detail/${news.newsID}`}>
              <img src={news.imgUrl} style={imgStyle} alt={`img${index}`}/>
              <div className="custom-card">
                <h3 style={titleStyle}>{news.title}</h3>
                <p>{news.authorName}</p>
              </div>
            </Link>
          </div>
        )
      })


    }else {
      cardContent = '没有加载到任何数据'
    }

    return (
      <Card title={title} style={{width:width}} className="topNewsList">
        {cardContent}
      </Card>
    )

  }
}