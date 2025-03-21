import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Roller from '../../components/Roller/Roller';
import React, { useEffect, useRef, useState } from 'react';
import { useFetchByTextQuery } from '../../services/PhotoService';
import { searchInputSlice } from '../../store/reducers/SearchInputSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.searchInputReducer);
  const { setValue } = searchInputSlice.actions;
  const { isFetching } = useFetchByTextQuery(value);

  const [localValue, setLocalValue] = useState(value || '');
  const localValueRef = useRef('');
  localValueRef.current = localValue;

  useEffect(
    () => () => {
      dispatch(setValue(localValueRef.current));
    },
    [dispatch, setValue]
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && dispatch(setValue(localValue))}
      />
      <button className="search-button" onClick={() => dispatch(setValue(localValue))}>
        {isFetching ? (
          <Roller scale={0.5} x={-10} y={-10} />
        ) : (
          <img src="./search.svg" alt="Search" height="40px" />
        )}
      </button>
    </div>
  );
}
