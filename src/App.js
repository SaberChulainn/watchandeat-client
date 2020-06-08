import React from 'react';
import NavbarPage from './component/navbar.js'
import Signup from './component/signup.js'
import { BrowserRouter, Route } from "react-router-dom";
import Randomize from './component/randomizer/randomgenerator.js'
import Login from './component/login.js'
import Results from './component/results.js'


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  render(){
  return (
      <BrowserRouter>
        <NavbarPage/>
        <Route path="/signup" render={(props) => <Signup {...props} setUser={this.setUser}/>}/>
        <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>}/>
        <Route path="/randomized" component={Randomize}/>
        <Route path="/results" component={Results}/>
        <Route path="/"/>
        </BrowserRouter>

    );
  }
}
