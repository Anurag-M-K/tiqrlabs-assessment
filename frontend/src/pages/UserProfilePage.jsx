import React from 'react'
import Navbar from '../components/Navbar'
import UserProfile from '../components/UserProfile'
import Footer from '../components/Footer'

function UserProfilePage() {
  return (
    <>
<Navbar/>
<div className='mt-56 md:p-20'>

<UserProfile/>
</div>
<Footer/>
    </>
  )
}

export default UserProfilePage