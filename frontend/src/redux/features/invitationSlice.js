import { createSlice }  from '@reduxjs/toolkit';

export const invitationSlice = createSlice({
    name:"invitations",
    initialState:{
        invitationsData:[],
    },
    reducers:{
        setInvitationData: (state, action) => {
            console.log("from slice ",action.payload)
            state.invitationsData = action.payload;
        }
    },
});

export const { setInvitationData } = invitationSlice.actions;

export default invitationSlice.reducer;