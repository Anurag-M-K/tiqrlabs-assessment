import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { FiTwitter } from 'react-icons/fi'
function Footer() {
  return (
    <div class="grid grid-cols-1 h-36  mt-32  bg-gray-800 text-white">

  <div class="flex flex-col justify-center  items-center">
    <h3 class="text-2xl mt-5">tiqrlabs</h3>
    <h2 class="text-center">Reowned brand to incoperate
happiness to your life</h2>
  </div>
  <div class="flex  justify-end mx-5 items-center">
    <h2 className='mx-2'>Contact us :</h2>  <BsInstagram /> <AiOutlineLinkedin className='mx-2' size={20}/> <FiTwitter/>
  </div>
</div>
  )
}

export default Footer