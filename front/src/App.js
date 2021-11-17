import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Narbar from './components/Navbar/Navbar'
import Billets from './components/Billets/Billets'
import Connexion from './components/User/Connexion'
import Enregistrement from './components/User/Enregistrement'
import Footer from './components/Footer/Footer'
import Profile from './components/User/Profile'
import ProfileEdit from './components/User/ProfileEdit'
import Users from './components/User/Users'
import Authentification from './components/Authentification/Authentification'
// Style
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router> 
          <main className="app-main">            
            <div className="app-main-wrapper">
              <Route exact path="/user/:name/edition" component={Authentification(ProfileEdit)}/>
              <Route exact path="/user/:name" component={Authentification(Profile)}/>
              <Route exact path="/connexion" component={Connexion} />
              <Route exact path="/enregistrement" component={Enregistrement} />
              <Route exact path="/admin/users" component={Authentification(Users)}/>
              <Route exact path="/" component={Authentification(Billets)}/> 
            </div>
          </main>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;