import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

import { getTv, IGetMoivesResult } from '../api';
import { makeImagePath } from '../utils';

// style
const Div = styled.div`
  padding-top: 80px;
  width: 100vw;
  height: 200vh;
  background-color: #000;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoivesResult>(
    ['tv', 'popular'],
    getTv
  );
  return <Div>TV</Div>;
}

export default Home;
