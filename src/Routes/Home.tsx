import styled from 'styled-components';
import { useMatch, PathMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';

// icon
import { MdPlayArrow } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { getMovies, IGetMoivesResult } from '../API/api';
import { makeImagePath } from '../API/utils';

// components
import Detail from '../Components/Detail';
import MovieSlider from '../Components/MovieSlider';
import TvSlider from '../Components/tvSlider';

// style
const Wrapper = styled.div`
  background-color: #000;
  padding-bottom: 200px;
  overflow: hidden;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 5vw;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;
const Overview = styled.p`
  width: 35%;
  margin-bottom: 20px;
  font-size: 1vw;
  line-height: 1.5em;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 40px;
    margin-right: 10px;
    font-weight: 600;
    border: none;
    border-radius: 3px;

    &:last-child {
      width: 120px;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.5);
    }
    svg {
      margin-right: 5px;
      font-size: 24px;
    }
  }
`;

// interface
export interface IMovieId {
  movieId: string;
}

function Home() {
  const bigMovieMatch: PathMatch<string> | null = useMatch('info/:movieId');

  // query
  const { data: movieData, isLoading: movieLoading } =
    useQuery<IGetMoivesResult>(['movies', 'nowPlaying'], getMovies);

  // fn

  return (
    <Wrapper>
      {movieLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(movieData?.results[0].backdrop_path || '')}
          >
            <Title>{movieData?.results[0].original_title}</Title>
            <Overview>{movieData?.results[0].overview}</Overview>
            <Buttons>
              <button>
                <MdPlayArrow />
                Play
              </button>
              <button>
                <AiOutlineInfoCircle />
                More Info
              </button>
            </Buttons>
          </Banner>

          <MovieSlider />

          <AnimatePresence>
            {bigMovieMatch ? (
              <Detail
                key={bigMovieMatch?.params.movieId}
                movieId={bigMovieMatch?.params.movieId}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
