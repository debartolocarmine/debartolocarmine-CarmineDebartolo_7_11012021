// CONTRIB LIB
import React, { Component } from 'react';
import PlayerVideo from '../Utils/PlayerVideo';
import axios from 'axios';
// TOOLS
import { getUserSession, getBaseApi, getUserInformation } from '../Utils/Tools';
// CSS
import './BilletAdd.scss'

class BilletAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total_titre: 0,
      query_type : 'post',
      query_base : '/billets',
      help: null,
      mediaType: false,
      typePreview: 'image',
      titre: 'Ajouter un status',
      video: '',
      file : '',
      videoPreview: null,
      imagePreview: null,
    };
  }

  componentDidMount() {
    // console.log("HELLLOOOOO")
    // Ce component est utilisé pour l'ajout de billet comme pour la modification d'un billet
    // Lorsqu'on charge le componnent, si l'on renseigne un item, alors il est utiliser pour renseigner les states du formulaire
    if (this.props && this.props.item) {
      console.log("HELLLOOOOO........")
      // On recupere les information du billet passés dans les props
      let {titre, video, artwork, bid } = this.props.item
      // On set API_BASE pour utiliser l'endpoint de modification des billets
      let query_base = '/billets/' + bid
      // On recupere l'image si présente
      let imagePreview = artwork ? getBaseApi(false) + '/images/' + artwork : null
      // Ou la video
      let videoPreview = video ? video : null
      let typePreview = artwork ? 'image' : ( video ? 'video' : null)
      // On set les states
      this.setState({titre, video, imagePreview, typePreview, videoPreview, query_base, query_type: 'put', total_titre: titre.length })
    }
  }

  // Fonction permettant de choisir le type de média
  handleMedia = (e, type) => {
    this.setState({mediaType: type, typePreview: type})
  }

  // Function nous permetant de mettre à jour les states des champs
  handleChange = (e) => {
    // On récupere le "name" qu'on associe au nom du state qui recevra la valeur du champs
    // On récuere la "value" du champs/state associé
    this.setState({[e.target.name]: e.target.value})
    if (e.target.name === 'titre') {
      this.setState({total_titre: e.target.value.length})
    }
  }

  // Function nous permetant de mettre à jour le state du champs image
  handlerImage = (e) => {
    // Traitement du champs image
    if (e.target && e.target.files && e.target.files[0]) {
      this.setState({ imagePreview:URL.createObjectURL(e.target.files[0]), typePreview: 'image', file: e.target.files[0], video: '', mediaType: null});
    }
  }

  // Function nous permetant de mettre à jour le state du champs video
  handlerVideo = (e, type = null) => {
    // Traitement du champs video
    if (this.state.video) {
      this.setState({ videoPreview: this.state.video, typePreview: 'video', file: '' , mediaType: null });
    }
  }

  handleSubmit = (e) => {
    
    e.preventDefault();
    // Information nouveau billet
    let {titre, file, video, typePreview, query_base, query_type, imagePreview} = this.state
    // Base API
    const BILLET_QUERY = query_base;
    // Il nous faut obligatoirement un titre pour notre billet de plus de 3 caractère
    if (titre.length > 5) {
      // On prépare le nouveau billet
      // Mais pour ajouter une image à l'enregistrement
      // nous ne servirons pas un simple objet 
      // mais un resultat de formulaire 
      // que nous créons avec la fonction FormData()
      // @voir https://developer.mozilla.org/fr/docs/Web/API/FormData/FormData
      // ainsi, la requete sera servit d'un objet file pour intercepter le fichier
      // et d'un objet body, pour le reste des informations.
      var formData = new FormData();
      // Si le typePreview et le state "file" est remplie
      if (typePreview === 'image' && file && file !== "") {
        formData.append("billets_img", file);
      }
      if (typePreview === 'image' && file === "" && imagePreview) {
        let splitImag = imagePreview.split("/images/");
        formData.append("artwork", splitImag[1]);
      }
      // Ou si typePreview et le state "video" est remplie
      if (typePreview && video && video !== '' ) {
        formData.append("video", video);
      }
      // On renseigne le titre
      formData.append("titre", titre.trim());
      // Puis on lance la requête
      axios({
        method: query_type,
        url: getBaseApi() + BILLET_QUERY,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'bear ' + getUserSession()
        }
      }).then(result => {
        // On réinitialise à null ou vide les states
        this.setState({ imagePreview: null, videoPreview: null, typePreview: null, file: '', titre: '', video: '', mediaType: null });

        // Si nous avons un nouveau billet
        // Formatons la date actuelle
        let createdDate = new Date();
        // let datestring = createdDate.getFullYear() + "-" + (createdDate.getMonth()+1) + "-" + createdDate.getDate()  + "T" + createdDate.getUTCHours() + ":" + createdDate.getUTCMinutes() + ":"+ createdDate.getUTCSeconds()+".000Z";
        // console.log(createdDate.toISOString())
        // L'objet pourmettre a jour la liste de billet
        let itemToReturn = {
          ...result.data,
          bid: parseInt(result.data.bid),
          created: this.props.item ? this.props.item.created : createdDate.toISOString(),
          nom: getUserInformation()['nom'],
          uid: getUserInformation()['uid'],
          prenom: getUserInformation()['prenom'],
          username: getUserInformation()['username'],
        }
        // On les passe au component parent @see /Revue/Revue, pour l'affichage dans la liste 
        this.props.handleSbmtData(itemToReturn, 'add')
      }).catch(e =>{
        console.log(e)
      })
    }
    
  }
  
  render() {
    // On récupere les state pour le rendu
    let {titre, imagePreview, typePreview, videoPreview, video, mediaType, total_titre} = this.state

    return (
      <form onSubmit={(e)=> this.handleSubmit(e)} className="app-revue-add" onKeyPress={(event) => {
        // Annule les evements par deffaut du formulaire
        // On ne veut pas que le bouton entrer soumette le formulaire par erreur
        if (event.key === "Enter") {event.preventDefault();}
      }}>
        {/* WRAPPER MEDIA */}
        {/* Si on selectionne l'option image et que celle-ci est renseignée, alors on affiche le preview de l'image */}
        { imagePreview && typePreview === 'image' &&
          <div className="add-form-media-img">
            <img className="previewimg" src={imagePreview} alt="UploadImage" />
          </div>
        }
        {/* Si on selectionne l'option video et que celle-ci est renseignée, alors on affiche le preview de la video */}
        { videoPreview && typePreview === 'video' &&
          <div className="add-form-media-img">
            <PlayerVideo video_url={videoPreview}/>
          </div>
        }
        {/* le state typePreview nous sert à injecter une classe pour définir la large du champs image et texte */}
        <div className={`add-form-status-info ${(typePreview && !mediaType) ? 'with-img' : 'without-img'}`} >
          <div className="add-form-text">
            {/* Element textarea pour receuillir le text */}
            {/* Celui-ci est enregistré dans le state titre avec la fonction handleChange() */}
           <label >
            <textarea  value={titre} name="titre" maxLength="255" required onChange={this.handleChange} />  
           </label>
          </div>
          <div className="add-form-btns">
            {/* VIDEO */}
            {/* Si le bouton video est cliqué, alors on affiche l'input pour recevoir l'url de la video */}
            {mediaType === 'video' &&
              <ul className="add-media-ul-vd">
                <li className="add-form-media-vd btns-video">
                  <input type="text" name="video" value={video} onChange={this.handleChange} placeholder="Url de la video... Youtube, Vimeo, Dailymotion, Archive.org..."/>
                </li>
                {/* Bouton Retour */}
                <li className="btns" onClick={e => this.handleMedia(e, null)}><i className="bi bi-x"></i></li>
                {/* Bouton de soumission de la video */}
                <li className="btns" onClick={e => this.handlerVideo(e, 'video')}><i className="bi bi-send"></i></li>
              </ul>
            }
            {/* le menu de soumission du billet est caché lorsqu'on selectionne une video  */}
            {mediaType !== 'video' &&
              <ul className="add-media-ul">
                {/* Count caractere */}
                <li className="btns btn-count">{total_titre} sur 255</li>
                {/* BTN VIDEO */}
                <li className="btns" onClick={e => this.handleMedia(e, 'video')}><i className="bi bi-youtube"></i></li>
                {/* BTN IMAGE */}
                {/* Le champs image est dissimulé derrière le bouton image  */}
                <li className="add-btn-media-img btns bi bi-image">
                  <label>
                    <input className="img-upload" type="file" name="file" onChange={this.handlerImage}/>
                  </label>
                </li>
                {/* BTN QUOTE */}
                {/* <li className="btns" onClick={e => this.handleMedia(e, 'quote')}><i className="bi bi-quote"></i></li> */}
                {/* BTN SUBMIT */}
                <li className="btns-sub"><input type="submit" value="Envoyer" /></li>
              </ul>
            }
          </div>
        </div>
      </form>
    );
  }
}

export default BilletAdd;