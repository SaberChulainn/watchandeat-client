import React from 'react';

export default class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        fetch("http://localhost:3001/api/v1/profile")
        .then(resp => resp.json)
        .then(data => this.setState({user: data}))
    }

    render(){
        console.log(this.state.user)
        return (
            <p>fuck you</p>
        )
    }
}