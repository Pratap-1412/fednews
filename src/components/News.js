import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country:  PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string
    }
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca94399df4a24c7eb89e4d9f2450c410&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca94399df4a24c7eb89e4d9f2450c410&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca94399df4a24c7eb89e4d9f2450c410&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
        })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>FedNews - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element,pos) => {
                        return <div className="col-md-4" key={pos}>
                            <NewsItem  title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' onClick={this.handlePrevClick} className='btn btn-dark'>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' onClick={this.handleNextClick} className='btn btn-dark'>Next &rarr;</button>  
                </div>
            </div>
        )
    }
}

export default News
