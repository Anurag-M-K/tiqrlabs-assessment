  import React from 'react'
  import { useSelector } from 'react-redux';

  function LoginUserHostedEvents() {
    const { eventsDetails} = useSelector(state=> state.events);
    const { userDetails} = useSelector(state=> state.user);

    console.log("userdetaisl from login ",userDetails)
  // Filter upcoming events based on date
  const upcomingEvents = eventsDetails.filter(event => new Date(event.date) > new Date());
console.log('upcoming events ',upcomingEvents)
      return (
          <>
          {/* <div className='text-center'>
            <h1 className='text-4xl font-medium mb-10'>All Upcoming Events</h1>
          </div> */}
          {upcomingEvents?.map((events,i)=>(

          <div className='flex flex-wrap  gap-y-6 p-5  justify-center text-center gap-x-7 '>

                <div className="max-w-sm bg-white border    border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700" >
                  <a href="#">
                    <img className="rounded-t-lg hover:scale-95 transition duration-300 " src={events?.image} alt="sdsdf" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{events?.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{events?.description}</p>
                    <a  href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      View Event
                      <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
            </div>
          ))}
          </>
        );
  }

  export default LoginUserHostedEvents