import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsersDetails } from '../redux/features/allUsersSlice';
import DataTable from 'react-data-table-component';
import {io} from 'socket.io-client';
import { setSocketdata } from '../redux/features/userSlice';

function Invitation() {
  const { tokenData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket , setSocket ] = useState(null)
  const { allUsersDetails } = useSelector(state=> state.allUsers);
  const [user,setUser] = useState("");
  const  { userDetails } = useSelector(state=>state.user)
useEffect(()=>{
  getAllUsers() 
},[])


useEffect(()=>{
    setSocket(io("http://localhost:5000"))
      },[])
      
    useEffect(()=>{
       socket?.emit("newUser",userDetails)
    },[socket,userDetails])

    const getAllUsers = async () => {
        try {
          const userToken = tokenData;
          const config = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          };
          const apiUrl = `http://localhost:8080/api/allusers`;
          const response = await axios.get(apiUrl,config)
          dispatch(setAllUsersDetails(response?.data.users));
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    };

    const columns = [ 
      {
        name:"Name",
        selector:(row) => row?.username,
        sortable:true
      },
      {
        name:"Email",
        selector:(row)=> row?.email,
        
      },
      {
        name:"Actions",
        selector:(row)=> <><button onClick={() => handleInviteClick(row)} className='bg-pink-400 p-1 px-2 mx-2 text-white rounded hover:bg-pink-300'>Accept</button><button onClick={() => handleInviteClick(row)} className='bg-red-600 p-1 px-2 text-white rounded hover:bg-pink-300'>Reject</button></>
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


    const handleInviteClick = (user) => {
        try {
        //   const socket = io ('http://localhost:5173'); // Replace with your Socket.IO server URL
    
          socket.emit('send-invitation', {
            sender:userDetails?.username , // You might need to adjust this based on your API's requirements
            recievername:user.username,
            invitation:"Invitation here"
            // Add any other data you need to send as part of the invitation
          });
    
          // Handle success
          console.log('Invitation sent');
          console.log(socket)
          toast.success('Invitation sent successfully!');
          console.log("socket ",socket)
          dispatch(setSocketdata(socket))
        } catch (error) {
          // Handle error
          console.error('Error sending invitation:', error);
          toast.error('Error sending invitation');
        }
      };

  return (
    <div className='p-28 '>
        <h1 className='text-center my-5 text-2xl font-medium'>Invitations</h1>
        <DataTable className='border' pagination  columns={columns} data={allUsersDetails} fixedHeader customStyles={customStyles} />

    </div>
  )
}

export default Invitation;