import React from 'react';
import "./AuthorCard.scss"

const AuthorCard = ({author}) => {
  return (
    <div className={'author-card'}>
      <div className="author-card-icon">
        <span>{author.prenom[0]}</span>
        <span>{author.nom[0]}</span>
      </div>
      <div className="wrapper-author-card">
        <div className="author-card-name">
          <span className="author-card-name">{author.prenom}</span>
          <strong className="author-card-name">{author.nom}</strong>
        </div>
        <div className="author-card-created">
          {author.created}
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;