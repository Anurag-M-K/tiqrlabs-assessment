import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { eventsSlice } from "./features/eventsSlice";
import { allUsersSlice } from "./features/allUsersSlice";
import { alertSlice } from "./features/alertSlice";
import { invitationSlice } from "./features/invitationSlice";

const persistConfig = {
    key:"root",
    version:1,
    storage
};

const reducer = combineReducers({
        user:userSlice.reducer,
        events:eventsSlice.reducer,
        allUsers:allUsersSlice.reducer,
        alerts:alertSlice.reducer,
        invitations:invitationSlice.reducer,
})



const persistedReducer = persistReducer(persistConfig,reducer);

export default configureStore({
    reducer:persistedReducer
});