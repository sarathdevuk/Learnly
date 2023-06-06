import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";
import adminSlice from "../Features/adminSlice";


export default configureStore({
  reducer: {
    user : userSlice ,
    admin : adminSlice ,
    
  }
})