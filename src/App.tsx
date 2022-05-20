import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { hover } from '@testing-library/user-event/dist/hover';

// style
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  width: 40vw;
  gap: 20px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled(motion.div)`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled(motion.button)`
  padding: 8px 20px;
  font-weight: 600;
  font-size: 18px;
  color: rgb(255, 136, 0);
  background-color: #fff;
  border: none;
  border-radius: 30px;
`;
const overlay = {
  start: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  end: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

const btnHover = {
  hover: {
    color: 'rgb(44, 98, 236)',
  },
};
function App() {
  const [id, setId] = useState<null | string>(null);
  const [click, setClick] = useState(false);
  const toggle = () => setClick((prev) => !prev);
  return (
    <>
      <Wrapper>
        <Grid>
          {/* {['1', '2', '3', '4'].map((n) => (
            <Box onClick={() => setId(n)} key={n} layoutId={n}></Box>
          ))} */}

          <Box
            onClick={() => setId('1')}
            layoutId='1'
            whileHover={{ scale: 1.1, transformOrigin: 'right bottom' }}
          />
          <Box
            onClick={() => setId('2')}
            layoutId='2'
            whileHover={{ scale: 1.1, transformOrigin: 'left bottom' }}
          >
            {!click ? <Circle layoutId='circle' /> : null}
          </Box>
          <Box
            onClick={() => setId('3')}
            layoutId='3'
            whileHover={{ scale: 1.1, transformOrigin: 'right top' }}
          >
            {click ? <Circle layoutId='circle' /> : null}
          </Box>
          <Box
            onClick={() => setId('4')}
            layoutId='4'
            whileHover={{ scale: 1.1, transformOrigin: 'left top' }}
          />
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              variants={overlay}
              initial='start'
              animate='end'
              exit='exit'
            >
              <Box
                layoutId={id}
                style={{ width: 300, height: 300, backgroundColor: '#fff' }}
              />
            </Overlay>
          ) : null}
        </AnimatePresence>
        <Button onClick={toggle} variants={btnHover} whileHover='hover'>
          Switch
        </Button>
      </Wrapper>
    </>
  );
}

export default App;
