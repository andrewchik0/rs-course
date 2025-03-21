import React from 'react';

import Photo from '../../components/Photo/Photo';
import { useAppSelector } from '../../hooks/redux';
import { useFetchByTextQuery } from '../../services/PhotoService';

export default function Photos() {
  const { data } = useFetchByTextQuery(useAppSelector((state) => state.searchInputReducer).value);

  return (
    <div className="content">
      <div className="card-container">
        {data?.results && data.results.map((photo) => <Photo key={photo.id} photo={photo} />)}
      </div>
    </div>
  );
}
