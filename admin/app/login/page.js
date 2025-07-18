"use client";
import React, { useState,useContext } from 'react';
import Image from 'next/image';
import loginImg from '../assets/login.png';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you have lucide-react for icons
import {AppContext} from '../context/AppContext'
import {AdminContext} from '../context/AdminContext.js'
import {TutorContext} from '../context/TutorContext'
import {toast} from 'react-toastify'

const Page = () => {

  const {router,backendUrl} = useContext(AppContext)
  const {setAtoken} = useContext(AdminContext)
  const {setTToken} = useContext(TutorContext)
  const [currState, setCurrState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Add your authentication logic here
    try {
      if (currState === "Admin") {
        const response = await fetch(`${backendUrl}/api/admin/login`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
              body: JSON.stringify({email,password}),
        });
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('aToken',data.token)
          setAtoken(data.token)
          router.push('/admin')
        }
        
      } else{
        const res = await fetch(`${backendUrl}/api/tutor/login`,{
          method:'post',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({email,password}),
        })
        const data = await res.json()
        if (data.success) {
          localStorage.setItem('tToken', data.token)
          setTToken(data.token)
          router.push('/tutor-dashboard')
          
          
        } else{
          toast.error(data.message)
        }
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Image side */}
        <div className="hidden lg:block w-1/2 relative">
          <Image
            src={loginImg}
            alt="Login illustration"
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent" />
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {currState} <span className="text-blue-600">Login</span>
            </h1>
            <p className="mt-2 text-gray-600">Access your admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              {currState === 'Admin' ? (
                <p onClick={()=>setCurrState('Tutor')} className='underline cursor-pointer text-blue-500'>Tutor Login ?</p>
              ) : (
                <p onClick={()=>setCurrState('Admin')} className='underline cursor-pointer text-blue-500'>Admin Login ?</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : null}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;