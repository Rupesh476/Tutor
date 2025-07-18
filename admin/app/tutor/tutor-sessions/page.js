"use client"
import React,{useEffect,useContext} from 'react'
import {TutorContext} from '../../context/TutorContext'
import Image from 'next/image'
import {AppContext} from '../../context/AppContext'

const Page = () => {

  const {tToken, sessions, getSessions,cancelSession,completeSession} = useContext(TutorContext)
  const {calculateAge,currency} = useContext(AppContext)

  useEffect(() => {
    if (tToken) {
      getSessions()
    }
  },[tToken])

  return (
    <div>
      <div className='px-1  sm:px-8 py-5 screen sm:pl-[10%] md:w-11/12'>
      <div className='max-h-[80vh] min-h-[60vh] overflow-auto'>
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 mb-5 bg-green-900 text-white items-center rounded text-[14px] font-medium'>
          <h1>#</h1>
          <h1>Client</h1>
          <h1>Age</h1>
          <h1>Payment</h1>
          <h1>Date & Time</h1>
          <h1>Fees</h1>
          <h1>Status</h1>
        </div>
        {[...sessions].reverse().map((session, i) => (
          <div key={i} className="flex flex-wrap justify-between gap-2 md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] grid-flow-col px-6 py-3 mb-1 bg-white items-center rounded text-[13px] font-medium ">
            <h1 className='sm:hidden md:flex'>{i + 1}</h1>
            <div className='flex items-start gap-2'>
              <div className='relative overflow-hidden rounded-full'>
                <Image src={session.userData.image} alt='' width={40} height={40}
                className='rounded-full w-10 aspect-square object-contain' />
              <span className='inset-0 bg-black/10 absolute'/>
              </div>

              <p>{session.userData.name}</p>
            </div>
            <p className='hidden md:flex'>{calculateAge(session.userData.dob)}</p>
            <p>{session.payment ? "Paid":"Not Paid"}</p>
            <p>
              {session.slotDate} <br/> {session.slotTime}
            </p>
            <p>
              {currency}
              {session.amount}
            </p>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-col gap-2 items-start">

<div className="flex flex-col gap-2 items-start">
  {/* After Cancelled */}
  {session.cancelled && (
    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Cancelled</span>
  )}

  {/* After Completed */}
  {session.isCompleted && (
    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Completed</span>
  )}

  {/* Show action buttons only if session is not completed or cancelled */}
  {!session.isCompleted && !session.cancelled && (
    <div className="flex flex-col gap-2">
      {/* Cancel Button (if not paid) */}
      {!session.payment && (
        <button
          onClick={() => {
            if (confirm("Are you sure you want to cancel this session?")) {
              cancelSession(session._id);
            }
          }}
          className="text-red-500 bg-gray-50 hover:bg-red-600 cursor-pointer hover:text-white px-3 py-1 text-xs rounded shadow"
        >
          Cancel
        </button>
      )}

      {/* Complete Button (if paid) */}
      {!session.payment && (
        <button
          onClick={() => {
            if (confirm("Are you sure you want to mark this session complete?")) {
              completeSession(session._id);
            }
          }}
          className="bg-amber-50 text-green-500 hover:bg-green-600 cursor-pointer hover:text-white  px-3 py-1 text-xs rounded shadow"
        >
          Complete
        </button>
      )}
    </div>
  )}
</div>

</div>




</div>
 </div>
          
        ))}
      </div>
    </div>
    </div>
  )
}

export default Page