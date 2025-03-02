import React, { useState, useEffect } from 'react';
import QRGenerator from './Components/QRGenerator';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleColorChange = (e) => {
    setQrColor(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const bgStyle = {
    background: `linear-gradient(${mousePos.y % 360}deg, #f6d365, #fda085)`
  };

  return (
    <div className="app" style={bgStyle}>
      <h1>Sentence to QR</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a sentence or word"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div className="color-picker-container">
        <label>QR Code Color:</label>
        <input type="color" value={qrColor} onChange={handleColorChange} />
        <label>Background Color:</label>
        <input type="color" value={bgColor} onChange={handleBgColorChange} />
      </div>
      <QRGenerator text={inputText} qrColor={qrColor} bgColor={bgColor} />
    </div>
  );
}

export default App;
