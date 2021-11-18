// CONTRIB LIBRARIES
import React, {Component} from 'react';
import axios from 'axios';
// TOOLS
import { getBaseApi, getCurrentUserUid, getUserSession, getTimeAgo } from '../Utils/Tools';
// PLAYER VIDEO
import PlayerVideo from '../Utils/PlayerVideo';
// ADD OR UPDATE FORM
import AuthorCard from './AuthorCard'
import BilletAdd from './BilletAdd';

import './BilletCard.scss';

class BilletCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      onEdit : false,
      onDelete : false,

      onLike: false,
      titre: '',
      file: '',
      video: '',
      filepreview: null,
      bid : null,
      item : null,
      cuid : getCurrentUserUid()
    };
  }

  componentDidMount() {
    this.setState({
      item : {
        titre: this.props.item.titre,
        uid: this.props.item.uid,
        video: this.props.item.video,
        bid: this.props.item.bid,
        artwork: this.props.item.artwork,
        file: null,
        filepreview: null,
        cuid : getCurrentUserUid()
      },
    })
  }

  getLike = () => {
    console.log('getLike')
    this.setState({ onEdit : false, onComment : false, onLike : true });
  }

  getComment = () => {
    this.setState({ onEdit : false, onComment : !this.state.onComment, onLike : false });
  }

  getEdit = () =>  {
    this.setState({ onEdit : !this.state.onEdit, onComment : false, onLike : false });
  }

  deleteBillet(billet, action) {
    if (action === 'ask') {
      this.setState({ onDelete: true });
    }else if(action === 'confirm'){

      const DEFAULT_QUERY = '/billets/' + billet.bid;

      axios.delete(getBaseApi() + DEFAULT_QUERY, {
        headers: {
          'Authorization': 'bear ' + getUserSession()
        },
        data: {
          billet
        }
      }).then( result => {
        this.props.updateData(billet.bid, 'remove');
      });

    }else if(action === 'concel'){
      this.setState({ onDelete: false });
    }
    
  }

  handleSbmtData = (nouveauBillet) =>  {
    this.setState({ onEdit: false });
    this.props.updateData(nouveauBillet, 'update');
  }

  closeMenuReaction = () =>  {
    this.setState({ onComment: false });
  }

  render()
  {
    // let { item } = this.props
    // let { onEdit, titre, artwork, video, cuid, uid, bid, onDelete, onComment, item } = this.state
    let { onEdit, cuid, onDelete } = this.state
    let { titre, artwork, video, uid, prenom, nom, created } = this.props.item

    return (
      <div className="card-items">
        {onEdit &&
          <div className="card-edit-item">
            <BilletAdd 
              handleSbmtData={this.handleSbmtData}
              item={this.props.item}
              query_action={'update'}
            />
            <div className="card-edit-item-back">
              <div className="card-link-edit-back" onClick={this.getEdit}><i className="bi bi-pen"></i></div>
            </div>
          </div>
        }
        {!onEdit &&
          <div className="card-wrapper">
            <AuthorCard author={{nom, prenom, created: getTimeAgo(created)}}/>
            <h2>{titre}</h2>
            { video && video !== '' && video !== 'null' &&
              <PlayerVideo video_url={video}/>
            }
            { artwork && artwork !== '' &&
              <img src={`${getBaseApi(false)}/images/billets/${artwork}`} alt={titre}/>
            }
            <ul className="card-btns">
              <li className="card-btn" onClick={this.getComment}><i className="bi bi-chat"></i></li>
              <li className="card-btn" onClick={this.getLike}><i className="bi bi-hand-thumbs-up"></i></li>
              <li className="card-btn" onClick={this.getLike}><i className="bi bi-hand-thumbs-down"></i></li>
              { cuid && uid && cuid === uid &&
                <ul className="card-btns-delete">
                  <li className="card-btn" onClick={this.getEdit}><i className="bi bi-pen"></i></li>
                  <li className="card-btn" onClick={() => this.deleteBillet(this.props.item, onDelete ? 'concel' : 'ask')}><i className={`bi bi-${ onDelete ? 'chevron-left' : 'trash'}`}></i></li>
                  { onDelete &&
                    <li className="card-btn delete-confirm" onClick={() => this.deleteBillet(this.props.item, 'confirm')}><i className="bi bi-trash"></i></li>
                  }
                </ul>
              }
            </ul>
          </div>
        }
      </div>
    )
  }
} 

export default BilletCard;