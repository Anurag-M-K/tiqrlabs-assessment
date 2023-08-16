import { createSlice }  from '@reduxjs/toolkit';

export const allUsersSlice = createSlice({
    name:"allUsers",
    initialState:{
        allUsersDetails:[],
    },
    reducers:{
        setAllUsersDetails: (state, action) => {
            console.log("from slice ",action.payload)
            state.allUsersDetails = action.payload;
        },
    
    },
});

export const { setAllUsersDetails } = allUsersSlice.actions;

export default allUsersSlice.reducer;