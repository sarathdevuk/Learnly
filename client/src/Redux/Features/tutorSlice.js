import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  id : "" ,
  firstName:"",
  lastName : "",
  email : "", 
  login : "",
  token : "",

}

const tutorSlice = createSlice({
  name : "tutor",
  initialState ,
  reducers : {
    
    setTutorDetails : (state , action) =>{
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName 
      state.email = action.payload.email
      state.token = action.payload.token
      state.login = action.payload.login
    },

    setTutorSignoutState: (state , action ) => {
      state.id = null
      state.firstName = null
      state.lastName = null
      state.email = null
      state.token = null
      state.login = null
  }

}
}) 

export const{ setTutorDetails , setTutorSignoutState } = tutorSlice.actions 

export default tutorSlice.reducer;