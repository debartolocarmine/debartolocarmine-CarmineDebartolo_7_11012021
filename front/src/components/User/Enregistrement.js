import React, { Component } from 'react';
import axios from 'axios';
import { getBaseApi } from '../Utils/Tools';

import './Connexion.scss'

class Enregistrement extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      nom: '',
      prenom: '',
      msg_nom : '',
      msg_prenom : 'Votre nom doit contenir entre 2 et 60 caractère',
      msg_email : '',
      msg_pwd : '',
      msg_pwd_confirm : '',
      msg_pwd_length : '',
      msg_pwd_minuscule : '',
      msg_pwd_majuscule : '',
      msg_pwd_special : '',
      msg_pwd_digi: '',
      msg_error: false
    }
  }

  handleUserInput = (e) => {
    let msg_nom = '';
    let msg_prenom = '';
    let msg_email = '';
    let msg_pwd_confirm = '';
    let msg_pwd_length = '';
    let msg_pwd_minuscule = '';
    let msg_pwd_majuscule = '';
    let msg_pwd_special = '';
    let msg_pwd_digi = '';
    // On recupere le nom du champs ainsi que sa valeur
    let name = e.target.name;
    let value = e.target.value;
    // On valide les champs
    // On teste le nom et le prénom
    if (name === 'nom') {
      msg_nom = "Votre nom doit contenir entre 2 et 60 caractère";
      msg_nom = (value.trim().length > 0 && value.trim().length < 3) ? msg_nom : false;
    }else if (name === 'prenom') {
      msg_prenom = "Votre prénom doit contenir entre 2 et 60 caractère";
      msg_prenom = (value.trim().length > 0 && value.trim().length < 2) ? msg_prenom : false;
    }else if (name === 'email') {
      // On test l'email
      let emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      msg_email = emailTest.test(String(value).toLowerCase()) ? false : 'Veuillez renseigner un email'
    }else if (name === 'password') {
      // On test le mot de passe
      msg_pwd_length = value.length <= 10 ? 'Le mot de passe doit faire minimum 10 caractéres.' : false;
      msg_pwd_minuscule = !value.match(/[a-z]/, "g") ? 'Le mot de passe doit contenir des caractère minuscule.' : false;
      msg_pwd_majuscule = !value.match(/[A-Z]/, "g") ? 'Le mot de passe doit contenir des caractère majuscule.' : false;
      msg_pwd_digi = !value.match(/[0-9]/, "g") ? 'Le mot de passe doit contenir des chiffres.' : false;
      msg_pwd_special = !value.match(/\W|_/g) ? 'Le mot de passe doit contenir au minimum un caractère spécial.' : false;
    }else if (name === 'password_confirm') {
      // On confirme le mot de pass
      msg_pwd_confirm = (value !== this.state.password) ? false : true;
    }

    this.setState({[name]: value, msg_nom, msg_prenom, msg_email, msg_pwd_length, msg_pwd_minuscule, msg_pwd_majuscule, msg_pwd_special, msg_pwd_confirm, msg_pwd_digi});
  }
// quand ons soumet la form
  handleSubmit = (event) => {
    
    const DEFAULT_QUERY = '/user/sign-up';

    let new_user = {
      email: event.target.email.value,
      password: event.target.password.value,
      nom: event.target.nom.value,
      prenom: event.target.prenom.value,
      portrait: '',
    }

    axios({
      method: 'post',
      url: getBaseApi() + DEFAULT_QUERY,
      data: new_user
    })
    .then((reponse) => {
        console.log(reponse);
        window.location.href = "/connexion";
        
    })
    .catch((erreur) =>  {
      this.setState({msg_error: 'Désolé, une erreur s\'est produit, veuillez contacter l\'administrateur du site.'});
    });

    event.preventDefault();
  }

  render() {

    let {msg_email, msg_nom, msg_prenom, msg_pwd_minuscule, msg_pwd_majuscule, msg_pwd_special, msg_pwd_confirm, msg_pwd_length, msg_error, msg_pwd_digi} = this.state

    return (
      <div className="user-container">
        { msg_error &&
          <div className="msg-help-wrapper"><p className="msg-help" >{msg_error}</p></div>
        }
        <div className="container">
          <h1>Enregistrement</h1>
          <form onSubmit={this.handleSubmit} className="app-login app-connexion" autoComplete="off">
            <label>
              Prénom :
              <input type="text" value={this.state.prenom} name="prenom" onChange={this.handleUserInput} required autoComplete="off"/>
              { msg_prenom &&
                <div className="msg-help-wrapper"><p className="msg-help" >{msg_prenom}</p></div>
              }
            </label>
            <label>
              Nom :
              <input type="text" value={this.state.nom} name="nom" onChange={this.handleUserInput} required autoComplete="off"/>
              { msg_nom &&
                <div className="msg-help-wrapper"><p className="msg-help" >{msg_nom}</p></div>
              }
            </label>
            <label>
              Email :
              <input type="text" value={this.state.email} name="email" onChange={this.handleUserInput} required autoComplete="off"/>
              { msg_email &&
                <div className="msg-help-wrapper"><p className="msg-help" >{msg_email}</p></div>
              }
            </label>
            <label>
              Mot de passe :
              <input type="password" value={this.state.password} name="password" onChange={this.handleUserInput} required autoComplete="off"/>
              <div className="msg-help-wrapper">
                <p className="msg-help" >{msg_pwd_length}</p>
                <p className="msg-help" >{msg_pwd_digi}</p>
                <p className="msg-help" >{msg_pwd_minuscule}</p>
                <p className="msg-help" >{msg_pwd_majuscule}</p>
                <p className="msg-help" >{msg_pwd_special}</p>
              </div>
            </label>
            <label>
              Confirmer le mot de passe : {msg_pwd_confirm ? 'Oui' : 'Non'}
              <input type="password" value={this.state.password_confirm} name="password_confirm" onChange={this.handleUserInput} required autoComplete="off"/>
            </label>
            { !msg_email && !msg_nom && !msg_prenom && !msg_pwd_minuscule && !msg_pwd_majuscule && !msg_pwd_special && !msg_pwd_length && msg_pwd_confirm &&
              <input type="submit" value="Envoyer" />
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Enregistrement;