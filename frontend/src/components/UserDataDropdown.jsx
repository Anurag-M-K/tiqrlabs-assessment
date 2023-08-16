import React, { useState } from 'react'

function UserDataDropdown() {
    const [ isOpen , setIsOpen ] = useState(false)
  return (
    <div className='relative flex flex-col items-center w-[340px] h-[340px] rounded-lg '>
        <button onClick={()=> setIsOpen((prev)=>!prev)} className='bg-blue-400 p-4 w-full  flex items-center justify-between font-bold text-lg rounded-lg tracking-wider  border-transparent active:border-white duration-300 active:text-white '>dropdown
       
        </button>
        {
            isOpen && (
                <div className='bg-blue-400 absolute '>
                        <div>
                            <h3>hello</h3>
                            <h3>hello</h3>
                            <h3>hello</h3>

                        </div>
                </div>
            )
        }

    </div>
  )
}

export default UserDataDropdown