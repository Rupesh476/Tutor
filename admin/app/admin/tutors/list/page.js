/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../../context/AdminContext'
import Image from 'next/image'

const Page = () => {
  const { tutors, aToken, getAllTutors ,changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) getAllTutors()
  }, [aToken])

  return (
    <div className="px-4 sm:px-8 py-8 min-h-screen sm:pl-[23%] bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Tutor List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {tutors?.map((tutor, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-md bg-white group transition-transform hover:scale-[1.02]"
          >
            <div className="w-full h-48 relative">
              <Image
                src={tutor.image}
                alt={tutor.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="p-4 text-sm text-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    tutor.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <span className="text-xs font-medium">
                  {tutor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <h2 className="font-semibold text-base truncate">{tutor.name}</h2>
              <p className="text-gray-600 text-sm truncate">{tutor.subject}</p>
            </div>

            <div className="absolute inset-0 flex items-end justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => changeAvailability(tutor._id)}
                className="bg-blue-700 text-white font-semibold px-2 py-2 mb-4 cursor-pointer rounded-md text-xs hover:bg-gray-100 hover:text-gray-800 transition"
              >
                Switch Availability
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {!tutors?.length && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tutors found.</p>
        </div>
      )}
    </div>
  )
}

export default Page
