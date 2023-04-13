import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchInputState {
  value: string;
}

const initialState: SearchInputState = {
  value: '',
};

export const searchInputSlice = createSlice({
  name: 'search-input',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export default searchInputSlice.reducer;
