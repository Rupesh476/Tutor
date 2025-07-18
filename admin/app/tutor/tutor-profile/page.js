"use client"
import React,{useContext,useState,useEffect} from 'react'
import {TutorContext} from '../../context/TutorContext'
import {AppContext} from '../../context/AppContext'
import Image from 'next/image'
import {toast} from 'react-toastify'

const Page = () => {

  const {tToken, setProfileData, profileData, getProfileData} = useContext(TutorContext)
  const {backendUrl,currency} = useContext(AppContext)
  const [isEditing,setIsEditing] = useState(false)

  const handleUpdateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const res = await fetch(`${backendUrl}/api/tutor/update-profile`, {
        method:'post',
        headers:{'Content-Type': 'application/json', tToken},
        body:JSON.stringify(updateData),
      });

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        setIsEditing(false)
        getProfileData()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

    useEffect(() => {
      if (tToken) {
        getProfileData()
      }
    },[tToken])

    
  return (
    <div className='px-2 -ml-10 lg:-ml-45 mr-10 sm:px-8 py-12 h-screen sm:pl-[23%] lg:w-11/12'>
      <div className='max-w-sm w-full'>
        <div className='flex flex-col relative'>
          <div className='relative w-32 h-32 overflow-hidden rounded-md'>
            {profileData.image && (
            <Image src={profileData.image} alt="" width={100} height={80} />
          )}
          <span className='absolute inset-0  bg-opacity-10'/>
          </div>
          <h1 className='text-2xl font-bold mt-4'>{profileData.name}</h1>
          <p className='text-gray-500'>{profileData.email}</p>
        </div>
        <hr  className='my-3'/>
        <div>
          <label className='font-bold min-w-44'>About</label>
          <p className='mt-1 text-gray-600'>{profileData.about}</p>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center space-3 mt-2'>
          <label className='font-bold min-w-44 text-gray-500'>Fees</label>
          {isEditing ? (
            <input type="text" name='fees' value={profileData.fees} onChange={(e)=> setProfileData(prev=>({...prev,fees: e.target.value}))}
            className='regular-14 border p-0.5 px-2 w-full sm:w-2/3 rounded'/>
          ) :(
            <p className='mt-1 font-bold'>{currency}{profileData.fees}</p>
          )}
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center space-3 mt-2'>
          <label className='font-bold min-w-44 text-gray-500'>Available</label>
          {isEditing ? (
            <input type="checkbox" name='available' checked={profileData.available} onChange={(e)=> isEditing && setProfileData((prev) => ({...prev, available: e.target.checked}))}
            className='regular-14 border cursor-pointer p-0.5 px-2 w-full sm:w-2/3 rounded'/>
          ) :(
            <p className='mt-1 font-bold'>{profileData.available ? 'Yes':'No'}</p>
          )}
        </div>
        <hr className='my-3'/>
        {/* location Details */}
        <h1 className='font-bold text-gray-500 my-3'>Location Details</h1>
        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center space-3'>
            <label className='font-bold min-w-44'>City</label>
            {isEditing ? (
              <input type="text" name='city' value={profileData.address?.city || ''} 
              onChange={(e)=> setProfileData(prev => ({...prev, address:{...prev.address, city:e.target.value}}))}
              className='regular-14 border p-0.5 px-2 w-full sm:w-2/3 rounded'/>
            ):(
              <p className='mt-1 font-bold'>{profileData.address?.city}</p>
            )}
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center space-3'>
            <label className='font-bold min-w-44'>Country</label>
            {isEditing ? (
              <input type="text" name='country' value={profileData.address?.country || ''} 
              onChange={(e)=> setProfileData(prev => ({...prev, address:{...prev.address, country:e.target.value}}))}
              className='regular-14 border p-0.5 px-2 w-full sm:w-2/3 rounded'/>
            ):(
              <p className='mt-1 font-bold'>{profileData.address?.country}</p>
            )}
          </div>
          <button onClick={()=> isEditing ? handleUpdateProfile() : setIsEditing(true)}
            className='mt-6 bg-blue-500 cursor-pointer  rounded-full py-2 text-white min-w-64'>
              {isEditing ? "Save Changes":'Edit Profile'}

          </button>
        </div>
      </div>
    </div>
  )
}

export default Page