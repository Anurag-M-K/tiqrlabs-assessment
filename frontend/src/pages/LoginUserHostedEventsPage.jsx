import React from 'react'
import LoginUserHostedEvents from '../components/LoginUserHostedEvents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LoginUserHostedEventsPage() {
  return (
    <><Navbar />
<h1 className='text-center my-5 text-3xl font-medium mt-10'>YOUR EVENTS</h1>
    <div className='flex justify-center items-center   flex-wrap mt-20 pb-14 '>
    <LoginUserHostedEvents /> 
    </div>
    <Footer/></>
  )
}

export default LoginUserHostedEventsPage