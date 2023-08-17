import React from 'react'
import Navbar from '../components/Navbar'
import UsersTable from '../components/UsersTable'
import Footer from '../components/Footer'

function UsersListPage() {
  return (
    <div className='h-screen'><Navbar /><UsersTable /> <Footer/></div>
  )
}

export default UsersListPage