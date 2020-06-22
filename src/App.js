import React from 'react';
import NavbarPage from './component/navbar.js'
import Signup from './component/signup.js'
import { Route } from "react-router-dom";
import Randomize from './component/randomizer/randomgenerator.js'
import Login from './component/login.js'
import Results from './component/results.js'
import Profile from './component/profile.js'
import './style/background.css'



export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
      movie: {},
      food: {},
      movie_homepage: {}
    }
  }
  componentDidMount(){
    fetch("http://localhost:3001/api/v1/re_auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      },
    }).then(resp => resp.json())
    .then(data => this.setState({user: data}))
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  setMovie = (movie) => {
    this.setState({movie: movie})
  }

  setGenre = (genre) => {
    this.setState({genre_id: genre})
  }

  render(){
  return (
      <body className="background">
        <NavbarPage/>
        <Route path="/signup" render={(props) => <Signup {...props} setUser={this.setUser}/>}/>
        <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>}/>
        <Route path="/randomized" render={(props) => <Randomize {...props} setMovie={this.setMovie} setGenre={this.setGenre} movie_homepage={this.state.movie_homepage}/>}/>
        <Route path="/results" render={(props) => <Results {...props} movie={this.state.movie} user={this.state.user}/>}/>
        <Route path="/profile" render={(props) => <Profile {...props} user={this.state.user}/>}/>
        </body>
    );
  }
}
