import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// style
import Header from './Components/Header';
import Home from './Routes/Home';
import TV from './Routes/TV';
import Movies from './Routes/movies';
import Media from './Routes/Media';
import Search from './Routes/Search';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='info/:id' element={<Home />} />
        </Route>
        <Route path='tv' element={<TV />} />
        <Route path='movies' element={<Movies />} />
        <Route path='movies/:id' element={<Media />} />

        <Route path='search' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
