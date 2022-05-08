import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={
            <>
              <Banner></Banner>
              <Movies></Movies>
            </>} 
          />
          <Route path="/favourites" element={<Favourites></Favourites>} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
