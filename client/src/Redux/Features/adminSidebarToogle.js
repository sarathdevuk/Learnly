import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar : true
}

const adminSidebarToogle = createSlice({
  name : "adminSidebarToogle",
  initialState ,
  reducers: {
    setSidebar : (state , action) => {
      state.sidebar = action.payload;

    }
  }
   
})

export const {setSidebar} = adminSidebarToogle.actions

export default adminSidebarToogle.reducer;
