"use client";
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { AdminContext } from '../../../context/AdminContext.js';
import upload_icon from '../../../assets/upload_icon.png'
import Image from 'next/image'
import {toast} from 'react-toastify'

const AddTutorPage = () => {
  const { router, backendUrl } = useContext(AppContext);
  const { aToken, setAtoken } = useContext(AdminContext);

  const [tutImg, setTutImg] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [subject, setSubject] = useState('Science')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [qualification, setQualification] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //handle image upload
  const handleImageChange = (e) => {
    setTutImg(e.target.files[0])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try{
    if (!tutImg) {
      return toast.error('Please select an image');
      setIsLoading(false);
      return;
    }

    if (!backendUrl) {
      setError('Backend URL is not configured. Contact the administrator.');
      setIsLoading(false);
      return;
    }

    //prepare data for backend

    const formData = new FormData()
    formData.append('image', tutImg)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('subject', subject)
    formData.append('fees', fees)
    formData.append('about', about)
    formData.append('qualification', qualification)
      formData.append("address",JSON.stringify({city,country}))

      //prepare data for add tutor
      const response = await fetch(`${backendUrl}/api/admin/add-tutor`, {
        method: 'POST',
        headers: {
          atoken: aToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to add tutor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Tutor added successfully')
        //clear all form fields
        setName('')
        setEmail('');
        setPassword('');
        setAbout('');
        setCity('');
        setCountry('');
        setQualification('');
        setSubject('');
        setExperience('');
        setFees('');
        setTutImg(null);
      }

      // Optionally update token or redirect
      if (data.token) {
        setAtoken(data.token);
      }
    } catch (err) {
      toast.error(err.message)
      setError(err.message || 'An error occurred while adding the tutor');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='px-2 sm:px-10 py-4 h-screen sm:pl-[10%]'>
      <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row gap-4 lg:gap-12 medium-14'>
        {/* -----left side ------ */}
        <div className='flex gap-y-3 flex-col'>
          <div className='w-full'>
            <h1 className='font-bold'>Tutor Name</h1>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter tutor name' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
          </div>
          <div className='w-full'>
            <h1 className='font-bold'>Tutor Email</h1>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter tutor email' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
          </div>
          <div className='w-full'>
            <h1 className='font-bold'>Tutor Password</h1>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter tutor password' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
          </div>
          <div className='w-full'>
            <h1 className='font-bold'>About Tutor </h1>
            <textarea rows={5} onChange={(e)=>setAbout(e.target.value)} value={about} placeholder='Describe about tutor ' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
          </div>
          <div className='w-full'>
            <h1 className='font-bold'>Tutor Address</h1>
            <div className='flex gap-2 w-full'>
            <input type="text" onChange={(e)=>setCity(e.target.value)} value={city} placeholder='Enter tutor city' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
            <input type="text" onChange={(e)=>setCountry(e.target.value)} value={country} placeholder='Enter tutor country' className='px-3 py-1.5 ring-1 ring-slate-900/10 border-none rounded bg-gray-50 mt-1 w-full' />
          </div>
          </div>

            <button type='submit' className='hidden lg:block bg-blue-500 text-white rounded mt-3 max-w-44 sm:w-full'>Add Tutor</button>
        </div>
        {/* ----Right side ------- */}
        <div className='flex gap-y-3 flex-col'>
          {/* ------ qualification ------ */}
          <div className='w-full'>
            <h1 className='font-bold'>Qualification</h1>
            <input type='text' onChange={(e)=>setQualification(e.target.value)} value={qualification} placeholder='Enter qualification' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-gray-50 mt-1 w-full' />
          </div>
           {/* ------ Subjects ------ */}
          <div className='w-full'>
            <h1 className='font-bold'>Subject</h1>
            <select onChange={(e)=>setSubject(e.target.value)} value={subject} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-gray-50 mt-1 sm:w-full' >
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Language">Language</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Arts">Arts</option>
              <option value="Computer">Computer</option>
              </select>
          </div>
           {/* ------ experience ------ */}
          <div className='w-full'>
            <h1 className='font-bold'>Experince</h1>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='px-3 py-2 ring-1 ring-slate-900/10 rounded bg-gray-50 mt-1 sm:w-full' >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
              <option value="11 Year">11 Year</option>
              </select>
          </div>
           {/* ------ fees ------ */}
          <div className='w-full'>
            <h1 className='font-bold'>Fees</h1>
            <input type='number' onChange={(e)=>setFees(e.target.value)} value={fees} min={5} placeholder='Enter fees' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-gray-50 mt-1 w-20' />
          </div>
          {/* image */}
          <div className='w-full'>
            <h1 className='font-bold'>Image</h1>
            <label htmlFor="tutImg">
              <Image src={tutImg ? URL.createObjectURL(tutImg) : upload_icon} alt=""  width={50} height={50}
              className='w-14 h-14 aspect-square object-cover ring-1 ring-slate-900/5 bg-blue-50 rounded-lg' />
              <input onChange={handleImageChange} type="file" name='tutImg' id='tutImg' hidden />
            </label>
          </div>
          <button type='submit' className='block lg:hidden bg-blue-500 text-white rounded mt-3 max-w-44 sm:w-full'>Add Tutor</button>
        </div>
      </form>
    </div>
  );
};

export default AddTutorPage;