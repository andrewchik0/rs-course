import React, { useEffect, useState } from 'react';

import './PhotoModal.css';
import Roller from '../../components/Roller/Roller';
import { IPhoto } from 'models/IPhoto';

export default function PhotoModal(props: { photoId: string; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<IPhoto>();

  useEffect(() => {
    fetch('https://api.unsplash.com/photos/' + props.photoId, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: 'Client-ID oEs-sd2oWIy5g8sGMuh8Dp52cQTkggVZg7fIIkIyhrc',
        'Accept-Version': 'v1',
        'X-Per-Page': '12',
        'X-Total': '1',
      }),
    }).then(async (response) => {
      setIsLoading(false);
      setPhoto((await response.json()) as IPhoto);
    });
    setIsLoading(true);
  }, [props.photoId]);

  const close = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', close, false);
  });

  useEffect(() => () => {
    window.removeEventListener('keydown', close, false);
  });

  return (
    <div className="modal-layout" onClick={props.onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={props.onClose}>
          x
        </button>
        {isLoading ? (
          <Roller scale={1} x={0} y={0} style={{ paddingTop: '30%', paddingLeft: '45%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <div className="column-70">
              <img className="modal-image" src={photo?.urls.regular} />
            </div>
            <div className="column-30">
              <h2 className="modal-desc user">{photo?.user.name}</h2>
              <h4 className="modal-desc username">@{photo?.user.username}</h4>
              <h2 className="modal-desc">
                {(photo as IPhoto)?.alt_description &&
                  (photo as IPhoto).alt_description.charAt(0).toUpperCase() +
                    photo?.alt_description.slice(1)}
              </h2>
              <h2 className="modal-desc likes">
                <img src="./heart.svg" height="30px" style={{ transform: 'translate(0, 5px)' }} />
                &nbsp;{photo?.likes || '0'}
              </h2>
              <h3 className="modal-desc tags-desc">Tags:</h3>
              <div className="tags">
                {photo?.tags.map((tag) => (
                  <div className="tag" key={tag.title}>
                    #{tag.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
