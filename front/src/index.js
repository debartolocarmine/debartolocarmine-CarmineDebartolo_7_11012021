// Création d'un composant React
import React from 'react';
import ReactDOM from 'react-dom';
// Importation de React Router. Sorte de méga Component qui vas contenir notre application et 
//pouvoir utiliser react router ( BrowserRouter renomé Router )partout dans notre app
import { BrowserRouter } from "react-router-dom";

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
