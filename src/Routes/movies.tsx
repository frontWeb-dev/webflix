import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

// icon
import { MdPlayArrow } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiPlay, BiPlus, BiLike, BiDislike } from 'react-icons/bi';

import { IMovies, upcomingMovies } from '../API/api';
import { makeImagePath } from '../API/utils';

// style
const Wrapper = styled.div`
  padding-bottom: 200px;
  overflow: hidden;
  background-color: #000;
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
const Slider = styled.div`
  position: relative;
  top: -150px;
`;
const Category = styled.h3`
  margin-bottom: 15px;
  padding-left: 60px;
  font-size: 1.5vw;
`;
const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  gap: 10px;
  padding: 0 60px;
`;
const Box = styled(motion.div)`
  height: 260px;
  font-size: 1vw;
  border-radius: 5px;
  overflow: hidden;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Image = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 180px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;
const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  opacity: 0;
  font-size: 0.6vw;
  font-family: Arial, Helvetica, sans-serif;
  background-color: ${(props) => props.theme.black.darker};

  h4 {
    margin-bottom: 5px;
    font-size: 0.8vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span {
    margin-right: 5px;
  }
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  button {
    padding: 0;
    margin-right: 5px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #fff;
  }
  svg {
    padding: 4px;
    font-size: 30px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
`;

// variants
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: 'tween',
      delay: 0.5,
      duration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      delay: 0.5,
      duration: 0.3,
    },
  },
};

// interface
export interface IMovieId {
  movieId: string;
}

const offset = 6; // 한 번에 보여줄 영화 수

function Movies() {
  const { movieId } = useParams();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const history = useNavigate();

  // fn
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;

      const totalMovie = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;

      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history(`${movieId}`);
  };
  const { data, isLoading } = useQuery<IMovies>(
    ['movie', 'movieId'],
    upcomingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].original_title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
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
          <Slider>
            <Category>Upcoming</Category>
            <AnimatePresence onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      layoutId={movie.id + ''}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={BoxVariants}
                      whileHover='hover'
                      initial='normal'
                      transition={{ type: 'tween' }}
                    >
                      <Image bgPhoto={makeImagePath(movie.backdrop_path)} />
                      <Info variants={infoVariants}>
                        <Icons>
                          <button>
                            <BiPlay />
                          </button>
                          <button>
                            <BiPlus />
                          </button>
                          <button>
                            <BiLike />
                          </button>
                          <button>
                            <BiDislike />
                          </button>
                        </Icons>
                        <h4>{movie.original_title}</h4>
                        <p>
                          <span>{movie.release_date}</span>
                          <span> &#47;</span>
                          <span>⭐ {movie.vote_average}</span>
                        </p>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Movies;
