import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function FlagSelectMenu({selectedFlag, setSelectedFlag}) {
  const handleSelect = (flag) => {
    setSelectedFlag(flag);
  };


  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedFlag}
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => handleSelect('🇨🇦')}
          >
            🇨🇦
          </button>
        </li>
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => handleSelect('🇺🇸')}
          >
            🇺🇸
          </button>
        </li>
      </ul>
    </div>
  );
}

export default FlagSelectMenu;


