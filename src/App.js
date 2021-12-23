import React, { useState, useEffect, useRef } from "react";
import { useSwapiApi, useSelectedMovie } from "./hooks";
import logo from "./assets/starwars-logo.png";
import "./App.css";

import MovieDropDown from "./components/MovieDropDown";
import FilterableTable from "./components/FilterableTable";
import OpenCrawl from "./components/OpenCrawl";

function App() {
  const { isLoading, hasError, movies } = useSwapiApi();
  const selectedMovie = useRef(null);
  const [showOpenCrawl, setShowOpenCrawl] = useState(false);

  const { isLoadingCharacters, fetchCharacterError, characters } =
    useSelectedMovie({
      selected: selectedMovie.current ? selectedMovie.current : null,
    });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedMovie.current) {
        setShowOpenCrawl(false);
      }
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [characters, showOpenCrawl]);

  const handleMovieSelection = (e) => {
    const selectedTitle = e.target.value;
    const movie = movies.find((m) => m.title === selectedTitle);
    selectedMovie.current = movie;
    setShowOpenCrawl(true);
  };

  return (
    <div className="wrapper">
      <div className="main">
        {(hasError || fetchCharacterError) && (
          <div id="error">Something went wrong. Kindly refresh the page </div>
        )}
        {showOpenCrawl ? (
          <OpenCrawl data={selectedMovie} />
        ) : (
          <>
            <img id="logo" src={logo} alt="Star Wars logo" />
            {!isLoadingCharacters && (
              <button id="playCrawl" onClick={() => setShowOpenCrawl(true)}>
                Play Crawl
              </button>
            )}

            <MovieDropDown
              isLoading={isLoading}
              onChange={handleMovieSelection}
              data={movies}
              value={
                selectedMovie.current ? selectedMovie.current.title : "Select"
              }
            />

            {!isLoadingCharacters && <FilterableTable data={characters} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
