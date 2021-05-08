import React, { Component } from "react";
import fetch from "../../Services/API";
import styles from "./MoviesView.module.css";
import queryString from "query-string";
import MovieList from "../../Components/MovieList/MovieList";


const getQuery = (props) => queryString.parse(props.location.search).query;

class Movies extends Component {
  state = {
    searchQuery: "",
    moviesFound: [],
  };

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.currentTarget.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${this.state.searchQuery}`,
    });
    this.setState({ searchQuery: "" });
  };

  componentDidMount() {
    const query = getQuery(this.props);
    if (query) {
      fetch.fetchSearchedMovies(query).then((results) => {
        this.setState({ moviesFound: results });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevQuery = getQuery(prevProps);
    const nextQuery = getQuery(this.props);
    if (prevQuery !== nextQuery) {
      if(nextQuery===undefined){
        this.setState({ moviesFound: [] })
        return;}
      fetch.fetchSearchedMovies(nextQuery).then((results) => {
        this.setState({ moviesFound: results });
      });
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.onFormSubmit} className={styles.form}>
          <input
            name="search"
            value={this.state.searchQuery}
            onChange={this.onInputChange}
            type="search"
            placeholder="Search"
            aria-label="Search"
            className={styles.inputSearch}
            required
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
        <MovieList movieData={this.state.moviesFound} historyLocation={this.props.location}/>
      </>
    );
  }
}
export default Movies;
