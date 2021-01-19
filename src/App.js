import './App.css';
import React from 'react'
import axios from 'axios'
import {Card, Container} from 'react-bootstrap'
import NewsCard from './NewsCard'
import NewsCardBare from './NewsCardBare'
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
            <NewsCardBare sections={news.sections}></NewsCardBare>)
          }
          {
            data.templates.filter(news => news.title).map(news => 
            <Card className="card-container">
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                  <NewsCard sections={news.sections}></NewsCard>
              </Card.Body>
            </Card>)
          }
        </div>)}
      </div>
      </Container>
  }
}

export default App;
