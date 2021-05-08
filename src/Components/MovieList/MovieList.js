import React from 'react';
import {Link} from 'react-router-dom';
import styles from './MovieList.module.css';
import PropTypes from "prop-types";

const MovieList=({movieData, historyLocation})=>{
  return  <ul className={styles.homeList}>
        {movieData.map((movie) => {
            return (
                movie.title && (
                    <li key={movie.id} className={styles.homeListItem}>
                        <Link
                            to={{
                                pathname: `/movies/${movie.id}`,
                                state: {
                                    from: historyLocation,
                                },
                            }}
                            className={styles.homeLinks}
                        >
                            {movie.title}
                        </Link>
                    </li>
                )
            );
        })}
    </ul>
}
MovieList.propTypes={
  historyLocation: PropTypes.object,
  movieData: PropTypes.arrayOf(PropTypes.shape(
      {
        id: PropTypes.number,
        title: PropTypes.string,
      }
  ))
}
export default MovieList;
