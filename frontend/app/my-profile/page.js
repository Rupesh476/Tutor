"use client"
import React,{useState,useContext} from 'react'
import profileImage from '../assets/user.jpg'
import Image from 'next/image'
import upload_icon from '../assets/upload_icon.png'
import {AppContext} from '../context/AppContext'
import {toast} from 'react-toastify'

const MyProfile = () => {

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [selectedImage, setSelectedImage] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading,setLoading] = useState(false)

  const handleProfileUpdate = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      
      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address || {}))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      const res = await fetch(`${backendUrl}/api/user/update-profile`,{ 
        
        method:'post',
        headers: {token},
        body: formData
      });

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData() 
        setIsEditing(false)
        setSelectedImage(false)
      } else{
        console.log(error);
        toast.error(data.message || "Failed to update profile")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating profile")
    } finally{
      setLoading(false)
    }
  }

  const handleChange = (e)=>{
    const {name,value} = e.target

    if (name === "city" || name === "country") {
      setUserData((prev)=> ({...prev, address:{...prev.address, [name]:value}}))
    }else{
      setUserData((prev)=> ({...prev, [name]:value}))
    }
  }

  if (!userData) return <div>Loading...</div>;

  return (
    userData && (
      <div className='mx-auto px-6 xl:px-32 py-28'>
        <div className='msx-w-sm w-full'>
          <div className='flex flex-col relative'>
            <div className='relative w-32 '>
              {selectedImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={URL.createObjectURL(selectedImage)} alt='profile-img' className='rounded-md object-cover w-32 h-32'/>
              ):(
              <Image src={userData.image ? userData.image : upload_icon} alt='profile-img'  width={100} height={100}  
              className='rounded-md object-cover w-32 h-32' />
              )}
              {isEditing && (
                <>
                <label htmlFor="image" className='absolute inset-0 flex-center bg-black/30 bg-opacity-50 rounded-md cursor-pointer transition-opacity hover:opacity-80'>
                  <span className='text-white absolute py-14 px-10 text-xs font-semibold'>Upload</span>
                </label>
                <input type="file" id='image' accept='image/*' hidden onChange={(e)=> setSelectedImage(e.target.files[0])} />
                </>
              )}
            </div>
            <h1 className='font-bold text-2xl mt-2'>{userData.name}</h1>
            <p className='text-gray-600'>{userData.email}</p>
          </div>
          <hr className='my-3'/>

          {/* personal details */}
          <h2 className='text-gray-500 mt-4 mb-4 font-bold text-xl'>Personal Details</h2>
          <div className='space-y-4'>
            <div className='flex  flex-col  sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-14'>Name :</label>
              {isEditing ? (
                <input type="text" name='name'  value={userData.name} onChange={handleChange} 
                className='regular-14 border-none bg-gray-50 px-5   p-0.5 shadow sm:w-2/3 rounded' />
              ):(
                <p className='mt-1 px-25 font-bold'>{userData.name}</p>
              )}
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-14'>Phone :</label>
              {isEditing ? (
                <input type="text" name='phone' value={userData.phone} onChange={handleChange} 
                className='regular-14 border border-none bg-gray-50 px-5 p-0.5 w-full sm:w-2/3 rounded' />
              ):(
                <p className='mt-1 px-25 font-bold'>{userData.phone}</p>
              )}
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-14'>Dat of Birth :</label>
              {isEditing ? (
                <input type="date" name='dob' value={userData.dob} onChange={handleChange} 
                className='regular-14 border p-0.5 border-none bg-gray-50 px-5 w-full sm:w-2/3 rounded' />
              ):(
                <p className='mt-1 px-17 font-bold'>{userData.dob}</p>
              )}
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-14'>Gender:</label>
              {isEditing ? (
                <select type="gender" name='gender' value={userData.gender} onChange={handleChange} 
                className='regular-14 border p-0.5 border-none bg-gray-50 px-5 w-full sm:w-2/3 rounded' >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </select>
              ):(
                <p className='mt-1 px-26 font-bold'>{userData.gender}</p>
              )}
            </div>
          </div>
          <hr className='my-3'/>
          {/* location Details */}
          <h1 className='text-xl text-gray-500 font-bold my-3'>Location Details</h1>
          <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-44'>City :</label>
              {isEditing ? (
                <input type="text" name='city' value={userData.address?.city || ""} onChange={handleChange}
                className='regular-14 border p-0.5 border-none bg-gray-50 px-5  w-full sm:w-2/3 rounded' />
              ):(
                <p className='mt-1  font-bold'>{userData.address?.city || ""}</p>
              )}
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center space-3'>
              <label className='bold-14 min-w-44'>Country :</label>
              {isEditing ? (
                <input type="text" name='country' value={userData.address?.country || ""} onChange={handleChange}
                className='regular-14 border  border-none bg-gray-50 px-5   w-full sm:w-2/3 rounded' />
              ):(
                <p className='mt-1  font-bold'>{userData.address?.country || ""}</p>
              )}
            </div>
          </div>
          <button
          onClick={()=> {
            if (isEditing) {
            handleProfileUpdate()
          }else {
            setIsEditing(true)
          }
        }}
        className='mt-10 bg-blue-600 min-w-64 py-2 text-white cursor-pointer rounded'
        disabled={loading}>
          {loading ? "updating..." : isEditing ? "Save" : "Edit Profile"} </button>
        </div>
      </div>
    )
  )
}

export default MyProfile