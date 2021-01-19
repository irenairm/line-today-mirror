import './App.css';
import React from 'react'
import {Card, Row,Col} from 'react-bootstrap'

class NewsCardBare extends React.Component{

    goToPage(page){
        window.location.href = page
    }
    formatTimestamp(time){
        return new Date(time).toLocaleDateString("en-IN") + ' ' + new Date(time).toLocaleTimeString("en-IN")
    }
    
    render(){
        const limit = this.props.limit?this.props.limit:999;
        return <Row>
        {this.props.sections.map((articles,index1) => articles.articles.map((articles,index) => 
        articles.title?
        <Col sm={6}>
           <Card key={index} className="card-groups bare" onClick={()=>this.goToPage(articles.url.url)}>
                <Row className="body-card">
                    <Col sm={4}>
                        <Card.Img variant="top" className="img-article" src={articles.thumbnail?`https://obs.line-scdn.net/${articles.thumbnail.hash}`:null} />
                    </Col>
                    <Col sm={8}>
                        <Card.Body>
                            {index}
                            <Card.Title className="title-article">{articles.title}</Card.Title>
                            <Card.Text className="publisher-article">{articles.publisher}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
                <Card.Footer>
                <small className="text-muted">{this.formatTimestamp(articles.publishTimeUnix)}</small>
                </Card.Footer>
            </Card>
        </Col>:null).splice(0,limit))}
       
      </Row>
      
    }
}
export default NewsCardBare