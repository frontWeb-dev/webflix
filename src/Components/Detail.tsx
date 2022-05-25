import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, useViewportScroll } from 'framer-motion';

// icon

import { BiPlay, BiPlus, BiLike, BiDislike } from 'react-icons/bi';

import { getMovieDetail, IMoiveDetail } from '../API/api';
import { makeImagePath } from '../API/utils';

// style
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const MovieInfo = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 32vw;
  min-height: 65vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  overflow: hidden;
`;
const Image = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 300px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: top center;
`;
const Info = styled.div`
  width: 100%;
  padding: 0 30px;
  font-family: Arial, Helvetica, sans-serif;

  p {
    margin-bottom: 5px;
    font-size: 0.9vw;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.8vw;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

  span {
    font-size: 1vw;
  }
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  button {
    padding: 0;
    margin-right: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #fff;
  }
  svg {
    padding: 5px;
    font-size: 35px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
`;
const Overview = styled.div`
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px dotted ${(props) => props.theme.white.darker};
  border-bottom: 1px dotted ${(props) => props.theme.white.darker};
  p {
    display: -webkit-box;

    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
const GenreList = styled.ul`
  margin-top: 10px;
  display: flex;
  align-items: center;
  list-style: none;

  li {
    margin-right: 10px;
    font-size: 0.9vw;
  }
`;

function Movie({ movieId }: any) {
  const history = useNavigate();
  const onOverlayClicked = () => history('/');

  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IMoiveDetail>(['movie', movieId], () =>
    getMovieDetail(movieId)
  );

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overlay
            onClick={onOverlayClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></Overlay>
          <MovieInfo style={{ top: scrollY.get() + 100 }} layoutId={movieId}>
            <Image bgPhoto={makeImagePath(data?.backdrop_path || '')} />
            <Info>
              <Container>
                <Title>
                  {data?.original_title}
                  <span> ⭐ {data?.vote_average}</span>
                </Title>
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
              </Container>
              <p>Release {data?.release_date} </p>
              <p>Runtime {data?.runtime} min</p>
              <Overview>
                <p>
                  {data?.overview
                    ? data?.overview
                    : 'There is no overview 😥..'}
                </p>
              </Overview>

              <GenreList>
                {data?.genres.map((i) => (
                  <li>{i.name}</li>
                ))}
              </GenreList>
            </Info>
          </MovieInfo>
        </>
      )}
    </>
  );
}

export default Movie;
