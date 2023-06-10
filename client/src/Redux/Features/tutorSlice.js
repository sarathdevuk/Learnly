import { createSlice } from "@reduxjs/toolkit";
import state from "sweetalert/typings/modules/state";
import adminSlice from "./adminSlice";

const initialState = {
  id : "" ,
  firstname:"",
  lastname : "",
  email : "", 
  login : "",
  token : "",

}

const tutorSlice = createSlice({
  name : "tutor",
  initialState ,
  reducers : {
    setTutorDetails : (state , action) =>{
      state.id = action .payload.id
      state.firstname = action.payload.name
      state.email = action.payload.email
      state.token = action.payload.token
      state.login = action.payload.login
    },
    setTutorSignoutState: (state , action ) => {
      state.id = null
      state.firstname = null
      state.email = null
      state.token = null
      state.login = null
  }

}
}) 

export const{ setTutorDetails , setTutorSignoutState } = tutorSlice.actions 

export default tutorSlice.reducer;