import React, { useState, useEffect, useRef, useCallback } from "react";

import { useSwapiApi, useSelectedMovie } from "./hooks";
import logo from "./assets/starwars-logo.png";
import "./App.css";

import MovieDropDown from "./components/MovieDropDown";
import FilterableTable from "./components/FilterableTable";
import OpenCrawl from "./components/OpenCrawl";

const App = () => {
  const { isLoading, hasError, movies } = useSwapiApi();
  const selectedMovie = useRef<HTMLDivElement | any>(null);
  const [showOpenCrawl, setShowOpenCrawl] = useState<boolean>(false);

  const { fetchCharacterError, characters } = useSelectedMovie({
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

  const handleMovieSelection = useCallback(
    (e: { target: { value: string } }) => {
      const selectedTitle = e.target.value;
      const movie = movies.find((m: any) => m.title === selectedTitle);
      selectedMovie.current = movie;
      setShowOpenCrawl(true);
    },
    [movies]
  );

  return (
    <>
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
              {characters.length > 0 && (
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
              {characters.length > 0 && <FilterableTable data={characters} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
