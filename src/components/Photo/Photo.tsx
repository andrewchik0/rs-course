import React, { useState } from 'react';

import { createPortal } from 'react-dom';
import PhotoModal from './../PhotoModal/PhotoModal';
import IPhoto from 'models/IPhoto';
import './Photo.css';

export default function PortalExample(props: { photo: IPhoto }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="photo">
      {showModal &&
        createPortal(
          <PhotoModal onClose={() => setShowModal(false)} photoId={props.photo.id} />,
          document.body
        )}
      <img
        className="photo-image"
        src={props.photo.urls.small}
        onClick={() => setShowModal(true)}
      />
      {props.photo.alt_description && (
        <h4>
          {props.photo.alt_description.charAt(0).toUpperCase() +
            props.photo.alt_description.slice(1)}
        </h4>
      )}
    </div>
  );
}
