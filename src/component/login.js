import React, { Component }  from 'react';

export default class Login extends React.Component{

    login = () => {
    URL = "http://localhost:3001/api/v1/";
      fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shelter: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
            this.props.setUser(data.user)
            localStorage.setItem("token", data.jwt)
        });
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
                <input type="submit" className="signup-btn" value="Sign up" />
              </div>
            </form>
          </div>
        </body>
      </header>
        )
    }
}