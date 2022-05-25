import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';

import {
  getMovieDetail,
  getMovieVideo,
  IMoiveDetail,
  IMovieVideo,
} from '../api';
import { makeImagePath, makeVideoPath } from '../utils';
// style
const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  overflow: hidden;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 60px;
`;
const Poster = styled.div<{ bgPhoto: string }>`
  width: 30vw;
  height: 80vh;
  margin-right: 5vw;
  background-image: url(${(props) => props.bgPhoto});
  background-size: contain;
  background-position: center center;
  border-radius: 20px;
  overflow: hidden;
`;
const Info = styled.div`
  width: 45vw;
`;
const Title = styled.h2`
  font-size: 2.5vw;
  margin-bottom: 30px;
`;
const Overview = styled.p`
  margin-bottom: 50px;
  font-size: 1.2vw;
  font-family: Arial, Helvetica, sans-serif;
`;

function Media() {
  const moviesMatch = useMatch('/movies/:movieId');
  const { data, isLoading } = useQuery<IMoiveDetail>(
    ['movie', moviesMatch?.params.movieId],
    () => getMovieDetail(moviesMatch?.params.movieId)
  );
  const { data: videoData, isLoading: videoLoading } = useQuery<IMovieVideo>(
    ['video', moviesMatch?.params.movieId],
    () => getMovieVideo(moviesMatch?.params.movieId)
  );

  return (
    <Wrapper bgPhoto={makeImagePath(data?.backdrop_path || '')}>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Container>
            <Poster bgPhoto={makeImagePath(data?.poster_path || '')} />
            <Info>
              <Title>{data?.original_title}</Title>
              <Overview>
                {data?.overview ? data.overview : 'There is no overview😥'}
              </Overview>
              <p> {data?.release_date}</p>
              <p>{data?.runtime}</p> /{data?.vote_average}
              <ReactPlayer
                url={makeVideoPath(videoData?.results[0].key)}
                playing={true}
                loop={true}
                controls={false}
                muted={true}
              ></ReactPlayer>
            </Info>
          </Container>
        </>
      )}
    </Wrapper>
  );
}

export default Media;
