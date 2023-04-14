import React from 'react';

import Photo from '../../components/Photo/Photo';
import { useAppSelector } from '../../hooks/redux';
import { useFetchByTextQuery } from '../../services/PhotoService';

export default function Photos() {
  const { data } = useFetchByTextQuery(useAppSelector((state) => state.searchInputReducer).value);
  const photos = data?.results;

  return (
    <div className="content">
      <div className="card-container">
        {photos && photos.map((photo) => <Photo key={photo.id} photo={photo} />)}
      </div>
    </div>
  );
}
