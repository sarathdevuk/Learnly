import { createSlice } from '@reduxjs/toolkit'

const initialState ={

}

const communitySlice = createSlice({
  name : "community" ,
  initialState ,
  reducers :{
    setCommunityDetails : (state , action) => {
      state.value = action.payload 
    }, 
  } 
})

export const { setCommunityDetails }  = communitySlice.actions ;

export default communitySlice.reducer