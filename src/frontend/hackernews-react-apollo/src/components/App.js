import React, { Component } from 'react';
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
// import '../styles/App.css';
import PostList from './PostList'
import CreatePost from './CreatePost';
import Login from './Login'
import Search from './Search'

class App extends Component{
  render(){
    // return (<PostList />)
    // return (<CreatePost />)
    return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
        </Switch> 
      </div>
    </div>
    )
  }
}

export default App;