import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar : true
}

const adminSidebarToggle = createSlice({
  name : "adminSidebarToggle",
  initialState ,
  reducers: {
    setSidebar : (state , action) => {
      state.sidebar = action.payload;

    }
  }
   
})

export const {setSidebar} = adminSidebarToggle

export default adminSidebarToggle.reducer;
