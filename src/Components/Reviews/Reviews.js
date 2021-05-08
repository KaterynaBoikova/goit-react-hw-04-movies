import React, { Component } from "react";
import fetch from "../../Services/API";
import PropTypes from "prop-types";
import styles from "./Reviews.module.css";


class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    fetch.fetchReviews(this.props.match.params.movieId)
      .then((results) => {
        this.setState({
          reviews: results,
        });
      });
  }

  render() {
    return (
      <>
        {this.state.reviews.length > 0 ? (
          <ul className={styles.revUL}>
            {this.state.reviews.map((review) => {
              return (
                <li key={review.id} className={styles.revItem}>
                  <h4>Author: {review.author}</h4>
                  <p>Dated: {review.created_at.slice(0, 10)}</p>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No Reviews Available</p>
        )}
      </>
    );
  }
}
Reviews.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};
export default Reviews;
