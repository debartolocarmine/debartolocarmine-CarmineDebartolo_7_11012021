// Création d'un composant React
import React, { Component } from 'react';
// Importation de React Router. Sorte de méga Component qui vas contenir notre application et pouvoir utiliser react router ( BrowserRouter renomé Router )partout dans notre app
//https://fr.reactjs.org/docs/context.html
import { BrowserRouter as Router, Route } from "react-router-dom"
// Importation des composants
import Billets from './components/Billets/Billets'
import Connexion from './components/User/Connexion'
import Enregistrement from './components/User/Enregistrement'

import Narbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Users from './components/User/Users'
// Style
import './App.scss';
// extends = App devient l'enfant de { Component } et  peux accéder  toutes les fonctionnalitées de { Component }
// class = mot clé réservé jsx
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  //Méthode render() hérité  de  { Component }
  render() {
    return (
      //return () Retourne du jsx
      <div>
        <Router> 
          <main className="app-main">            
            <div className="app-main-wrapper">
              {/*Je demande l'affichage de mon composants <Narbar />*/}
              <Narbar />
               {/*         props             props                />*/}
              <Route exact path="/connexion" component={Connexion} />
              <Route exact path="/enregistrement" component={Enregistrement} />
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/" component={Billets} /> 
            </div>
          </main>
        </Router>
        {/*Je demande l'affichage de mon composants <Footer />*/}
        <Footer />
      </div>
    );
  }
}
//Ons exporte le tout et ons l' injecte dans la div root via le ReactDOM.render()
// ReactDOM.render()
//       <App />
// document.getElementById('root')
export default App;