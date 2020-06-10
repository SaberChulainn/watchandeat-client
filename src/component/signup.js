import React, { Component }  from 'react';


export default class signUp extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      error: false,
    };
  }


    handleChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      handleSubmit = (e) => {
        e.preventDefault()
          const URL = "http://localhost:3001/api/v1/users";
          fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
              },
            }),
          }).then(resp => resp.json())
          .then((data) => {
            if(data.error){
                this.setState({error: true})
              } else {
                this.setState({error: false})
                this.props.setUser(data.user)
                localStorage.setItem("token", data.jwt)
              }
        }).then(() => { 
            if(!this.state.error){
            this.props.history.push("/randomized");
            window.location.reload();
        }})
          }

    render() {
        return (
        <header className="Sign Up">
        <body>
          {this.state.error && <p>Error in creating your account</p>}
          <div className="ui form">
            <form onSubmit={this.handleSubmit}>
              <div className="signup-form">
                <h1>Sign up</h1>
                  <input
                    type="username"
                    placeholder="Username"
                    className="txtb"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChangeText}
                  />
                <input
                  type="password"
                  placeholder="Password"
                  className="txtb"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChangeText}
                />
                <input
                  type="email"
                  placeholder="email"
                  className="txtb"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChangeText}
                />
                <input type="submit" className="signup-btn" value="Sign up" />
              </div>
            </form>
          </div>
        </body>
      </header>
    )}
}