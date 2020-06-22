import React from "react";
import '../style/results.css'


export default class Results extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        foodName: "",
        foodLink: "false",
        foodPicture: "",
        food_id: {},
        movie_id: {},
        alreadySaved: "false",
        }
    }

    postPair = () => {
        console.log(this.state.food_id.id)
        if(this.state.alreadySaved === "false")
        fetch("http://localhost:3001/api/v1/movie_pairs", {
              method: "POST",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                movie_pairs: {
                      movie_id: this.state.movie_id.id,
                      food_id: this.state.food_id.id,
                      user_id:  this.props.user.id
                  },
              }),
          })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.alreadySaved !== true){
        fetch("http://localhost:3001/api/v1/foods", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              foods: {
                name: this.state.foodName,
                link: this.state.foodLink,
                food_image: this.state.foodPicture
              },
            }),
          }).then(resp => resp.json())
          .then(data => 
            fetch("http://localhost:3001/api/v1/movie_pairs", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                  movie_pairs: {
                        movie_id: this.state.movie_id.id,
                        food_id: data.id,
                        user_id:  this.props.user.id
                    },
                }),
            }))
            this.setState({alreadySaved: true})
            } else {
                return (<h5>This pair has been saved already!</h5>)
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
                picture: this.props.movie.poster_path
              },
            }),
          }).then(resp => resp.json())
          .then(data => this.setState({movie_id: data}))
    }

    foodRecipe = () => {
        return (
        <div>
        <a href={this.state.foodLink}>Go to recipe!</a>
        </div>)
    }

    

    render(){
        const hasLink = this.state.foodLink
        let url = `https://image.tmdb.org/t/p/w200/${this.props.movie.poster_path}`
    return (
        <div className="card result-text-center">
        <div className="card-body">
        <button className="redirect">Pick Again?</button>
        <button className="save"><img src="save.png" alt="save" onClick={this.handleSubmit}/></button>
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
                        {hasLink !== "false" ? this.foodRecipe() : <p>No Food recipe linked to database yet</p>}
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
    }
}