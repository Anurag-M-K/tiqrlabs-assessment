import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsersDetails } from "../redux/features/allUsersSlice";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";



function InvitingFriendsTable() {
  const location = useLocation();
  const eventId = location.pathname.split('/').pop();
  const { tokenData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { allUsersDetails } = useSelector((state) => state.allUsers);
  const { userDetails } = useSelector((state) => state.user);
  const [records, setRecords] = useState(allUsersDetails);

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    setRecords(allUsersDetails);
  }, [allUsersDetails]);



  const getAllUsers = async () => {
    try {
      const userToken = tokenData;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const apiUrl = `http://localhost:8080/api/allusers`;
      const response = await axios.get(apiUrl, config);
      console.log(response);
      dispatch(setAllUsersDetails(response?.data.users));
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "Invite",
      selector: (row) => (
        <button
          onClick={() => handleInviteClick(row)}
          className="bg-pink-400 p-1 px-2 text-white rounded hover:bg-pink-300"
        >
          Invite
        </button>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        background: "#293585",
        color: "white",
      },
    },
  };

  const handleInviteClick = async (user) => {
    try {
      const userToken = tokenData;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const requestData = {
        eventId: eventId    // The event ID you want to pass
      };
      
      const apiUrl = `http://localhost:8080/api/invite/${user._id}`;
      const response = await axios.post(apiUrl, requestData   , config);

      // Handle success
      toast.success('Invitation sent successfully!');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
  
  const handleFilter = (event) => {
    const searchString = event.target.value.toLowerCase();
    const newData = allUsersDetails.filter((row) => {
      return row.username.toLowerCase().includes(searchString);
    });
    setRecords(newData);
  };

  return (
    <div className="p-28 ">
      <h1 className="text-center my-5 text-2xl font-medium">
        Invite Your Friends here
      </h1>
      <div className="text-end m-5">
        <input
          className="border-2 border-black rounded"
          onChange={handleFilter}
          type="text"
        />
      </div>
      <DataTable
        className="border"
        pagination
        columns={columns}
        data={records}
        fixedHeader
        customStyles={customStyles}
      />
    </div>
  );
}

export default InvitingFriendsTable;
