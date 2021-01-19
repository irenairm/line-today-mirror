import './App.css';
import React from 'react'
import {Card,Row,Col} from 'react-bootstrap'

class NewsCard extends React.Component{
    goToPage(page){
        window.location.href = page
    }
    formatTimestamp(time){
        return new Date(time).toLocaleDateString("en-IN") + ' ' + new Date(time).toLocaleTimeString("en-IN")
    }
    render(){
        return <Row>
        {this.props.sections.map(articles => articles.articles.map(articles => 
        articles.title?
        <Col sm={6}>
            <Card className="card-groups" onClick={()=>this.goToPage(articles.url.url)}>
                <Card.Img variant="top" className="img-article" src={articles.thumbnail?`https://obs.line-scdn.net/${articles.thumbnail.hash}`:null} />
                <Card.Body>
                <Card.Title>{articles.title}
                </Card.Title>
                <Card.Text className="publisher-article">
                    {articles.publisher}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">{this.formatTimestamp(articles.publishTimeUnix)}</small>
                </Card.Footer>
            </Card>
        </Col>:null))}
      </Row>
    }
}
export default NewsCard