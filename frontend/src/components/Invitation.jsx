import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { setSocketdata } from '../redux/features/userSlice';
import { setInvitationData } from '../redux/features/invitationSlice';

function Invitation() {
  const { tokenData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { invitationsData } = useSelector(state=>state.invitations)

  console.log("invitations ",invitationsData)

useEffect(()=> {
  getInvitations()
},[])

const getInvitations = async()=> {
try {
const userToken = tokenData;
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};
const apiUrl = 'http://localhost:8080/api/getallinvitations'

const response = await axios.get(apiUrl,config)
dispatch(setInvitationData(response?.data?.events))
console.log(response)
} catch (error) {
toast.error("Something went wrong")
console.log(error)
}
}

    const columns = [ 
      {
        name:"Title",
        selector:(row) => row?.title,
        sortable:true
      },
      {
        name:"Place",
        selector:(row)=> row?.place,
        
      },
      {
        name:"Date",
        selector:(row)=> formatDate(row?.date),
        
      },
      {
        name:"Actions",
        selector:(row)=> <><button  className='bg-pink-400 p-1 px-2 mx-2 text-white rounded hover:bg-pink-300'>Accept</button><button onClick={()=>rejectInvitation(row?._id)}  className='bg-red-600 p-1 px-2 text-white rounded hover:bg-pink-300'>Reject</button></>
      },
     
    ];
    const customStyles = {
      headCells: {
        style: {
          background: '#293585',
          color: 'white',
        },
      },
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  

    const rejectInvitation = (invitationId)=>{
      try {
        console.log(invitationId)
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      }
    }

  return (
    <div className='p-28 '>
        <h1 className='text-center my-5 text-2xl font-medium'>Invitations</h1>
        <DataTable className='border' pagination  columns={columns} data={invitationsData} fixedHeader customStyles={customStyles} />

    </div>
  )
}

export default Invitation;