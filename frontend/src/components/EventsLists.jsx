import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../redux/features/eventsSlice';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import '../index.css'
function EventsLists() {
    const { tokenData } = useSelector(state=> state.user);
    const [ token , setToken ] = useState('')
    const dispatch = useDispatch();
    const { eventsDetails} = useSelector(state=> state.events);
    const navigate = useNavigate()
    const [ postsPerPage ] = useState(5)
    const [ currentPage , setCurrentPage ] = useState(1)
    
    
    
    function truncate(str, n) {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const max =10

  //seting pagination 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const startPage = Math.max(1,currentPage- Math.floor(max/2))
  const endPage = Math.min(eventsDetails.length , startPage+max-1)
  const currentPosts = eventsDetails.slice(indexOfFirstPost , indexOfLastPost)


//change page
const paginate = (pageNumber)=> setCurrentPage(pageNumber)

const [itemOffset, setItemOffset] = useState(0);

const endOffset = itemOffset + postsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = eventsDetails.slice(itemOffset, endOffset);
const pageCount = Math.ceil(eventsDetails.length / postsPerPage);


// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * postsPerPage) % eventsDetails?.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
};




useEffect(()=>{
    getAllEvents()
},[])

useEffect(()=>{
    const token = localStorage.getItem("token");
    setToken(token)
},[])

      const getAllEvents = async () => {
        try {
            const userToken =tokenData;
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/event/getallevents`;
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
    
      //filtering upcoming events and excluding past events
      const upcomingEvents = eventsDetails?.filter(event => {
        const eventDate = new Date(event?.date);
        const currentDate = new Date();
        return eventDate >= currentDate;
      });
      return (
        <><><div className='text-center '>
          <h1 className='text-4xl font-medium mb-10'>All Upcoming Events</h1>
        </div><div className='flex flex-wrap gap-y-6 p-5  justify-center text-center gap-x-7 '>

            {upcomingEvents?.map((event, i) => (
              <div
                className="max-w-sm md:min-w-[410px] mb-16 bg-white border border-gray-200 rounded-lg p-2   shadow-lg "
                key={i}

              >
                <div className="p-5 rounded-md"
                  style={{ backgroundImage: `url(${event?.image})`, backgroundSize: 'cover', opacity: "" }}>
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
          {/* <div  className=' pagination'>


            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              pageRangeDisplayed={1}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              renderOnZeroPageCount={null}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'} />
          </div> */}
          </>
      );
      
}

export default EventsLists