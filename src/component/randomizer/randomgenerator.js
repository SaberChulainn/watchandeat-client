import { Component } from "react";
import React from 'react'
import "../../style/randomgenerator.css"


export default class RandomGenerator extends Component{
    constructor(props) {
        super(props);
        this.state = {
          genre: [],
          genre_id: "1",
          movie_homepage: [],
          food_homepage: []
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

    fetch("http://localhost:3001/api/v1/movies")
    .then(resp => resp.json())
    .then(data => this.setState({movie_homepage: data}))

    fetch("http://localhost:3001/api/v1/foods")
    .then(resp => resp.json())
    .then(data => this.setState({food_homepage: data}))

    }

    fetchRandomMovie = () => {
        let baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=99d7e64cf01cf07694e9e01d6680d882&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
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
            let random = filtered[Math.floor(Math.random() * filtered.length)]
            this.props.setMovie(random)
            this.props.setGenre(this.state.genre)})
            .then(() =>
             this.props.history.push("/results")
            )
    }

    Meetmoop = () => {
        return (
            <>
            <h5 className="intro">Don't know what to watch or eat?</h5>
            <div className="card text-center">
            <div className="card-body">
             <h5 className="card-title-home">Movie & Food</h5>
             <select className="random" onChange={this.handleChange} value={this.state.genre_id}>
             <option value="1">All Genre's</option>
                {this.state.genre.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            </select>
            <input type="submit" className="submit-btn" value="PICK FOR ME" onClick={this.fetchRandomMovie}/>
            </div>
        </div>
            </>
          );
    }

    render(){
        return (
            <div>
            {this.Meetmoop()}
            <h2 className="header-food">Trending Movies</h2>
            <div className="row home-page">
            {this.state.movie_homepage.map((movie) => {
            let url = `https://image.tmdb.org/t/p/w200/${movie.picture}`
            return (
                <>
                <div className="column-homepage">
                <img src={url} alt={movie.id} className="homepage"/>
                <p className="homepage-name">{movie.name}</p>
                </div>
                </>
            )
            })}
            </div>
            <h2 className="header-food">Favorite Food</h2>
            <div className="row home-page">
            {this.state.food_homepage.map((food) => {
            return (
                <>
                <div className="column-homepage">
                <img src={food.food_image} alt={food.id} className="homepage"/>
                <p className="homepage-name">{food.name}</p>
                </div>
                </>
            )
            })}
            </div>
            </div>

        )}
}