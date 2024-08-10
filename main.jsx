// imports index.css, global.css (custom stylesheet), App.jsx, BrowserRouter, ReactDom, called in the root defined in index.html i.e main.jsx, is enclosed in BrowserRouter

// Setting up the BrowserRouter and rendering the App component.
// Entry point for vite

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(// This refers to the div with id 'root' in my public/index.html
  <React.StrictMode>
    <Router> {/* Wrapping App with BrowserRouter/ Router */}
      <App />
    </Router>
  </React.StrictMode>
);
