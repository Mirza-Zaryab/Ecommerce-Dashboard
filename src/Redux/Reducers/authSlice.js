import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: '',
  FirstTime: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.token = ''
    },

  },

});



export const { setUser, logout, Bording, setToken } = userSlice.actions;
export const authReducer = userSlice.reducer;


