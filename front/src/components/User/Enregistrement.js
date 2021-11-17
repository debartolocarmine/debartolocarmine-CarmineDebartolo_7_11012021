import React, { Component } from 'react';
import axios from 'axios';

import { getBaseApi } from '../Utils/Tools'

import './Connexion.scss'

class Enregistrement extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nom: '',
      prenom: '',
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    
    const DEFAULT_QUERY = '/user/sign-up';

    let new_user = {
      email: event.target.email.value,
      password: event.target.password.value,
      nom: event.target.nom.value,
      prenom: event.target.prenom.value,
      portrait: 1,
    }

    axios({
      method: 'post',
      url: getBaseApi() + DEFAULT_QUERY,
      data: new_user
    })
    .then(function (res1) {
        console.log(res1);
        console.log(res1.data.email);
        console.log(res1.data.pwd);

        let login = {
          password:res1.data.pwd,
          email:res1.data.email,
        }
        console.log(login);

        const LOGIN_QUERY = '/user/login';

        axios({
          method: 'post',
          url: getBaseApi() + LOGIN_QUERY,
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

    })
    .catch(function (erreur) {
        console.log(erreur);
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="app-login app-connexion" >
          <label>
            Prénom :
            <input type="text" value={this.state.prenom} name="prenom" onChange={this.handleUserInput} required/>
          </label>
          <label>
            Nom :
            <input type="text" value={this.state.nom} name="nom" onChange={this.handleUserInput} required/>
          </label>
          <label>
            Email :
            <input type="text" value={this.state.email} name="email" onChange={this.handleUserInput} required/>
          </label>
          <label>
            Mot de passe :
            <input type="password" value={this.state.password} name="password" onChange={this.handleUserInput} required/>
          </label>
          <label>
            Confirmer le mot de passe :
            <input type="password" value={this.state.password} name="password_confirm" onChange={this.handleUserInput} required/>
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
    );
  }
}

export default Enregistrement;