import { createAsyncThunk } from "@reduxjs/toolkit";

import { getJoinedGroups } from "../../services/userApi";

export const fetchAllJoinedGroups = createAsyncThunk('group/fetchAllJoinedGroups',async(arg , {rejectWithValue})=> {
  try {
    const {data} = await getJoinedGroups()
    return data
  } catch (err) {
    rejectWithValue(err)
  }
})
