import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  restaurantName: string;
  time: string;
  slot: any[];
  date: Date;
}

const initialState: CounterState = {
  restaurantName: '',
  time: '',
  slot: [],
  date: new Date(),
};

export const claimSlice = createSlice({
  name: 'claim',

  initialState,
  reducers: {
    setRestaurantName: state => {
      state.restaurantName;
    },
    setTime: state => {
      state.time;
    },
    setSlot: state => {
      state.slot;
    },
    setDate: state => {
      state.date;
    },
  },
});

export const {} = claimSlice.actions;

export default claimSlice.reducer;
