import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainMenu from './components/MainMenu';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainMenu />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);