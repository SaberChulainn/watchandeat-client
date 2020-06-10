import React from "react";
import '../style/results.css'


export default class Results extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        foodName: "",
        foodLink: "",
        foodPicture: "",
        food_id: {},
        movie_id: {},
    }
    }

    componentDidMount(){
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(resp => resp.json())
        .then(data => {
            this.setState({foodName: data.meals[0].strMeal})
            this.setState({foodLink: data.meals[0].strSource})
            this.setState({foodPicture: data.meals[0].strMealThumb})
        })

        fetch("http://localhost:3001/api/v1/foods", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              foods: {
                name: this.state.foodName,
                link: this.state.foodLink,
                food_image: this.state.foodPicture,
              },
            }),
          })

        URL = "http://localhost:3001/api/v1/movies"
        fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movies: {
                name: this.props.movie.title,
                description: this.props.movie.overview,
                release_date: this.props.movie.release_date,
                genre: this.props.movie.genre_ids
              },
            }),
          })
    }

    render(){
        let url = `https://image.tmdb.org/t/p/w200/${this.props.movie.poster_path}`
    return (
        <div className="container">
        <div className="card">
            <div className="row no-gutters">
                <div className="col-auto">
                    <img src={url} className="movie-img" alt=""/>
                </div>
                <div className="col">
                    <div className="card-block px-2">
                        <h4 className="card-title">{this.props.movie.title}</h4>
                        <p className="card-text">{this.props.movie.overview}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer w-100 text-muted">
                Relased in {this.props.movie.release_date}
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="row no-gutters">
                <div className="col-auto">
                    <img src={this.state.foodPicture} className="movie-img" alt=""/>
                </div>
                <div className="col">
                    <div className="card-block px-2">
                        <h4 className="card-title">{this.state.foodName}</h4>
                        <p className="card-text">{this.state.foodLink}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer w-100 text-muted">
                gimme yo lunch money
            </div>
        </div>
    </div>
    )
    }
}