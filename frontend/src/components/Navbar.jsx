import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import EventAddForm from "./EventAddForm";

const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Users",
    link: "/users",
  },
 

];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen , setModalOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state?.user);
  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("secrete");
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <div  className="bg-gray-800 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => setIsOpen(false)} className="flex items-center">
            <a className="text-white" href="/">
              Navbar
            </a>
          </div>
          {/* ?navlinks */}
          <div className="hidden md:block" >
            <div className="ml-10 flex items-baseline space-x-4 ">
              <div className="ml-10 flex items-baseline space-x-4 ">
                {navLinks?.map((link, index) => (
                  <a
                    key={index}
                    className="text-gray-300 transition hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md font-medium"
                    href={link?.link}
                  >
                    {link?.title}
                  </a>
                ))}
                {userDetails ? (
                  <div className="flex   gap-x-2 justify-center items-center">
                          {isOpen && (
              <div className="mt-48  bg-gray-600    border border-2-h shadow-sm absolute">
                <div className="bg-gray-600">
                  <h3 className="border-b  cursor-pointer hover:scale-95 transition duration-300  p-2"> <button
            className=" text-white cursor-pointer font-medium"
            onClick={() => setModalOpen(true)} // Toggle modal open
          >
            Add Event
          </button></h3>

                  <h3 onClick={()=>navigate("/profile")} className="border-b bg-gray-600 text-white font-medium cursor-pointer hover:scale-95 transition duration-300  p-2">Profile</h3>
                  <h3 onClick={()=>navigate("/hosted-events")} className="border-b bg-gray-600 text-white font-medium cursor-pointer hover:scale-95 transition duration-300 p-2">Hosted Events</h3>
                  <h3
                      className="rounded text-white p-1 px-2 hover:scale-95 transition duration-300"
                      onClick={handleLogout}
                    >
                      Logout
                    </h3>
                </div>
              </div>
            )}
            <div className="">
            </div>
                    {" "}
                    <CgProfile color="white" size={20} />
                    <h2
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="text-white cursor-pointer font-medium"
                    >
                      {userDetails?.username}
                    </h2>
          
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
      
          </div>

          {/* humburger button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open Main Menu</span>
              {open === true ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {open ? (
        <div className="md:hidden ">
          <div className="ox-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href={link?.link}
              >
                {link?.title}
              </a>
            ))}
            {userDetails ? (
              <>
                <h2>{userDetails?.username}</h2>
                <button>Logout</button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : null}
      <Toaster />
       <EventAddForm setModalOpen={setModalOpen} modalOpen={modalOpen}/> 

    </div>
  );
}

export default Navbar;


