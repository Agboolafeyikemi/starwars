import { useSwapiApi, useSelectedMovie } from "./index";
import { act } from "react-test-renderer";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "whatwg-fetch";
import fetchMock from "fetch-mock";

describe("useSwapiApi Hook", () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  test("useSwapiApi initial state", async () => {
    const mock = new MockAdapter(axios);

    mock.onGet().reply(200);

    const { result } = renderHook(() => useSwapiApi());

    expect(result.current.movies).toEqual([]);
    expect(result.current.isLoading).toBeTruthy();
  });

  test("useSwapiApi performs GET request and success state", async () => {
    const { result } = renderHook(() => useSwapiApi());

    expect(result.current.movies).toEqual([]);

    act(() => {
      result.current.fetchMovies();
    });

    expect(result.current.isLoading).not.toBeFalsy();
    expect(result.current).toBeInstanceOf(Object);
    expect(result.current.error).toBeFalsy();
  });

  test("check if after unmount and rerender hook, value is default", async () => {
    const { result, unmount, rerender, waitFor } = renderHook(() =>
      useSwapiApi()
    );
    expect(result.current).toMatchObject({
      fetchMovies: result.current.fetchMovies,
      hasError: false,
      isLoading: true,
      movies: [],
      setIsLoading: result.current.setIsLoading,
    });

    unmount();
    rerender(true);
    await waitFor(() => {
      expect(result.current).toStrictEqual({
        fetchMovies: result.current.fetchMovies,
        hasError: false,
        isLoading: true,
        movies: expect.any(Array),
        setIsLoading: result.current.setIsLoading,
      });
    });
  });

  test("useSwapiApi should return error as true if api error", async () => {
    const { result } = renderHook(() => useSwapiApi());

    fetchMock.mock("", 500);

    await act(async () => {
      result.current.fetchMovies();
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.hasError).toBe(true);
  });
});

describe("useSelectedMovie Hook", () => {
  test("useSelectedMovie initial state", async () => {
    const mock = new MockAdapter(axios);

    mock.onGet().reply(200);

    const { result } = renderHook(() =>
      useSelectedMovie({
        title: "Return of the Jedi",
        episode_id: 6,
        opening_crawl:
          "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
        director: "Richard Marquand",
        producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
        release_date: "1983-05-25",
        characters: ["https://swapi.dev/api/people/1/"],
        url: "https://swapi.dev/api/films/3/",
      })
    );

    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoadingCharacters).not.toBeTruthy();
  });

  test("useSwapiApi should return error as true if api error", async () => {
    const { result } = renderHook(() =>
      useSelectedMovie({
        title: "Return of the Jedi",
        episode_id: 6,
        opening_crawl:
          "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
        director: "Richard Marquand",
        producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
        release_date: "1983-05-25",
        characters: ["https://swapi.dev/api/people/1/"],
        url: "https://swapi.dev/api/films/3/",
      })
    );

    fetchMock.mock(
      {
        title: "Return of the Jedi",
        episode_id: 6,
        opening_crawl:
          "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
        director: "Richard Marquand",
        producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
        release_date: "1983-05-25",
        characters: ["https://swapi.dev/api/people/1/"],
        url: "https://swapi.dev/api/films/j/",
      },
      500
    );

    expect(result.current.characters).toEqual([]);
    expect(result.current.fetchCharacterError).toBe(false);
  });

  test("useSelectedMovie performs GET request and success state", async () => {
    const { result } = renderHook(() =>
      useSelectedMovie({
        title: "Return of the Jedi",
        episode_id: 6,
        opening_crawl:
          "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
        director: "Richard Marquand",
        producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
        release_date: "1983-05-25",
        characters: ["https://swapi.dev/api/people/1/"],
        url: "https://swapi.dev/api/films/3/",
      })
    );
    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoadingCharacters).toBeFalsy();
    expect(result.current).toBeInstanceOf(Object);
    expect(result.current.fetchCharacterError).toBeFalsy();
  });
});
