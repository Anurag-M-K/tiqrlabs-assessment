import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../redux/features/eventsSlice';
import { useNavigate } from 'react-router-dom';

function EventsLists() {
    const { tokenData } = useSelector(state=> state.user);
    const [ token , setToken ] = useState('')
    const dispatch = useDispatch();
    const { eventsDetails} = useSelector(state=> state.events);
    const navigate = useNavigate()
console.log("evendt ",eventsDetails)

useEffect(()=>{
    getAllEvents()
},[])

useEffect(()=>{
    const token = localStorage.getItem("token");
    setToken(token)
},[])

      const getAllEvents = async () => {
        try {
            const userToken =token;
            const apiUrl = `http://localhost:8080/api/event/getallevents`;
            const config = {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              };
              const response = await axios.get(apiUrl,config);
              dispatch(setEvents(response?.data?.events))

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
      }
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    
    
      return (
        <><div className='text-center'>
          <h1 className='text-4xl font-medium mb-10'>All Upcoming Events</h1>
        </div><div className='flex flex-wrap gap-y-6 p-5  justify-center text-center gap-x-7 '>

            {eventsDetails?.map((event, i) => (
            <div
            className="max-w-sm min-w-[410px] bg-white border border-gray-200 rounded-lg p-2   shadow-lg "
            key={i}
            
          >
                <div className="p-5 rounded-md"
                style={{ backgroundImage: `url(${event?.image})`, backgroundSize: 'cover',opacity:"" }}>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event?.title}</h5>
                  </a>
                  <p className='text-blue-300 font-medium '>{formatDate(event?.date)}</p>
                  <p className="mb-3 font-normal text-white ">{event?.description}</p>
                  <a onClick={() => navigate(`/event-view/${event?._id}`)} href="#" className="inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 border hover:scale-95 duration-300 dark:focus:ring-blue-800">
                    View Event
                      {/* <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg> */}
                  </a>
                </div>
              </div>
            ))}
          </div></>
      );
      
}

export default EventsLists