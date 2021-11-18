// Importing combination
import React, { Component } from 'react';
import './Footer.scss'
import logo from '../../components/logo/icon-left-font-monochrome-white.png';
import bg from '../../components/logo/bg.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-footer" style={{ backgroundImage: `url(${bg})` }}>
        <div className="app-footer-overlay">
          <div className="container">
            <div className="app-footer-logo">
              <img src={logo} className="header-logo" alt="logo" />
            </div>
          </div>
          <div className="container">
            <div className="app-footer-list">
              <div className="app-footer-aide">
                <h2>À PROPOS</h2>
                <ul className="cd-ftr-list">
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-cart2"></i></span>
                      <span className="cd-l">Conditions générales de ventes</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-brush"></i></span>
                      <span className="cd-l">Données personnelles</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-building"></i></span>
                      <span className="cd-l">Mentions légales</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-emoji-sunglasses"></i></span>
                      <span className="cd-l">Gérer mes cookies</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-award"></i></span>
                      <span className="cd-l">Avis</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="app-footer-aide">
                <h2>SAV & SERVICES</h2>
                <ul className="cd-ftr-list">
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-brightness-high"></i></span>
                      <span className="cd-l">SAV</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-chat-quote"></i></span>
                      <span className="cd-l">Besoin d'aide ?</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-envelope"></i></span>
                      <span className="cd-l">Contactez-nous !</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-gift"></i></span>
                      <span className="cd-l">Cartes cadeaux</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-bricks"></i></span>
                      <span className="cd-l">Sécurité</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="app-footer-aide">
                <h2>GROUPOMANIA</h2>
                <ul className="cd-ftr-list">
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-eyeglasses"></i></span>
                      <span className="cd-l">Qui sommes nous ?</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-gem"></i></span>
                      <span className="cd-l">Recrutement</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-recycle"></i></span>
                      <span className="cd-l">Développement durable</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link active" href="/" title="Paramètres d'accessibilités">
                      <span className="cd-i"><i className="bi bi-eye-slash"></i></span>
                      <span className="cd-l">Paramètres d'accessibilités</span>
                    </a>
                  </li>
                  <li className="cd-ftr-item">
                    <a className="nav-link" href="/">
                      <span className="cd-i"><i className="bi bi-recycle"></i></span>
                      <span className="cd-l">Plan du site</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="footer-credentials">
              <small>Copyright 2021 by GROUPOMANIA .All Rights Reserved.</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;