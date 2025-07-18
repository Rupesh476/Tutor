"use client";
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import loginImg from '../assets/login.png';
import { Eye, EyeOff } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function LoginForm({ setAtoken, setTToken }) {
  const { router, backendUrl } = useContext(AppContext);
  const [currState, setCurrState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill in all fields');
    setIsLoading(true);

    try {
      if (currState === "Admin") {
        const res = await fetch(`${backendUrl}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAtoken(data.token);
          router.push('/admin');
        } else {
          toast.error(data.message || 'Admin login failed');
        }
      } else {
        const res = await fetch(`${backendUrl}/api/tutor/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('tToken', data.token);
          setTToken(data.token);
          router.push('/tutor-dashboard');
        } else {
          toast.error(data.message || 'Tutor login failed');
        }
      }
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
        <div className="hidden lg:block w-1/2 relative">
          <Image src={loginImg} alt="Login" className="object-cover w-full h-full" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent" />
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {currState} <span className="text-blue-600">Login</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <p onClick={() => setCurrState(currState === 'Admin' ? 'Tutor' : 'Admin')} className="text-blue-600 underline cursor-pointer">
                {currState === 'Admin' ? 'Tutor Login?' : 'Admin Login?'}
              </p>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
