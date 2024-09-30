import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    activeUSN:null
}

export const usnSlice = createSlice({
    name: 'usn',
    initialState,
    reducers:{
        setUSN:(state,action)=>{
            console.log("hi",action.payload)
            state.activeUSN=action.payload
        }
    }
})

export const {setUSN} =usnSlice.actions

export default usnSlice.reducer