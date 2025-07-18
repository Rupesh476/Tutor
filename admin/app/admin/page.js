'use client'
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import tutor from '../assets/tutor.png'
import client from '../assets/client.png'
import sessionIcon from '../assets/session.png'
import latest from '../assets/latest.png'
import Image from 'next/image'

const Page = () => {
  const { aToken, getDashData, cancelSession, dashData } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) return  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
  </div>

  return (
    <div className="px-2 sm:px-8 py-12 sm:pl-[8%]">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { icon: tutor, count: dashData.tutors, label: 'Tutors', bg: 'bg-[#d5eedd]' },
          { icon: client, count: dashData.clients, label: 'Clients', bg: 'bg-[#b5f0fc]' },
          { icon: sessionIcon, count: dashData.sessions, label: 'Sessions', bg: 'bg-[#f2a7a7]' }
        ].map(({ icon, count, label, bg }, i) => (
          <div key={i} className={`flex items-center gap-5 p-6 rounded-xl shadow-sm ${bg}`}>
            <Image src={icon} alt={label} width={40} height={40} className="w-10 hidden sm:block" />
            <div>
              <div className="text-xl font-bold">{count}</div>
              <p className="text-sm text-gray-700">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Sessions */}
      <div>
        <div className="flex items-center gap-3 bg-blue-950 text-white px-6 py-4 rounded-lg mb-4 shadow-md">
          <Image src={latest} alt="latest" width={32} height={32} className="invert" />
          <h2 className="font-bold text-lg">Latest Sessions</h2>
        </div>

        {dashData.latestSessions.length === 0 && (
          <div className="text-center py-6 text-gray-500">No recent sessions found.</div>
        )}

        <div className="space-y-4">
          {dashData.latestSessions.map((session, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 hidden md:inline">{i + 1}.</span>
                <div className="relative">
                  <Image
                    src={session.tutData.image}
                    alt={session.tutData.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10"
                  />
                </div>
                <span className="text-gray-800 font-medium">{session.tutData.name}</span>
              </div>

              <div className="text-gray-600 text-xs md:text-sm text-center md:text-left">
                {session.slotDate} | <br className="md:hidden" /> {session.slotTime}
              </div>

              <div className="flex flex-col gap-2 items-start md:items-end">
                {session.cancelled ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Cancelled</span>
                ) : session.isCompleted ? (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Completed</span>
                ) : session.payment ? (
                  <span className="px-3 py-1 mr-2 text-xs rounded-full bg-blue-100 text-blue-700">Paid</span>
                ) : (
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Unpaid</span>
                )}

                {!session.cancelled && !session.isCompleted && (
                  <button
                    onClick={() => cancelSession(session._id)}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer text-white text-xs px-3 py-1 rounded transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
