import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import SignupForm from './pages/SignupForm'
import Home from './pages/Home';
import PrivateRoute from './utils/privateRoutes';
import UserProfilePage from './pages/UserProfilePage';
import EventViewPage from './pages/EventViewPage';
import LoginUserHostedEventsPage from './pages/LoginUserHostedEventsPage';
import UsersListPage from './pages/UsersListPage';
import InvitingFriendsPage from './pages/InvitingFriendsPage';
import InvitationPage from './pages/InvitationPage';

function routes() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm/>} />

        <Route path='/' element={<PrivateRoute ><Home/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute ><UserProfilePage/></PrivateRoute>}/>
        <Route path='/hosted-events' element={<PrivateRoute ><LoginUserHostedEventsPage/></PrivateRoute>}/>
        <Route path='/event-view/:id' element={<PrivateRoute ><EventViewPage/></PrivateRoute>}/>
        <Route path='/users' element={<PrivateRoute ><UsersListPage/></PrivateRoute>}/>
        <Route path='/invitefriends' element={<PrivateRoute ><InvitingFriendsPage/></PrivateRoute>}/>
        <Route path='/invitations' element={<PrivateRoute ><InvitationPage/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default routes