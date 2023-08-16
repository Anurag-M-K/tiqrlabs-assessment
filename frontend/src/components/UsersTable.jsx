import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsersDetails } from '../redux/features/allUsersSlice';
import DataTable from 'react-data-table-component';

function UsersTable() {
  const { tokenData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { allUsersDetails } = useSelector(state=> state.allUsers);

console.log("allusers ",allUsersDetails)
useEffect(()=>{
  console.log("in useffect")
  getAllUsers() 
},[])

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
          console.log(response)
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
        
      }
    ];
    const customStyles = {
      headCells: {
        style: {
          background: '#293585',
          color: 'white',
        },
      },
    };
  return (
    <div className='p-20 '>
        <DataTable className='border' pagination  columns={columns} data={allUsersDetails} fixedHeader customStyles={customStyles} />
    </div>
  )
}

export default UsersTable