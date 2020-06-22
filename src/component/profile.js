import React from 'react';

export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movie_objs: {}
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/api/v1/movie_pairs/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    render(){
        console.log(this.props.user.id)
        return (
            <p>test</p>
        )
    }
}