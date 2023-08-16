import { createSlice }  from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
    name:"events",
    initialState:{
        eventsDetails:[],
    },
    reducers:{
        setEvents: (state, action) => {
            console.log("from slice ",action.payload)
            state.eventsDetails = action.payload;
        }
    },
});

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;