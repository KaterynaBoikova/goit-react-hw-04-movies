import React, { Component } from "react";
import fetch from "../../Services/API";
import styles from "./Cast.module.css";
import defaultImage from "./defaultImage.jpeg";
import PropTypes from "prop-types";


class Cast extends Component {
  state = {
    castMembers: [],
  };

  componentDidMount() {
  fetch.fetchCast(this.props.match.params.movieId)
      .then((data) => {
        this.setState({
          castMembers: data.cast,
        });
      });
  }

  render() {
    return (
      <>
        <ul className={styles.castUl}>
          {this.state.castMembers.map((member) => {
            return (
              <li key={member.id} className={styles.castItem}>
                {member.profile_path ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${member.profile_path}`}
                    alt=""
                  />
                ) : (
                  <img src={defaultImage} alt="" />
                )}
                <h4>{member.name}</h4>
                <h5>Playing: {member.character}</h5>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
Cast.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.exact({
      movieId: PropTypes.string.isRequired,
    }),
  }),
};

export default Cast;
