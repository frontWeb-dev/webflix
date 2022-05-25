const API_KEY = '12a42d16c5bda3e29282e2c1b95326af';
const BASE_URL = 'https://api.themoviedb.org/3';

// interface
interface IMovie {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
export interface IGetMoivesResult {
  date: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMoiveDetail {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  production_companies: [
    {
      logo_path: string;
      name: string;
    }
  ];
  original_title: string;
  overview: string;
  vote_average: string;
  runtime: number;
  backdrop_path: string;
  release_date: string;
  poster_path: string;
}

export interface ISearch {
  results: [
    {
      id: number;
      original_title: string;
      backdrop_path: string;
      poster_path: string;
      overview: string;
      vote_average: number;
      title: string;
    }
  ];
  total_results: number;
  total_pages: number;
}

export interface IMovies {
  results: [
    {
      id: number;
      poster_path: string;
      backdrop_path: string;
      overview: string;
      release_date: string;
      original_title: string;
      vote_average: number;
    }
  ];
}

export interface IMovieVideo {
  results: [
    {
      name: string;
      type: string;
      published_at: string;
      key: string;
    }
  ];
}

// tv
export interface ITvOnthAir {
  results: [
    {
      id: number;
      poster_path: string;
      backdrop_path: string;
      vote_average: number;
      overview: string;
      first_air_date: string;
      origin_country: string[];
      original_language: string;
      original_name: string;
    }
  ];
}
export interface ITvDetail {
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  genres: [
    {
      name: string;
    }
  ];
  id: number;
  last_air_date: string;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;

  seasons: [
    {
      air_date: string;
      name: string;
      poster_path: string;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
    }
  ];
  vote_average: number;
}

// -----------------------------------------------------------------------------------

// movie - now playing
export function getMovies() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
// movies - upcoming
export function upcomingMovies() {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
// movies - popular
export function getPopularMovies() {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}
// movie detail
export function getMovieDetail(movieId?: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
// movie video
export function getMovieVideo(movieId: any) {
  return fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
// similar movies
export function getSimilarMovies(movieId: any) {
  return fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
// search movie
export function SearchMovie(keyword: string | null) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}`
  ).then((response) => response.json());
}

// -----------------------------------------------------------------------------------

// tv - on the air
export function getTv() {
  return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}
// tv - detail
export function getTvDetail(tvId: string) {
  return fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}
// search tv
export function SearchTv(keyword: string | null) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&query=${keyword}`
  ).then((response) => response.json());
}
