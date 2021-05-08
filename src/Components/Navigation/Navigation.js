import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <ul className={styles.nav}>
    <li className={styles.nav_item}>
      <NavLink
        to="/"
        exact
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
      >
        Home
      </NavLink>
    </li>
    <li className={styles.nav_item}>
      <NavLink
        to="/movies"
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;