'use client'
import React, { useContext ,useState, useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import Image from 'next/image'
import {toast} from 'react-toastify'

const MySessions = () => {
  const { tutors, token, currency ,backendUrl ,getTutorsData} = useContext(AppContext)
  const [sessions, setSessions] = useState([])

  const getUserSessions = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/sessions`, {
        method: 'GET',
        headers: { token }
      })
      const data = await res.json()
      if (data.success) {
        setSessions(data.sessions.reverse()) 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelSession = async (sessionId) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/cancel-session`,{
        method:'post',
        headers:{'Content-Type':'application/json',token},
        body: JSON.stringify({sessionId})
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        getUserSessions()
        getTutorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const sessionStripe = async(sessionId) => {
    try {
      const res = await fetch(`${backendUrl}/api/user/payment-stripe`, {
        method:'post',
        headers:{'Content-Type': 'application/json', token},
        body: JSON.stringify({sessionId})
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = data.session_url
      }else{
        toast.error(error.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const updatePaymentStatus = async () =>{
      try {
        const currentUrl = new URL(window.location.href)
        const success = currentUrl.searchParams.get('success')
        const sessionId = currentUrl.searchParams.get('sessionId')
        
        if (success === 'true' && sessionId) {
          const res = await fetch(`${backendUrl}/api/user/verify-stripe?sessionId=${sessionId}`,
          {
            method: 'GET',
            headers: { token }
          })
          const data = await res.json()
          console.log('verification response', data);
          if (data.success) {
            toast.success('payment successfull',data.message)
            getUserSessions()
          } else{
            toast.error(data.message)
          }
        }else{
          console.log('Payment not successful or sessionId missing');
        }
      } catch (error) {
        console.log(error);
      toast.error(error.message)
      }
    }
    if(token){
    updatePaymentStatus()
    }
  },[token])


  useEffect(() => {
    if (token) {
      getUserSessions()
    }
  }, [token])

  return (
    <div className="mt-28 p-4 xl:px-30 space-y-4">
      {(!sessions || sessions.length === 0) ? (
        <div className="text-center text-gray-500 mt-10">
          No sessions booked yet.
        </div>
      ) : (
        sessions.map((session, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4 transition hover:shadow-lg"
          >
            {/* Tutor Image */}
            <div className="relative w-28 h-28 mt-3 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0">
              <Image
                src={session.tutData.image}
                alt="Tutor"
                width={125}
                height={125}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Tutor Info */}
            <div className="flex flex-center justify-between w-full">
              <div className="space-y-1">
                <h1 className="text-lg font-semibold capitalize">
                  {session.tutData.name}
                </h1>
                <p className="text-sm text-gray-700">{session.tutData.qualification}</p>
                <p className="text-sm">
                  <span className="font-medium">Subject:</span> {session.tutData.subject}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Address:</span> {session.tutData.address.city}, {session.tutData.address.country}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Fees:</span> {currency}{session.tutData.fees}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Date & Time:</span> {session.slotDate} | {session.slotTime}
                </p>
              </div>

              {/* Pay Button */}
              <div className="mt-3 flex flex-col gap-2 sm:gap-4">
                {!session.cancelled && (
                <button onClick={()=> sessionStripe(session._id)} disabled={session.payment} className={`${ session.cancelled ? "hidden" : "block" }
                disabled:cursor-not-allowed disabled:bg-green-500 items-center mt-5 pr-10 mr-5 ${session.payment || session.isCompleted ? 'bg-blue-600' : 'bg-gray-500'}  cursor-pointer text-white text-sm px-8 py-1.5 rounded hover:bg-blue-700 transition`}>
                  {session.isCompleted ? 'Completed' : session.payment ? 'Paid':'Pay'}
                </button>
                )}
                <button onClick={()=> cancelSession(session._id)} disabled={session.cancelled} className={`${session.isCompleted || session.payment ? "hidden" : "block" }
                disabled:cursor-not-allowed disabled:bg-red-500 items-center mt-5  mr-2 ${session.cancelled ? 'bg-blue-600' : 'bg-gray-500'}  cursor-pointer text-white text-sm px-8 py-1.5 rounded hover:bg-blue-700 transition`}>
                  {session.cancelled ? 'Cancelled' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MySessions
