import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() =>
  import("./Views/HomePage/HomePageView" /* webpackChunkName: "homepage" */)
);
const Movies = lazy(() =>
  import("./Views/Movies/MoviesView" /* webpackChunkName: "movies" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./Views/MovieDetails/MovieDetailsView" /* webpackChunkName: "moviedetails" */
  )
);

const App = () => (
  <div>
    <Navigation />
    <Suspense
      fallback={
        <Loader
          type="ThreeDots"
          color="darkred"
          height={130}
          width={130}
          style={{
            textAlign: "center",
          }}
        />
      }
    >
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={Movies} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </div>
);

export default App;
