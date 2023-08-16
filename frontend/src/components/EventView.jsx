import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function EventView() {
    const location = useLocation();
    const eventId = location.pathname.split('/').pop();
    const { eventsDetails } = useSelector(state=> state.events)
    const navigate = useNavigate()
    //finding event data from eventsDetails
    const selectedEvent = eventsDetails?.filter(event => event._id === eventId);

    console.log("selected events ",selectedEvent)
const formattedDate = new Date(selectedEvent[0].date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
return (
    <div className="profile-page p-20 ">
      <section className="flex relative  justify-center items-center  h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`
    }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="..." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJOi2pyfg14hb1e3waXJ5mceQkH4froE5TgnVQDkZts&s" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={()=> navigate(`/invitefriends/${selectedEvent[0]?._id}`)} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Invite Friends
                    </button>
                  </div>
                </div>
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="text-center flex flex-col justify-center items-center mt-12">
                <img className='rounded-full w-28 h-28 ' src={selectedEvent[0]?.image} alt="img" />
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {selectedEvent[0]?.title}
                </h3>
                <div className="text-sm leading-normal mt-0  text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                Venue : {selectedEvent[0]?.place}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Date - {formattedDate}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                   {selectedEvent[0]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </div>
      )
}

export default EventView