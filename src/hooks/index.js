import { useState, useEffect, useRef } from "react";
import { sortMovieByDate } from "../utils";
import axios from "axios";

/**
 * custom hooks to fetch list movie
 * @returns an object of the loading state, error state and sorted movie list
 */
export const useSwapiApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    setIsLoading(true);

    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        const sortedList = sortMovieByDate(response.data.results);
        setMovies(sortedList);
        setIsLoading(false);
      })
      .catch((error) => setErrors(error));
  }

  useEffect(() => {
    fetchMovies();
  }, [hasError]);

  return { isLoading, setIsLoading, hasError, movies };
};

export const useSelectedMovie = ({ selected }) => {
  const [isLoadingCharacters, setLoadingCharacters] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [fetchCharacterError, setFetchCharacterError] = useState(false);
  const previousSelections = useRef([]);

  const charactersUrl = selected ? selected.characters : [];

  useEffect(() => {
    setLoadingCharacters(true);

    if (charactersUrl.length > 0) {
      const req = charactersUrl.map((url) =>
        axios.get(url).then((response) => {
          return response.data;
        })
      );

      Promise.all(req)
        .then((responses) => {
          setCharacters(responses);
          setLoadingCharacters(false);

          previousSelections.current.push({
            title: selected.title,
            characters: responses,
          });
        })
        .catch((error) => {
          setFetchCharacterError(error);
        });
    }
  }, [charactersUrl, fetchCharacterError, selected]);

  return { isLoadingCharacters, fetchCharacterError, characters };
};
