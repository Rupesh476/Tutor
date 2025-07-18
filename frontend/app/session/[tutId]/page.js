'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { FaLocationDot } from 'react-icons/fa6'
import SimilarTutors from '../../components/SimilarTutors'
import { toast } from 'react-toastify'
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Session = () => {
  const { tutId } = useParams()
  const { tutors, currency, router,getTutorsData ,backendUrl,token} = useContext(AppContext)
  
  const [tutorInfo, setTutorInfo] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [selectedTime, setselectedTime] = useState("")

  useEffect(() => {
    const tutor = tutors.find((t) => t._id === tutId);
    setTutorInfo(tutor)
    console.log(tutorInfo);
  }, [tutors, tutId])

  //Generate available slots
useEffect(()=>{
    if (!tutorInfo) return 

    const generateSlots = ()=>{
    const today = new Date()
    const slotsPerDay = []

    for(let i =  0; i < 7; i++){
        const date = new Date(today)
        date.setDate(today.getDate()+i)

        const daySlots = []
        const startTime = new Date(date)
        const endTime = new Date(date)

        //for today, start at the next available at least 1 hour later
        if (i === 0) {
            startTime.setHours(Math.max(date.getHours()+1, 10))
            startTime.setMinutes(date.getMinutes() > 30 ? 30 :0)
        } else{
            startTime.setHours(10,0,0,0)
        }
        endTime.setHours(21,0,0,0)

        //create slots every 30 minutes
        while (startTime < endTime) {
            const day = startTime.getDate()
            const month = startTime.getMonth() + 1
            const year = startTime.getFullYear()
            const slotDate = `${day}/${month}/${year}`
            const slotTime = startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })

            //check if slot is available
            const isSlotAvailable = !tutorInfo.slots_booked?.[slotDate]?.includes(slotTime)
            
            if (isSlotAvailable) {
              daySlots.push({
                datetime: new Date(startTime), 
                time: slotTime,
                dateString: slotDate,
            })
            }

            startTime.setMinutes(startTime.getMinutes() +30)
        }
        slotsPerDay.push(daySlots)
    }
    setAvailableSlots(slotsPerDay)
    }
    generateSlots()
},[tutorInfo])


  useEffect(() => {
    const tutor = tutors.find((t) => t._id === tutId);
    setTutorInfo(tutor)
  }, [tutors, tutId])

  // 🔐 Prevent error when tutorInfo is null
  if (!tutorInfo) return <p className='text-center py-10'>Loading...</p>;

  const bookSession = async () => {
    if (!token) {
      toast.warn('Please login to book a session')
      router.push('/login')
      return
    }
    try {
      const date = availableSlots[selectedDayIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = `${day}/${month}/${year}`

      const res = await fetch(`${backendUrl}/api/user/book-session`,{
        method: 'post',
        headers:{'Content-Type': 'application/json',token},
        body: JSON.stringify({tutId,slotDate, slotTime:selectedTime}),
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        router.push('/my-sessions')
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
  <div className="max-w-screen-xl mx-auto px-4 mt-18 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2  items-start">
        {/* Tutor Image */}
        <div className="w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={tutorInfo.image || "/default-profile.png"}
            alt="Tutor Profile"
            width={444}
            height={444}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Tutor Details */}
        <div className='space-y-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h2 className='text-3xl font-bold'>{tutorInfo.name}</h2>
              <p className='text-gray-600 text-lg'>{tutorInfo.qualification}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                tutorInfo.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {tutorInfo.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div className='flex justify-between rounded-xl border p-4 shadow-sm text-sm font-medium bg-white'>
            <div className='text-center flex-1'>
              <p className='text-gray-500'>Experience</p>
              <p>{tutorInfo.experience}</p>
            </div>
            <div className='w-px bg-gray-300 mx-3'></div>
            <div className='text-center flex-1'>
              <p className='text-gray-500'>Subject</p>
              <p>{tutorInfo.subject}</p>
            </div>
            <div className='w-px bg-gray-300 mx-3'></div>
            <div className='text-center flex-1'>
              <p className='text-gray-500'>Fee</p>
              <p>{currency}{tutorInfo.fees}/30min</p>
            </div>
          </div>

          <p className='flex items-center gap-2 text-gray-600'>
            <FaLocationDot className='text-lg' />
            {tutorInfo.address.city}, {tutorInfo.address.country}
          </p>

          <div>
            <h3 className='text-xl font-semibold mb-2'>About Me</h3>
            <p className='text-gray-700 leading-relaxed text-sm'>
              {tutorInfo.about}
            </p>
            {/* Booking Slots */}
            <div className='mt-8'>
              <p className='text-xl mb-3'>Booking Slots</p>

              {/* Days horizontal scroll */}
              <div className='flex gap-3 overflow-x-scroll pb-2'>
                {availableSlots.map((slots,index)=>(
                  <div key={index} onClick={()=>setSelectedDayIndex(index)} className={`text-center py-6 min-w-15  rounded-full cursor-pointer ${selectedDayIndex === index ? 'bg-blue-500 text-white'  : 'border border-gray-300'}`} >
                    <div className='medium-14'>
                      {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
                    </div>
                    <div className='medium-14'>
                      {slots[0] && slots[0].datetime.getDate()}
                    </div>
                  </div>
                ))}
              </div>
              {/*  time slots scroll */}
              <div className='flex gap-3 overflow-x-scroll mt-4 max-w--[777px] pb-8'>
                {availableSlots[selectedDayIndex]?.map((slot, i)=>(
                  <div key={i} onClick={()=>setselectedTime(slot.time)} className={`text-xs font-light flex items-center justify-center py-2 min-w-20 pt-2 rounded-full cursor-pointer ${slot.time === selectedTime ? "bg-blue-500 text-white " : "text-gray-800 border border-gray-300"}`}>
                    {slot.time.toLowerCase()}
                  </div>
                ))}
              </div>
              <button onClick={bookSession} className='bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-2xl mt-4'>Book Session</button>
            </div>
          </div>
        </div>
      </div>

      {/*   Similar Tutors */}
      <SimilarTutors tutId={tutId} subject={tutorInfo.subject}/>
    </div>
  )
}

export default Session
