import React from 'react'
import EventView from '../components/EventView'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function EventViewPage() {
  return (
    <><Navbar /><div className='mt-48'>

      <EventView />
    </div>
    <Footer />
    </>
    
  )
}

export default EventViewPage