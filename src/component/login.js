import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super();
        this.state = {
            username: "",
            password: "",
            error: false,
        }
    }
    handleChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

    handleSubmit = (e) => {
    e.preventDefault()
    const URL = "http://localhost:3001/api/v1/login";
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password_digest: this.state.password,
          },
        }),
      })
        .then((resp) => resp.json())
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

    render(){
        return(
        <header className="Login">
        <body>
          {this.state.error && <p>Error in Login</p>}
          <div className="ui form">
            <form onSubmit={this.handleSubmit}>
              <div className="login-form">
                <h1>Login</h1>
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
                <input type="submit" className="signup-btn" value="Login" />
              </div>
            </form>
          </div>
        </body>
      </header>
        )
    }
}