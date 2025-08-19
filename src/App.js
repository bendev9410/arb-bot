import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroPage from './pages/HeroPage';
import ArbCalculator from './pages/ArbCalculator';
import NoPage from './pages/NoPage'
import './pages/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<HeroPage/>}/>
          <Route path ="/home" element = {<HeroPage/>}/>
          <Route path = "Arbitrage" element = {<ArbCalculator/>}/>
          <Route path = "*" element = {<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

