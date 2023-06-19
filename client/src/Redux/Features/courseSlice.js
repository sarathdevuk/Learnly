import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const courseSlice = createSlice({
  name : "course",
  initialState ,
  reducers : {
    setCourseDetails : ( state , action ) => {
      state.value = action.payload
    },
  }
})

export const {setCourseDetails} = courseSlice.actions ;

export default courseSlice.reducer