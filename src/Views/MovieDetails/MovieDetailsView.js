import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import fetch from "../../Services/API";
import Cast from "../../Components/Cast/Cast";
import Reviews from "../../Components/Reviews/Reviews";
import styles from "./MovieDetailsView.module.css";
import PropTypes from "prop-types";



class MovieDetailsPage extends Component {
  state = {
    movieID: null,
    title: "",
    poster: "",
    genres: [],
    overview: "",
    votes: null,
  };

  componentDidMount() {
    fetch.fetchMovieDetails(this.props.match.params.movieId)
      .then((data) => {
        this.setState({
          movieID: this.props.match.params.movieId,
          title: data.title,
          poster: `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`,
          genres: data.genres.map((genre) => genre.name + " "),
          overview: data.overview,
          votes: data.vote_average,
        });
      });
  }
  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || "/");
  };

  render() {
    return (
      <>
        <button
          type="button"
          onClick={this.handleGoBack}
          className={styles.goBack}
        >
          Go Back
        </button>

        <div className={styles.wrap}>
          <div className={styles.posterDiv}>
            <img src={this.state.poster} alt={this.state.title} />
          </div>
          <div className={styles.dataDiv}>
            <h2>{this.state.title}</h2>
            <p>User Votes: {this.state.votes}</p>
            <h3>Overview</h3>
            <p>{this.state.overview}</p>
            <h3>Genres</h3>
            <p>{this.state.genres}</p>
          </div>
        </div>

        <div className={styles.addInfo}>
          <h3 className={styles.addInfoP}>Additional Information</h3>
          <ul className={styles.listPages}>
            <li key="Cast" className={styles.itemPages}>
              <NavLink
                className={styles.linkPages}
                to={{
                  pathname: `${this.props.match.url}/cast`,
                  state: {
                    from: this.props.location.state.from,
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li key="Reviews" className={styles.itemPages}>
              <NavLink
                className={styles.linkPages}
                to={{
                  pathname: `${this.props.match.url}/reviews`,
                  state: {
                    from: this.props.location.state.from,
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>

        <Route
          path={`${this.props.match.path}/cast`}
          render={(props) => <Cast {...props} />}
        />
        <Route
          path={`${this.props.match.path}/reviews`}
          render={(props) => <Reviews {...props} />}
        />
      </>
    );
  }
}
MovieDetailsPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};
export default MovieDetailsPage;
