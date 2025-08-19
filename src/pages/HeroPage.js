import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ParticlesBackground from '../ParticlesBackround';
import { useNavigate } from 'react-router-dom';
import FlagSelectMenu from '../components/FlagSelectMenu';

function HeroPage() {
  const [budget] = useState('');    
  const [selectedFlag, setSelectedFlag] = useState('🇨🇦');
  const navigate = useNavigate();

  const handleStart = () => {
    const payload = { budget, flag: selectedFlag };
    console.log('Payload for API Call:', payload);
    navigate('/Arbitrage', { state: payload });
  };

  return (
    <div className="hero-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticlesBackground style={{ zIndex: -10 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content d-flex flex-column justify-content-center align-items-center vh-100 text-center fade-in">
          <h1 className="title" style={{ color: '#fff' }}>Welcome to ArbBot</h1>
          <h2 className="description">
            Discover profitable arbitrage opportunities across multiple betting platforms in real-time
          </h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg custom-button"
              onClick={handleStart}
            >
              Show Arbitrage Opportunities
            </button>

            <FlagSelectMenu
              selectedFlag={selectedFlag}
              setSelectedFlag={setSelectedFlag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;



