import React, { Component } from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component {

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
            newsID:news.uniquekey
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
    let cardContent = newsArr.length?
        newsArr.map((news, index)=>{
          return (
              <li key={index}>
                <Link to={`/new_detail/${news.newsID}`}>{news.title}</Link>
              </li>
          )
        })
        :'没有加载到任何数据'

    return (
      <Card >
        <ul className="topNewsList">
          {cardContent}
        </ul>
      </Card>
    )

  }
}