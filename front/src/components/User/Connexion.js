// Création d'un composant React
import React, { Component } from 'react';
import axios from 'axios';
// Fonction qui renvoie l'url du serveur API
import { getBaseApi } from '../Utils/Tools'

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    
    const DEFAULT_QUERY = '/user/login';

    let login = {
      password: event.target.password.value,
      email: event.target.email.value,
    }

    axios({
      method: 'post',
      // Fonction qui renvoie l'url du serveur API + DEFAULT_QUERY = '/user/login'
      url: getBaseApi() + DEFAULT_QUERY,
      data: login,
    })
    .then(function (response) {
        //On traite la suite une fois la réponse obtenue 
       
        let user = {
          prenom: response.data.user.prenom,
          nom: response.data.user.nom,
          roles: response.data.user.roles,
          status: response.data.user.status,
          uid: response.data.user.uid,
          portrait: response.data.user.portrait,
          username: response.data.user.username,
        }

        localStorage.setItem("bear", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";

    })
    .catch(function (erreur) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
    });

    event.preventDefault();    
  }

  render() {
    return (
      <div className="container">
        
        <form className="app-login app-connexion" onSubmit={this.handleSubmit}>
          <label>
            Email :
            <input type="email" value={this.state.email} name="email" onChange={this.handleChange} required/>
          </label>
          <label>
            Mot de passe :
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} required/>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
    );
  }
}

export default Connexion;