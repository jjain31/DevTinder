import { createSlice } from "@reduxjs/toolkit";


const passwordSlice=createSlice({
          name:"passwordslice",
          initialState:null,
          reducers:{
                    addUserr:(state,action)=>{
                              return action.payload;
                    },
                    removeUserr:(state,action)=>{
                              return null
                    },
          }
});

export const {addUserr,removeUserr}=passwordSlice.actions;
export default passwordSlice.reducer;