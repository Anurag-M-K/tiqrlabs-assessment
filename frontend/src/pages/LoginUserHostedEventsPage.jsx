import React from 'react'
import LoginUserHostedEvents from '../components/LoginUserHostedEvents'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LoginUserHostedEventsPage() {
  return (
    <><Navbar />
    <div className='flex justify-center items-center   flex-wrap mt-20 '>

    <LoginUserHostedEvents /> 
    </div>
    <Footer/></>
  )
}

export default LoginUserHostedEventsPage