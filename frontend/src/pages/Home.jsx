import React from 'react'
import Navbar from '../components/Navbar'
import HomeContent from '../components/HomeContent'
import Footer from '../components/Footer'
import EventsLists from '../components/EventsLists'

function Home() {
  return (
    <>
<Navbar />
<HomeContent/>
  

<EventsLists/>
<Footer/>
    </>
  )
}

export default Home