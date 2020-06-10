import { Component } from "react";
import React from 'react'

export default class RandomGenerator extends Component{
    constructor(props) {
        super(props);
        this.state = {
          genre: [],
          genre_id: "1",
        };
    }

    handleChange = (e) => {
        this.setState({
          genre_id: e.target.value
        })
      }
    
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=99d7e64cf01cf07694e9e01d6680d882&language=en-US")
        .then(resp => resp.json())
        .then(data => this.setState({genre: data.genres}))

    }

    fetchRandomMovie = () => {
        let baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=99d7e64cf01cf07694e9e01d6680d882&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1"
        if (this.state.genre_id !== "1"){
            baseURL = baseURL + "&with_genres=" + this.state.genre_id + "&with_original_language=en" + "&primary_release_date.gte=2000-01-01&release_date.lte=2020-05-05";
        }
        fetch(baseURL)
        .then(resp => resp.json())
        .then(data => {
           // console.log(data.results)
            let filtered = data.results.filter(movie =>{
                return movie.poster_path !== null

            })
            console.log(filtered)
            let random = filtered[Math.floor(Math.random() * filtered.length)]
            this.props.setMovie(random)})
            .then(() =>
             this.props.history.push("/results")
            )
    }

    render(){
        return (
            <div>
            <select id="random" onChange={this.handleChange} value={this.state.genre_id}>
            {this.state.genre.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            <option value="1">None</option>
            </select>
            <input type="submit" className="" value="Generate Random Movie" onClick={this.fetchRandomMovie}/>
        </div>
        )}
}