import './App.css';
import React from 'react'
import axios from 'axios'
import {Card, Container, Button,Navbar} from 'react-bootstrap'
import NewsCard from './NewsCard'
import NewsCardBare from './NewsCardBare'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:[],
      active: '',
      showAll:false
    }
    this.activateTabs = this.activateTabs.bind(this)
    this.showMore = this.showMore.bind(this)
  }
  componentDidMount(){
    axios.get('https://cors-anywhere.herokuapp.com/http://today.line.me/id/portaljson',
    )
      .then(res => this.setState({data:res.data.result.categories}))
    this.setState({active:'TOP'})
  }
  activateTabs(tab){
    this.setState({active:tab})
  }
  showMore(){
    console.log(this.state.showAll)
    this.setState({showAll:!this.state.showAll})
  }
  render(){
    const limit = this.state.showAll?999:4
    return <Container>
    <Navbar bg="dark" variant="dark" className="navbar-overwrite">
      <Navbar.Brand className="navbar-brand-overwrite" href="/">
        <img
          alt=""
          src="https://static-today.line-scdn.net/dist/59120d06/static/meta/mainimg.png"
          width="70"
          height="70"
          padding="0"
          className="d-inline-block align-top"
        />{' '}
    </Navbar.Brand>
    </Navbar>
      <div className="tab-list">
        <ul className="nav nav-tabs" id="line-today-tab" role="tablist">
          {this.state.data.map(data =>
            <li className="nav-item" onClick={()=>this.activateTabs(data.name)}>
            <a className={this.state.active===data.name?'nav-link active':'nav-link'} id={data.id} data-toggle="tab" href={data.name==='TOP'?'/':'#'+data.name} role="tab" aria-controls={data.name} aria-selected="true">{data.name}</a>
          </li>
          )}
        </ul>
      </div>
      <div className="tab-content" id="line-today-tab-content">
        {this.state.data.map(data => 
        <div className={this.state.active===data.name?'tab-pane fade show active':'tab-pane fade'} id={data.name} role="tabpanel" aria-labelledby={data.id}>
          { 
            
            data.templates.filter(news => !news.title).splice(0,limit).map((news,index) => 
            this.state.showAll?
            <NewsCardBare key={index} sections={news.sections}></NewsCardBare>:
            // <p>{index}</p>
            (<NewsCardBare  key={index} limit={3} sections={news.sections}></NewsCardBare>))
            
          }
          {
            <Container className="button-container">
              <Button onClick={()=>this.showMore()}>{this.state.showAll?'Hide':'Show All'}</Button>
            </Container>
          }
          {
            data.templates.filter(news => news.title).map(news => 
            <Card className="card-container">
              <Card.Body>
                <Card.Title id="card-title-section">{news.title}</Card.Title>
                  <NewsCard sections={news.sections}></NewsCard>
              </Card.Body>
              {news.title==='Viral di Medsos'?
              <Button className="button-container" onClick={()=>this.activateTabs('#Trending')}>Show More</Button>:null}
            </Card>)
          }
        </div>)}
      </div>
      </Container>
  }
}

export default App;
