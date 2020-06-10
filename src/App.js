import React from 'react';
import NavbarPage from './component/navbar.js'
import Signup from './component/signup.js'
import { BrowserRouter, Route } from "react-router-dom";
import Randomize from './component/randomizer/randomgenerator.js'
import Login from './component/login.js'
import Results from './component/results.js'
import Profile from './component/profile.js'


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      movie: {},
      food: {}
    }
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  setMovie = (movie) => {
    this.setState({movie: movie})
  }

  render(){
  return (
      <BrowserRouter>
        <NavbarPage/>
        <Route path="/signup" render={(props) => <Signup {...props} setUser={this.setUser}/>}/>
        <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>}/>
        <Route path="/randomized" render={(props) => <Randomize {...props} setMovie={this.setMovie}/>}/>
        <Route path="/results" render={(props) => <Results {...props} movie={this.state.movie}/>}/>
        <Route path="/profile" render={(props) => <Profile {...props}/>}/>
        <Route path="/"/>
        </BrowserRouter>

    );
  }
}
