import {createSlice} from '@reduxjs/toolkit';
import { fetchAllJoinedGroups } from '../Actions/groupActions'; 

const initialState = {
  groups: [] ,
  status : 'idle' ,
  error : null 
}

const groupSlice = createSlice({
  name : "group",
  initialState,
  extraReducers : (builder) => {
    builder
         .addCase(fetchAllJoinedGroups.pending , (state) => {
          state.status = 'loading'
         })
         .addCase(fetchAllJoinedGroups.fulfilled, (state, action) => {
          state.status = true
          state.groups = action.payload.group
         })
         .addCase(fetchAllJoinedGroups.rejected , (state , action) => {
          state.status = 'failed';
          state.error = action.error.message ;
         })
  }
})

export const { setGroupDetails } = groupSlice.actions ;

export default groupSlice.reducer ;