import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Movie from '../Components/Movie';
import { ISearch, SearchTv, SearchMovie } from '../api';
import { makeImagePath } from '../utils';

// style
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #000;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  position: relative;
  padding: 100px 60px;
`;
const Title = styled.h2`
  font-size: 1.3vw;
  margin-bottom: 20px;
`;
const SearchList = styled.ul`
  margin-bottom: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  li {
    margin: 0 10px 10px 0;
  }
`;
const Image = styled.div<{ bgPhoto: string }>`
  width: 200px;
  height: 250px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;
const Info = styled.div`
  width: 80%;
`;
function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data: MovieData, isLoading: MovieLoading } = useQuery<ISearch>(
    ['movie', keyword],
    () => SearchMovie(keyword)
  );
  const { data: TvData, isLoading: TvLoading } = useQuery<ISearch>(
    ['tv', keyword],
    () => SearchTv(keyword)
  );

  return (
    <>
      <Wrapper>
        {MovieLoading ? (
          <Loader>Loading ... </Loader>
        ) : (
          <Container>
            <Title>'{keyword}' 검색 결과 - Movies</Title>
            <SearchList>
              {MovieData?.results.map((movie) => {
                if (movie.poster_path) {
                  return (
                    <Link to={`/movies/${movie.id}`}>
                      <li>
                        <Image
                          bgPhoto={makeImagePath(movie.poster_path || '')}
                        ></Image>
                      </li>
                    </Link>
                  );
                }
              })}
            </SearchList>
            {TvLoading ? (
              <Loader>Loading ... </Loader>
            ) : (
              <>
                <Title>'{keyword}' 검색 결과 - TV</Title>
                <SearchList>
                  {TvData?.results.map((tv) => {
                    if (tv.poster_path) {
                      return (
                        <Link to={`/tv/${tv.id}`}>
                          <li>
                            <Image
                              bgPhoto={makeImagePath(tv.poster_path || '')}
                            ></Image>
                          </li>
                        </Link>
                      );
                    }
                  })}
                </SearchList>
              </>
            )}
          </Container>
        )}
      </Wrapper>
    </>
  );
}

export default Search;
