import React, { Component } from "react";
import MovieList from "../../Components/MovieList/MovieList";
import fetch from '../../Services/API';


class HomePage extends Component {
  state = {
    trendingMovies: [],
  };

  componentDidMount() {
    fetch.fetchTrending()
      .then((results) => {
        this.setState({
          trendingMovies: results,
        });
      });
  }

  render() {
    return (
        <MovieList movieData={this.state.trendingMovies} historyLocation={this.props.location}/>
    );
  }
}
export default HomePage;
