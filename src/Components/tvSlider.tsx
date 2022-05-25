import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

// icon

import { BiPlay, BiPlus, BiLike, BiDislike } from 'react-icons/bi';
import { getTv, ITvOnthAir } from '../API/api';
import { makeImagePath } from '../API/utils';

// style
const Slider = styled.div`
  position: relative;
  top: -150px;
  height: 300px;
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
    background-color: transparent;
    cursor: pointer;
    color: #fff;
  }
  svg {
    padding: 4px;
    font-size: 30px;
    border: 1px solid #fff;
    border-radius: 50%;

    &:hover {
      background-color: #fff;
      color: ${(props) => props.theme.black.darker};
    }
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
export interface ItvId {
  tvId: string;
}

const offset = 6; // 한 번에 보여줄 영화 수

function TvSlider() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const history = useNavigate();

  // query
  const { data, isLoading } = useQuery<ITvOnthAir>(['tv', 'onTheAir'], getTv);

  // fn
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;

      const totalTv = data?.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;

      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history(`${tvId}`);
  };

  return (
    <Slider>
      <Category>On The Air</Category>
      <button onClick={() => increaseIndex()}> rr </button>
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
            .map((tv) => (
              <Box
                key={tv.id}
                layoutId={tv.id + ''}
                onClick={() => onBoxClicked(tv.id)}
                variants={BoxVariants}
                whileHover='hover'
                initial='normal'
                transition={{ type: 'tween' }}
              >
                <Image bgPhoto={makeImagePath(tv.backdrop_path || '')} />
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
                  <h4>{tv.original_name}</h4>
                  <p>
                    <span>{tv.first_air_date}</span>
                    <span> &#47;</span>
                    <span>⭐ {tv.vote_average}</span>
                  </p>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
}

export default TvSlider;
