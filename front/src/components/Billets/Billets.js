// LIB
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// COMPONENT
import BilletAdd from './BilletAdd'
import BilletCard from './BilletCard'
// TOOLS
import { getBaseApi, getUserSession, insertItem, removeItem, getIndexBillet } from '../Utils/Tools'

// STYLES
import './Billets.scss'

class Billets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      uid : null,
      users: [],
    };
  }

  componentDidMount() {

    // Load Billets
    const BILLET_QUERY = '/billets';
    axios.get(getBaseApi() + BILLET_QUERY,  {
      headers: {
        'Authorization': 'bear ' + getUserSession()
      }
    }).then(res => {
      if (res && res.data && res.data && Array.isArray(res.data) && res.data.length > 0) {
        this.setState({
          isLoaded: true,
          items: res.data
        });
      }
      
    }).catch((e) =>{
      // Il semble que le token n'est plus à jour
      // deconnecteAndCleanToken()
    })

    // Load Billets
    const USERS_QUERY = '/user/all-users';

    axios.get(getBaseApi() + USERS_QUERY,  {
      headers: {
        'Authorization': 'bear ' + getUserSession()
      }
    }).then(res => {
      console.log(res)
      if (res && res.data && res.data && Array.isArray(res.data) && res.data.length > 0) {
        this.setState({
          isLoaded: true,
          users: res.data
        });
      }
    }).catch((e) =>{
      // Il semble que le token n'est plus à jour
    })

  }

  // Fonction recevant le nouveau billet via <RevueBilletAdd/> et permettant d'ajoter le nouvel element dans la liste
  handleSbmtData = (nouveauBillet, action_process) =>  {
    // Je récupére le state "items", celui-ci contient la liste des poste
    let { items } = this.state
    if (action_process === 'add') {
      // Si on ajoute un billet (ADD),
      // J'ajoute le nouvel element en debut de liste
      items.unshift(nouveauBillet)
      // On renvoie la liste mise à jour
      this.setState({ items });
    }else if (action_process === 'update') {
      // Si on met a jour le billet (UPDATE)
      // Je recupere l'index du billet qu'il faut modifier
      // let index = items.findIndex((item) => item.bid === parseInt(nouveauBillet.bid));
      let index = getIndexBillet(items, nouveauBillet.bid)
      // Puis je le supprime de la liste
      // let removeUpdatedBillet = items.filter((item) => item.bid !== parseInt(nouveauBillet.bid));
      let removeUpdatedBillet = removeItem(items, nouveauBillet.bid)
      // Enfin, j'ajoute à la liste,
      // le billet modifié
      let nexList = insertItem(removeUpdatedBillet, index, nouveauBillet)
      // On renvoie la liste mise à jour
      this.setState({ items: nexList });
    }else if (action_process === 'remove') {
      // Si on supprime le billet (REMOVE)
      let removeBillet = items.filter((item) => item.bid !== parseInt(nouveauBillet));
      // On renvoie la liste mise à jour
      this.setState({ items: removeBillet });
    }
  }

  showFormAdd = () => {
    return <BilletAdd handleSbmtData={this.handleSbmtData}/>
  }

  render() {
    
    // On récupere les states
    const { error, isLoaded, items, users } = this.state;
    // Si la reqiête renvoie une erreur
    if (error) {
      return <div className="container">Erreur : {error.message}</div>;
    } 
    // En chargement
    if (!isLoaded) {
      return <div className="container">Chargement…</div>;
    } 
    // Si la requête renvoie null ou autre chose qu'un tableau ou si le tableau est vide
    if (!items || !Array.isArray(items) || items.length < 1) {
      return (<div className="container">{this.showFormAdd()}</div> )
    }
    // Le rendu
    return (
      
      <div className="container">
        <div className="container-wrapper">
          <h1 className="shodow">réseau social d'entreprise</h1>
          <main id="contenu-principal"className="container-wall">
            {this.showFormAdd()}
            { items && 
              items.map((item)=>{
                return (
                  <BilletCard 
                    key={item.bid} 
                    item={item}
                    updateData={this.handleSbmtData}
                    query_action={'add'}
                  />
              );})
            }
          </main>
          <aside className="container-sidebar">
            <div className="sticky-sidebar">
              {/* Block collaborateur  */}
              <div className="block">
                <h2>Collaborateurs</h2>
                <ul>
                  { users && 
                    users.map((user)=>{
                      return (
                        <li key={user.uid}>
                          <Link to={`/user/${user.username}`} className="nav-link" alt="Profile" title="Profile"><span>{user.prenom}</span><span>{user.nom}</span></Link>
                        </li>
                    );})
                  }
                </ul>
              </div>
              {/* Block les meilleurs commentaires  */}
              <div className="block">
                <h2>Les dernières réactions</h2>
                <ul>
                 <li>Réaction</li>
                 <li>Réaction</li>
                 <li>Réaction</li>
                 <li>Réaction</li>
                 <li>Réaction</li>
                 <li>Réaction</li>
                </ul>
              </div>
              {/* Block les billets les plus liker  */}
              <div className="block">
                <h2>Les billets les plus likés</h2>
                <ul>
                 <li>Article</li>
                 <li>Article</li>
                 <li>Article</li>
                 <li>Article</li>
                 <li>Article</li>
                 <li>Article</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  
  }
}

export default Billets;