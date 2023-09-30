import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  function fetchMoviewsHandler() {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tranformedData = data["results"].map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date,
          };
        });
        setMovies(tranformedData);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviewsHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
