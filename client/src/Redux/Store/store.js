import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";
import adminSlice from "../Features/adminSlice";
import adminSidebarToogle from "../Features/adminSidebarToogle";
import tutorSlice from "../Features/tutorSlice";


export default configureStore({
  reducer: {
    user : userSlice ,
    admin : adminSlice ,
    adminSidebarToogle : adminSidebarToogle,
    tutor : tutorSlice ,
  }
})