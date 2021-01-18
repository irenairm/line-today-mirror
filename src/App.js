import './App.css';
import React from 'react'
import axios from 'axios'
import {Card, Button, Row,Col,Container} from 'react-bootstrap'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:[],
      active: ''
    }
    this.activateTabs = this.activateTabs.bind(this)
  }
  componentDidMount(){
    axios.get('https://cors-anywhere.herokuapp.com/http://today.line.me/id/portaljson',
    )
      .then(res => this.setState({data:res.data.result.categories}))
  }
  activateTabs(tab){
    this.setState({active:tab})
  }
  formatTimestamp(time){
    return new Date(time).toLocaleDateString("en-US") + ' ' + new Date(time).toLocaleTimeString("en-US")
  }
  goToPage(page){
    window.location.href = page
  }
  render(){
    console.log(this.state.data)
    return <Container>
      <div className="tab-list">
      <ul className="nav nav-tabs" id="line-today-tab" role="tablist">
        {this.state.data.map(data => 
          <li className="nav-item" onClick={()=>this.activateTabs(data.name)}>
            <a className={this.state.active===data.name?'nav-link active':'nav-link'} id={data.id} data-toggle="tab" href={'#'+data.name} role="tab" aria-controls={data.name} aria-selected="true">{data.name}</a>
          </li>
        )}
      </ul>
      </div>
      <div className="tab-content" id="line-today-tab-content">
        {this.state.data.map(data => 
         <div className={this.state.active===data.name?'tab-pane fade show active':'tab-pane fade'} id={data.name} role="tabpanel" aria-labelledby={data.id}>
           { 
            data.templates.filter(news => !news.title).map(news => 
             
                <Row>
                  
                  {news.sections.map(articles => articles.articles.map(articles => 
                  articles.title?
                  <Col sm={6}>
                  <Card className="card-groups">
                  <Card.Img variant="top" className="img-article" src={articles.thumbnail?`https://obs.line-scdn.net/${articles.thumbnail.hash}`:null} />
                  <Card.Body>
                    <Card.Title>{articles.title}</Card.Title>
                    <Card.Text>
                      <Button onClick={()=>this.goToPage(articles.url.url)}>Go to News</Button>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{this.formatTimestamp(articles.publishTimeUnix)}</small>
                  </Card.Footer>
                </Card>
                </Col>:null))}
                
                </Row>)
            }
          {
            data.templates.filter(news => news.title).map(news => 
            <Card className="card-container">
            <Card.Body>
              <Card.Title>{news.title}</Card.Title>
              <Row>
                {news.sections.map(articles => articles.articles.map(articles => 
                <Col sm={6}>
                <Card className="card-groups">
                <Card.Img variant="top" className="img-article" src={`https://obs.line-scdn.net/${articles.thumbnail.hash}`} />
                <Card.Body>
                  <Card.Title>{articles.title}</Card.Title>
                  <Card.Text>
                    <Button onClick={()=>this.goToPage(articles.url.url)}>Go to News</Button>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{this.formatTimestamp(articles.publishTimeUnix)}</small>
                </Card.Footer>
              </Card>
              </Col>))} 
              </Row>
            </Card.Body>
          </Card>)
          }
         </div>
        )}
      </div>
      </Container>
  }
}

export default App;
