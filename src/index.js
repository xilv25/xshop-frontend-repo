// src/main.jsx (atau index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Pastikan path ini benar (jika App.jsx)
import './index.css'; // Styling dasar

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
