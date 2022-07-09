import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter } from "react-router-dom"

import './generatedCss/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
