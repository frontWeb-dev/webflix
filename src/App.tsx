import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// style
import Header from './Components/Header';
import Home from './Routes/Home';
import TvShow from './Routes/TvShow';
import Movies from './Routes/movies';
import MovieDetail from './Routes/MovieDetail';
import Search from './Routes/Search';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='info/:id' element={<Home />} />
        </Route>
        <Route path='tv' element={<TvShow />} />
        <Route path='movies' element={<Movies />} />
        <Route path='movies/:id' element={<MovieDetail />} />

        <Route path='search' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
