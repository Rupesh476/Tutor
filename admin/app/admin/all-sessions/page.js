'use client'
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {AppContext} from '../../context/AppContext'
import Image from 'next/image'

const Page = () => {
  const { sessions, getAllSessions, aToken, cancelSession } = useContext(AdminContext)
  const {currency, calculateAge} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllSessions()
    }
  }, [aToken])

  return (
    <div className='px-1  sm:px-8 py-5 screen sm:pl-[10%]'>
      <div className='max-h-[80vh] min-h-[60vh] overflow-auto'>
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 mb-5 bg-green-900 text-white items-center rounded text-[14px] font-medium'>
          <h1>#</h1>
          <h1>Client</h1>
          <h1>Age</h1>
          <h1>Tutor</h1>
          <h1>Date & Time</h1>
          <h1>Fees</h1>
          <h1>Status</h1>
        </div>
        {[...sessions].reverse().map((session, i) => (
          <div key={i} className="flex flex-wrap justify-between gap-2 md:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 mb-1 bg-white items-center rounded text-[13px] font-medium ">
            <h1 className='sm:hidden md:flex'>{i + 1}</h1>
            <div className='flex items-start gap-2'>
              <div className='relative overflow-hidden rounded-full'>
                <Image src={session.userData.image} alt='' width={40} height={40}
                className='rounded-full w-10 aspect-square object-contain' />
              <span className='inset-0 bg-black/10 absolute'/>
              </div>

              <p>{session.userData.name}</p>
            </div>
            <p className='sm:hidden md:flex'>{calculateAge(session.userData.dob)}</p>
            <div className='flex items-start gap-2'>
              <div className='relative overflow-hidden rounded-full'>
                <Image src={session.tutData.image} alt='' width={40} height={40}
                className='rounded-full w-10 aspect-square object-contain' />
              <span className='inset-0 bg-black/10 absolute'/>
              </div>
              <p>{session.tutData.name}</p>
            </div>
            <p className='max-lg:text-[12px]'>
              {session.slotDate} <br/> {session.slotTime}
            </p>
            <p>
              {currency}
              {session.amount}
            </p>
            <div className="flex flex-col gap-2 items-start">
  {/* Show status badge */}
  {session.cancelled ? (
    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Cancelled</span>
  ) : session.isCompleted ? (
    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Completed</span>
  ) : session.payment ? (
    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Paid</span>
  ) : (
    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Unpaid</span>
  )}

  {/* Cancel button if allowed */}
  <div className='flex flex-col gap-2'>
  {!session.payment && (
  <button
    onClick={() => cancelSession(session._id)}
    disabled={session.cancelled}
    className={`${session.isCompleted ? 'hidden' : 'block'} disabled:cursor-not-allowed disabled:bg-red-500
    ${session.cancelled ? 'bg-gray-500' : 'bg-amber-500'} max-md:px-2 py-1 text-xs rounded`}
  >
    {session.cancelled ? 'Cancelled' : 'Cancel'}
  </button>
)}



    <button disabled={session.isCompleted} 
      className={`${session.cancelled ? 'hidden' :'block'} disabled:cursor-not-allowed disabled:bg-green-500 cursor-pointer 
      ${session.isCompleted ? 'bg-green-500' : 'bg-amber-400'} px-2 py-1 max-md:px-1 text-xs rounded cursor-pointer`}>
        {session.isCompleted ? 'Completed': 'Complete'}
        </button>
</div>
</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
