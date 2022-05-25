import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';

import {
  getMovieDetail,
  getMovieVideo,
  getSimilarMovies,
  IMoiveDetail,
  IMovieVideo,
  ISearch,
} from '../API/api';
import { makeImagePath, makeVideoPath } from '../API/utils';
import { MdRecommend } from 'react-icons/md';

// style
const Wrapper = styled.div<{ bgPhoto: string }>`
  min-height: 100vh;
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
  padding: 80px 60px 0 60px;
`;
const Poster = styled.div<{ bgPhoto: string }>`
  width: 30vw;
  height: 85vh;
  margin-right: 5vw;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 20px;
  overflow: hidden;
`;
const Info = styled.div`
  width: 50vw;
`;
const Title = styled.h2`
  font-size: 2vw;
  margin-bottom: 10px;
  span {
    font-size: 1.5vw;
  }

  &:last-of-type {
    font-size: 1.2vw;
    margin: 20px 0 5px 0;
  }
`;
const Infos = styled.p`
  margin-bottom: 10px;
`;
const Overview = styled.p`
  margin-bottom: 30px;
  font-size: 0.8vw;
  font-family: Arial, Helvetica, sans-serif;
`;
const SimilarMovies = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SimilarMovie = styled.div<{ bgPhoto: string }>`
  width: 18%;
  height: 220px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid ${(props) => props.theme.black.lighter};
`;

function MovieDetail() {
  const moviesMatch = useMatch('/movies/:movieId');
  const { data, isLoading } = useQuery<IMoiveDetail>(
    ['movie', moviesMatch?.params.movieId],
    () => getMovieDetail(moviesMatch?.params.movieId)
  );
  const { data: videoData, isLoading: videoLoading } = useQuery<IMovieVideo>(
    ['video', moviesMatch?.params.movieId],
    () => getMovieVideo(moviesMatch?.params.movieId)
  );
  const { data: similarData, isLoading: similarLoading } = useQuery<ISearch>(
    ['similarMovie', moviesMatch?.params.movieId],
    () => getSimilarMovies(moviesMatch?.params.movieId)
  );
  console.log(similarData);

  return (
    <Wrapper bgPhoto={makeImagePath(data?.backdrop_path || '')}>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Container>
            <Poster bgPhoto={makeImagePath(data?.poster_path || '')} />
            <Info>
              <Title>
                {data?.original_title}
                <span> ⭐ {data?.vote_average}</span>
              </Title>
              <Infos>
                {data?.release_date} / {data?.runtime} min
              </Infos>
              <Overview>
                {data?.overview ? data.overview : 'There is no overview😥'}
              </Overview>

              <ReactPlayer
                url={makeVideoPath(videoData?.results[0].key)}
                playing={false}
                loop={true}
                controls={true}
                muted={true}
              ></ReactPlayer>
              <div>
                <Title>Similar Movies 👍</Title>
                <SimilarMovies>
                  {similarData?.results.slice(0, 5).map((i) => {
                    return (
                      <SimilarMovie
                        bgPhoto={makeImagePath(i.poster_path)}
                      ></SimilarMovie>
                    );
                  })}
                </SimilarMovies>
              </div>
            </Info>
          </Container>
        </>
      )}
    </Wrapper>
  );
}

export default MovieDetail;
