import { Component } from "react";
import React from 'react'

export default class RandomGenerator extends Component{
    constructor(props) {
        super(props);
        this.state = {
          genre: [],
          user: "",
        };
    }
    
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=99d7e64cf01cf07694e9e01d6680d882&language=en-US")
        .then(resp => resp.json())
        .then(data => this.setState({genre: data.genres}))
    }

    fetchRandomMovie = () => {
        fetch()
    }

    render(){
        return (
            <body>
            <select
            className='dropdown'
            defaultValue='select'
            onChange={()=> console.log('changed dropdown')}
        >
            <option value="select">
              Select a Genre
            </option>
            
            {this.state.genre.map(genre => <option value={genre.id}>{genre.name}</option>)}
        </select>
        <input type="submit" className="" value="Generate Random Movie" onClick={this.fetchRandomMovie}/>
        </body>
        )}
}