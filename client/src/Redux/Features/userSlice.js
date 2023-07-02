import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName : " " ,
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
      state.firstName = action.payload.name;
      state.id = action.payload.id
      state.email = action.payload.email
      state.image = action.payload?.image
      state.token = action.payload.token
    },

    setSignoutState : (state , action) =>{
      state.firstName = null;
      state.id = null;
      state.email = null;
      state.image = null;
      state.token = null;

    }
  }

})

export const {setSignoutState , setUserDetails } = userSlice.actions

export default userSlice.reducer