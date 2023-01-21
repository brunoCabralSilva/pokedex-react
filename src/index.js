import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import PokeProvider from './context/PokeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </PokeProvider>
  </React.StrictMode>
);

