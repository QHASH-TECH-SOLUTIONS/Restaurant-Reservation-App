import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Claim {
  id: string;
  restaurant_name: string;
  location: string;
  time: string;
  slot: number;
  current_date: string;
  profileImage: string;
}

interface ClaimState {
  claims: Claim[];
  restaurantSpots: {[key: string]: {[time: string]: number}};
}

const initialState: ClaimState = {
  claims: [],
  restaurantSpots: {
    "Joe's Stone Crab": {
      '5:00 PM': 5,
      '6:00 PM': 3,
      '7:00 PM': 2,
      '8:00 PM': 4,
    },
    'Jaguar Sun': {'5:00 PM': 4, '6:00 PM': 3, '7:00 PM': 2, '8:00 PM': 4},
    'LPM Restaurant': {'5:00 PM': 5, '6:00 PM': 3, '7:00 PM': 2, '8:00 PM': 4},
  },
};

const claimSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    addClaim: (state, action: PayloadAction<Claim>) => {
      console.log('Adding claim:', action.payload);
      state.claims.push(action.payload);
    },
    updateSpots: (
      state,
      action: PayloadAction<{
        restaurantName: string;
        time: string;
        spots: number;
      }>,
    ) => {
      if (!state.restaurantSpots[action.payload.restaurantName]) {
        state.restaurantSpots[action.payload.restaurantName] = {};
      }
      console.log('Updating spots:', action.payload);
      state.restaurantSpots[action.payload.restaurantName][
        action.payload.time
      ] = action.payload.spots;
    },
    cancelClaim: (state, action: PayloadAction<{id: string}>) => {
      console.log('Cancel claim action payload:', action.payload);
      console.log('Before cancel - claims:', state.claims);
      console.log(
        'Canceling claim with id:',
        action.payload.id,
        'Type:',
        typeof action.payload.id,
      );
      state.claims = state.claims.filter(claim => {
        console.log('Comparing claim id:', claim.id, 'Type:', typeof claim.id);
        return claim.id !== action.payload.id;
      });
      console.log('After cancel - claims:', state.claims);
    },
  },
});

export const {addClaim, updateSpots, cancelClaim} = claimSlice.actions;
export default claimSlice.reducer;
