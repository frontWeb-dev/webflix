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
}

// function
export function getMovies() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTv() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

// id: 752623;
// original_title: 'The Lost City';
// overview: '전설의 트레저를 차지하기 위해 재벌 페어팩스(다니엘 래드클리프)는  유일한 단서를 알고 있는 베스트셀러 작가 로레타(산드라 블록)를 납치하게 된다.  어쩔 수 없는 비지니스 관계로 사라진 그녀를 찾아야만 하는 책 커버모델 앨런(채닝 테이텀)은  의문의 파트너(브래드 피트)와 함께 위험한 섬에서 그녀를 구하고 무사히 탈출해야만 하는데…  적과 자연의 위험이 도사리는 일촉즉발 화산섬.';
// backdrop_path: '/A3bsT0m1um6tvcmlIGxBwx9eAxn.jpg';
// poster_path: '/8kZapNBZYGJu7AUbJVBDMmQgO1D.jpg';
// release_date: '2022-03-24';
// vote_average: 6.8;
