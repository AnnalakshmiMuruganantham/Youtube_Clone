import Navbar from './Components/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Vedio from './pages/Vedio/Vedio';
import { useState } from 'react';

const App = () => {
  const [sidebar,setSidebar]= useState(true);
  return (
    <>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>} />
        <Route path="/video/:categoryId/:videoId" element={<Vedio />} />
      </Routes>
    </>
  )
}

export default App
