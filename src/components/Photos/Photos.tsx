import React from 'react';

import Photo from '../../components/Photo/Photo';
import { IPhoto } from 'models/IPhoto';

export default function Photos(props: { photos: string }) {
  return (
    <div className="content">
      <div className="card-container">
        {props.photos &&
          (JSON.parse(props.photos).results || JSON.parse(props.photos)).map((photo: IPhoto) => {
            return <Photo key={photo.id} photo={photo} />;
          })}
      </div>
    </div>
  );
}
