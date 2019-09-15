import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import TopResults from './components/repos.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post({
      url: 'http://localhost:1128/repos',
      data: {user:term},
      success: () => {$.get({
        url: 'http://localhost:1128/repos',
        datatype: 'json',
        success: (data) =>{this.setState({repos:data})},
      })},
      datatype: 'json',
    })
  }

  componentDidMount() {
    $.get({
      url: 'http://localhost:1128/repos',
      datatype: 'json',
      success: (data) =>{
        console.log('get on load',data)
        this.setState({repos: data})
      },
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <TopResults repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));