import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ICard from '../../models/ICard';

interface CardState {
  cards: ICard[];
}

const initialState: CardState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICard>) {
      state.cards.push(action.payload);
    },
  },
});

export default cardSlice.reducer;
