import { createSlice }  from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState:{
        userDetails:[],
        tokenData:"",
        socket:false,
    },
    reducers:{
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        setToken : (state,action) => {
            state.tokenData = action.payload;
        },
        setSocketdata : (state,action) => {
            console.log("from slcie socket ",action.payload)
            state.socket = action.payload;
        }
    },
});

export const { setUserDetails , setToken ,setSocketdata } = userSlice.actions;

export default userSlice.reducer;