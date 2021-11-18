// Importing combination
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getBaseApi, getUserSession, getUserInformation } from '../Utils/Tools'
// import logo from '../../components/logo_p-7/icon.png';
import logo from '../../components/logo/icon-left-font-monochrome-white.png';
import navBg from '../../components/logo/banner.png';
// Import style
import './Navbar.scss';
 
class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = { logged_user : getUserInformation() };
  }

  logout() {
    
    axios.get(getBaseApi() + '/user/deconnexion', {
      headers: {
        'Authorization': 'bear ' + getUserSession()
      }
    }).then(function (response) {
      // reset cookie and redirect 
      document.cookie = "bear= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      localStorage.setItem("bear", null);
      localStorage.setItem("user", null);
      window.location.href = "/connexion";
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      // console.log(error);
    });

  }

  render()
  {
    console.log(this.state)

    let { logged_user } = this.state
    return (
      <div className="app-navbar" style={{ backgroundImage: `url(${navBg})` }}>
        <div className="app-navbar-bg">
          <div className="container">
            <ul className="app-navbar-wrapper">
              <img src={logo} className="header-logo" alt="logo" />
              { logged_user ? (
                <ul className="app-navbar-wrapper">
                  <li className="app-navbar-user">
                    {logged_user.portrait &&
                      <div styles={`background-image: url('${getBaseApi(false)}/images/portraits/${logged_user.portrait}')`} className="user-portrait"></div>
                    }
                    <div className="user-name">
                      <Link to={`/user/${logged_user.username}`} className="nav-link" alt="Profile" title="Profile"><span>{logged_user.prenom}</span><span>{logged_user.nom}</span></Link>
                    </div>
                  </li>
                  <li><Link to={`/user/${logged_user.username}/edition`} className="nav-link" alt="Profile edition" title="Profile edition"><i className="bi bi-wrench"></i></Link></li>
                  <li><a href="/#" className="nav-link" onClick={this.logout.bind(this)} alt="Déconnexion" title="Déconnexion"><i className="bi bi-door-closed"></i></a></li>
                </ul>
              ) : (
                <ul className="app-navbar-wrapper">
                  <li><Link to={'/connexion'} className="nav-link" alt="Connexion" title="Connexion"><i className="bi bi-person-circle"></i></Link></li>
                  <li><Link to={'/enregistrement'} className="nav-link" alt="Enregistrement" title="Enregistrement"><i className="bi bi-building"></i></Link></li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
} 

export default Navbar;