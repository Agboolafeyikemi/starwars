import { useState, useEffect, useRef, SetStateAction } from "react";
import { sortMovieByDate } from "../utils";
import axios from "axios";
interface Selections {
  characters: Object[];
  title: string;
}

interface Character {
  gender: string;
  name: string;
  character?: Object[];
  height: Number;
  release_date?: string;
  title?: string;
}

/**
 * custom hooks to fetch list movie
 * @returns an object of the loading state, error state and sorted movie list
 */
export const useSwapiApi = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [hasError, setErrors] = useState<Boolean>(false);
  const [movies, setMovies] = useState<Character[]>([]);

  async function fetchMovies() {
    setIsLoading(true);
    axios
      .get("https://swapi.dev/api/films/")
      .then((response: { data: { results: Character[] } }) => {
        const sortedList = sortMovieByDate(response.data.results);
        setIsLoading(false);
        setMovies(sortedList);
      })
      .catch((error: SetStateAction<Boolean>) => {
        setErrors(true);
      });
  }

  useEffect(() => {
    fetchMovies();
    return () => {};
  }, []);

  return { isLoading, fetchMovies, setIsLoading, hasError, movies };
};

export const useSelectedMovie = ({ selected }: { selected: Selections }) => {
  const [isLoadingCharacters, setLoadingCharacters] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);
  const [fetchCharacterError, setFetchCharacterError] = useState(false);
  const previousSelections = useRef<Selections[]>([]);

  useEffect(() => {
    const charactersUrl = selected ? selected.characters : [];
    const selectedBefore =
      previousSelections.current.length > 0 &&
      previousSelections.current.find(
        (Prevselected) => Prevselected.title === selected.title
      );

    if (selectedBefore) {
      setCharacters(selectedBefore.characters);
      return;
    }

    if (charactersUrl.length > 0) {
      setLoadingCharacters(true);
      const req = charactersUrl.map((url: any) =>
        axios.get(url).then((response: { data: any }) => {
          return response.data;
        })
      );
      Promise.all(req)
        .then((responses) => {
          setCharacters(responses);

          previousSelections.current.push({
            title: selected.title,
            characters: responses,
          });
          setLoadingCharacters(false);
        })
        .catch((error) => {
          setFetchCharacterError(true);
        });
    }
  }, [selected]);

  return { isLoadingCharacters, fetchCharacterError, characters };
};
