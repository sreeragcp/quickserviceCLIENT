import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  tocken:null,
  userData:localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null,
  partnerData:localStorage.getItem('partnerData')?JSON.parse(localStorage.getItem('partnerData')):null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.tocken=action.payload;
      state.userData = action.payload.userData;
      state.partnerData = action.payload.partnerData
      localStorage.setItem("token", JSON.stringify(action.payload));
      
    },
    logout: (state, action) => {
      state.tocken = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
