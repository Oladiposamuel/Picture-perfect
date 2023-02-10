import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/Home/Home';
import Imagepage from './screens/ImagePage/Imagepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/view/:id' element={<Imagepage />} />
          <Route  path='/*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

