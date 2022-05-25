import { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';

// style
const Top = styled(motion.header)`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;
const Nav = styled.nav`
  width: 1800px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 110px;
  fill: ${(props) => props.theme.red};
  stroke-width: 4px;
  stroke: #fff;
`;
const Menus = styled.ul`
  display: flex;
  align-items: center;
`;
const Menu = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -8px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.red};
`;
const Search = styled(motion.form)`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 190px;
    width: 25px;
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  width: 230px;
  padding: 10px 10px 10px 50px;
  transform-origin: right center;
  outline: none;
  color: ${(props) => props.theme.white.darker};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.darker};
`;

// variants
const logoVariants = {
  normal: { fillOpacity: 1 },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
const navVariants = {
  up: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  scroll: { backgroundColor: 'rgba(0, 0, 0, 1)' },
};

// interface
interface IForm {
  keyword: string;
}
function Header() {
  const history = useNavigate();
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('tv');
  const moviesMatch = useMatch('movies');

  const { scrollY } = useViewportScroll();
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start('scroll');
      } else {
        navAnimation.start('up');
      }
    });
  }, [scrollY]);

  const { register, handleSubmit } = useForm<IForm>();
  const onVaild = (data: IForm) => {
    history(`/search?keyword=${data.keyword}`);
  };
  return (
    <Top variants={navVariants} animate={navAnimation} initial='up'>
      <Nav>
        <Col>
          <Logo
            variants={logoVariants}
            animate='normal'
            whileHover='active'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            viewBox='0 0 1024 276'
          >
            <path d='M108.4,120.3c-5.3,45.2-10.5,90.5-15.6,135.7c-19.2,3-38.3,6.2-57.5,9.5C25.3,178.1,15.5,90.8,5.7,3.5 c13.7,0,27.3-0.1,41-0.1C54,70.8,61.4,138.2,68.9,205.6C75.6,138.1,82.5,70.7,89.5,3.3c13.5,0,27,0,40.6-0.1 c6.8,64.7,13.6,129.5,20.4,194.2c7.4-64.8,14.9-129.5,22.4-194.2c12.2,0,24.5,0,36.7,0c-10.4,80.3-20.6,160.6-30.7,241 c-18.6,2.3-37.2,4.7-55.8,7.3C118.3,207.7,113.3,164,108.4,120.3z M272.5,100.6c19.3-0.7,38.6-1.3,57.9-1.9c0,10.8-0.1,21.6-0.1,32.4c-19.3,0.7-38.6,1.6-57.9,2.5 c-0.1,22.6-0.2,45.2-0.2,67.8c24.3-1.8,48.6-3.3,72.9-4.6c0,10.8-0.1,21.5-0.1,32.3c-38.4,2.4-76.8,5.5-115.1,9.3 c0.3-78.4,0.6-156.9,0.8-235.3c38.3,0,76.6-0.1,114.8-0.1c0,10.8-0.1,21.5-0.1,32.3c-24.3,0.2-48.5,0.5-72.8,0.8 C272.7,57.6,272.6,79.1,272.5,100.6z M497.6,53.9c0,3.2,0,4.7,0,7.9c0.3,19.7-8,37.4-27.2,44.7c21.8,6.5,31.7,25.6,31.4,47.3c0,7.2,0,10.8,0,18 c0.3,37-30.7,53.2-64.2,53.4c-22.2,0.6-44.3,1.4-66.5,2.5c0.2-74.9,0.4-149.8,0.5-224.7c21.2,0,42.4,0,63.5,0 C468.9,2.3,497.9,16.8,497.6,53.9z M413.7,34.8c0,19.6-0.1,39.3-0.1,58.9c6.6-0.1,9.9-0.1,16.5-0.2c14.7,0,25.9-7.7,25.3-23.7 c0-4.9,0-7.4,0-12.4c1.3-13.8-8-22.9-21.4-22.7C425.9,34.8,421.8,34.8,413.7,34.8z M413.5,125.6c0,22.8-0.1,45.7-0.1,68.5 c9.7-0.3,14.5-0.4,24.2-0.6c13.1-0.1,23.3-8.2,21.9-22.3c0-7.7,0-11.6,0-19.3c0.6-18.2-9.3-27.4-27.2-26.6 C424.8,125.4,421,125.5,413.5,125.6z M569.3,101.7c18.2,0.2,36.3,0.5,54.5,0.8c0,10.7,0,21.3,0.1,32c-18.2-0.4-36.3-0.8-54.5-1.1 c0,30.6,0.1,61.1,0.1,91.7c-14.1-0.3-28.2-0.5-42.3-0.7c0-73.8-0.1-147.7-0.1-221.5c37.1,0,74.3,0,111.4,0 c0,10.7,0.1,21.4,0.1,32.1c-23.1-0.2-46.2-0.3-69.3-0.4C569.2,57,569.2,79.4,569.3,101.7z M658.7,3c14,0,28.1,0,42.1,0c0.2,65.3,0.4,130.5,0.6,195.8c23.1,1.5,46.3,3.2,69.4,5.1 c0,11.2,0.1,22.3,0.1,33.5c-37.2-3.6-74.4-6.4-111.6-8.6C659.1,153.5,658.9,78.3,658.7,3z M788.5,3.1c14,0,28.1,0,42.1,0.1c0.3,80.3,0.6,160.5,0.8,240.8c-14-1.7-28-3.2-42.1-4.8 C789,160.5,788.8,81.8,788.5,3.1z M1001.7,3.5c-14.3,42-28.9,83.9-43.8,125.7c16.1,47,31.8,94.2,46.9,141.5c-14.7-2.7-29.4-5.3-44.1-7.9 c-11.3-35.4-22.8-70.8-34.5-106.1c-11.3,31.8-22.8,63.6-34.5,95.2c-13.1-1.9-26.2-3.7-39.3-5.4c15.8-40.6,31.4-81.2,46.6-122 c-14.5-40.6-29.3-81-44.3-121.4c14.5,0,29.1,0,43.6,0.1c10.8,31.2,21.5,62.5,32,93.9C941.2,66,952,34.7,962.6,3.4 C975.7,3.4,988.7,3.5,1001.7,3.5z' />
          </Logo>
          <Menus>
            <Menu>
              <Link to='/'>
                Home
                {homeMatch && <Circle layoutId='circle' />}
              </Link>
            </Menu>
            <Menu>
              <Link to='Tv'>
                TV Shows
                {tvMatch && <Circle layoutId='circle' />}
              </Link>
            </Menu>
            <Menu>
              <Link to='movies'>
                Movies
                {moviesMatch && <Circle layoutId='circle' />}
              </Link>
            </Menu>
          </Menus>
        </Col>
        <Col>
          <Search onSubmit={handleSubmit(onVaild)}>
            <motion.svg
              onClick={toggleSearch}
              animate={{ x: searchOpen ? -180 : 0 }}
              transition={{ type: 'linear' }}
              fill='currentColor'
              viewBox='0 0 512 512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'></path>
            </motion.svg>
            <Input
              {...register('keyword', { required: true, minLength: 2 })}
              animate={inputAnimation}
              initial={{ scaleX: 0 }}
              transition={{ type: 'linear' }}
              placeholder='Search for movie or tv show...'
            />
          </Search>
        </Col>
      </Nav>
    </Top>
  );
}

export default Header;
