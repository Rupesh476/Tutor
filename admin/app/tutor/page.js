"use client"
import React,{useContext,useEffect} from 'react'
import {TutorContext} from '../context/TutorContext'
import {AppContext} from '../context/AppContext'
import Image from 'next/image'
import earnings from '../assets/earnings.png'
import client from '../assets/client.png'
import session from '../assets/session.png'
import latest from '../assets/latest.png'

const Page = () => {

  const {dashData, getDashData, tToken, completeSession, cancelSession} = useContext(TutorContext)
  const {currency} = useContext(AppContext)

  useEffect(() => {
if (tToken) {
  getDashData()
}
  },[tToken])

  if (!dashData) return  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
  </div>

  return (dashData &&  (
    <div className='px-2 sm:-ml-18 sm:px-8 py-12 h-screen sm:pl-[23%] lg:w-11/12'>
      {/* container for Earnings clients & Sessions cards */}
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex items-start gap-7 p-5 bg-[#d5eedd] md:min-w-56 rounded'>
          <Image src={earnings} alt='' width={40} height={40} className='hidden sm:flex w-8'/>
        <div>
          <div className='font-bold'>{currency} {dashData.earnings}</div>
          <p className='text-gray-900'>Earnings</p>
        </div>
        </div>
        <div className='flex items-start gap-7 p-5 bg-[#fff4d2] md:min-w-56 rounded'>
          <Image src={client} alt='' width={40} height={40} className='hidden sm:flex w-8'/>
        <div>
          <div className='font-bold'>{dashData.clients}</div>
          <p className='text-gray-900'>Clients</p>
        </div>
        </div>
        <div className='flex items-start gap-7 p-5 bg-[#d1e8ff] md:min-w-56 rounded'>
          <Image src={session} alt='' width={40} height={40} className='hidden sm:flex w-8'/>
        <div>
          <div className='font-bold'> {dashData.sessions}</div>
          <p className='text-gray-900'>Sessions</p>
        </div>
        </div>
      </div>
      {/* Latest sessions */}
      <div className='mt-4'>
        <div className='flex gap-3 px-6 py-3 mb-4 bg-green-900 text-white items-center rounded'>
          <Image src={latest} alt='' width={40} height={40} className='w-8 invert-[100%]' />
          <h1>Latest Sessions</h1>
        </div>
        <div>
          {dashData.latestSessions.map((session, i) => (
            <div key={i}
            className='flex flex-wrap justify-between gap-2 sm:grid grid-cols-[2fr_2fr_1fr] px-6 mb-1 bg-white'>
              <div className='flex items-center gap-8'>
                <h1 className='text-xl max-sm:hidden'>{i + 1}</h1>
                <div className='flex items-start gap-x-2'>
                  <div className='relative overflow-hidden rounded-full'>
                    <Image src={session.userData.image} alt='' width={40} height={40}
                    className='rounded-full w-10 aspect-square object-contain'/>
                    <span className='inset-0 bg-black/10 absolute'/>
                  </div>
                  <p>{session.userData.name}</p>
                </div>
              </div>
              <p>{session.slotDate} | {session.slotTime}</p>
              <div className='flex flex-col gap-2'>
                <button onClick={()=> cancelSession(session._id)} disabled={session.cancelled}
                  className={`${session.isCompleted ? "block":"hidden"} disabled:cursor-not-allowed disabled:text-white
                  ${session.cancelled ? "bg-amber-600 " : "bg-gray-500"} max-md:px-1 py-1 text-xs rounded`}>
                    {session.cancelled ? "Cancelled": 'Cancel'}
                </button>

                <button onClick={()=> completeSession(session._id)} disabled={session.isCompleted}
                  className={`${session.cancelled ? 'hidden':'block'} disabled:cursor-not-allowed disabled:text-white 
                  ${session.isCompleted ? 'bg-green-500': 'bg-green-400 '} max-md:px-1 py-1 text-xs text-black rounded`}>
                    {session.isCompleted ? 'Completed':'Complete' }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
)
}

export default Page