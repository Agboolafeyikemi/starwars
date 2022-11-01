import { useState, useEffect, useRef, SetStateAction } from "react";
import { sortMovieByDate } from "../utils";
import axios from "axios";

/**
 * custom hooks to fetch list movie
 * @returns an object of the loading state, error state and sorted movie list
 */
export const useSwapiApi = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [hasError, setErrors] = useState<Boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);

  async function fetchMovies() {
    setIsLoading(true);
    axios
      .get("https://swapi.dev/api/films/")
      .then((response: { data: { results: any[] } }) => {
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
  }, [hasError]);

  return { isLoading, fetchMovies, setIsLoading, hasError, movies };
};

type SelectionsObject = [
  {
    characters: Object[];
    title: String;
  }
];
interface Selections {
  characters: Object[];
  title: string;
}

interface Character {
  gender: string;
  name: string;
  character?: Object[];
  height: Number;
}

export const useSelectedMovie = ({ selected }: { selected: Selections }) => {
  const [isLoadingCharacters, setLoadingCharacters] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);
  const [fetchCharacterError, setFetchCharacterError] = useState(false);
  const previousSelections = useRef<SelectionsObject | Selections[]>([]);

  useEffect(() => {
    const charactersUrl = selected ? selected.characters : [];
    const isPrevSelection =
      previousSelections.current.length > 0 &&
      previousSelections.current.find(
        (Prevselected) => Prevselected.title === selected.title
      );

    if (isPrevSelection) {
      setCharacters(isPrevSelection.characters);
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
  }, [fetchCharacterError, selected]);

  return { isLoadingCharacters, fetchCharacterError, characters };
};
