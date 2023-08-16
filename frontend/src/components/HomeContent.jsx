import React from 'react'

function HomeContent() {
  return (
    <div  className="grid p-5 sm:grid-cols-2 h-screen">
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl uppercase tracking-wider  shadow-sm ">Celebrate with TiqrLabs</h1>
      <h4 className="sm:text-2xl text-xl mt-6 mb-3" >A platform  to manage your events </h4>
      <h4 className="sm:text-2xl text-xl  mb-3"> Trusted by 4000+ users</h4>
      <button className="bg-blue-600 text-white p-2 rounded-md hover:scale-90 transition duration-300">Get started</button>
    </div>
    <div  className="flex justify-center items-center">
      <img className="hover:scale-90 duration-300 transition ease-in-out" src="https://media.istockphoto.com/id/1430871384/vector/event-planner-template-hand-drawn-cartoon-flat-illustration-with-planning-schedule-time.jpg?s=612x612&w=0&k=20&c=Aa-8uNDJCHmiilHB5A9-VYrbUmy5GhYG4VIfEtr9hmE=" alt="d" />
    </div>
  </div>
  )
}

export default HomeContent