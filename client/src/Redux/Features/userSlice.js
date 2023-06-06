import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname : " " ,
  id: "" ,
  email: "",
  image: "",
  token: ""
}


const userSlice = createSlice({
  name:"user",
  initialState,
  reducers: {
    setUserDetails : (state , action) =>{
      state.firstname = action.payload.name;
      state.id = action.payload.id
      state.email = action.payload.email
      state.image = action.payload?.image
      state.token = action.payload.token
    },

    setSignoutState : (state , action) =>{
      state.firstname = null;
      state.id = null;
      state.email = null;
      state.image = null;
      state.token = null;

    }
  }

})

export const {setSignoutState , setUserDetails } = userSlice.actions

export default userSlice.reducer