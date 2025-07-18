'use client'
import React, { useContext, useState ,useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import loginImg from '../assets/login.png'
import Image from 'next/image'
import {toast} from 'react-toastify'

const Login = () => {
  const { router, token, setToken ,backendUrl} = useContext(AppContext)

  const [currState, setCurrState] = useState('Login')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      if (currState === "Sign Up") { 
        const res = await fetch(`${backendUrl}/api/user/register`,{
          method:'post',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password}),
      })

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token",data.token)
      setToken(data.token)
      toast.success(data.message)
      }
    } else{
      const res = await fetch(`${backendUrl}/api/user/login`,{
        method:'post',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password})
      })

      const data = await res.json()
      if (data.success) {
        localStorage.setItem("token",data.token)
      setToken(data.token)
      toast.success(data.message)
      }
    } 
    } catch (error) {
     console.log(error);
     toast.error('Something went wrong, please try again later.')
    } finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    if (token) {
      router.push('/')
    }
  },[token])

  return (
    <section className='absolute top-0 left-0 w-full h-full z-50 bg-white'>
      <div className='flex h-full w-full'>
        {/* Left Side Image */}
        <div className='w-1/2 hidden sm:block'>
          <Image
            src={loginImg}
            alt='Login illustration'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Right Side Form */}
        <div className='flex-1 flex items-center justify-center'>
          <form
            onSubmit={onSubmitHandler}
            className='flex flex-col gap-5 w-[90%] max-w-md text-gray-800'
          >
            <h1 className='text-3xl font-bold'>{currState}</h1>

            {currState === 'Sign Up' && (
              <div>
                <label htmlFor='name' className='block font-medium'>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter your name'
                  className='w-full px-3 py-2 mt-1 bg-blue-50 ring-1 ring-slate-900/10 rounded'
                />
              </div>
            )}

            <div>
              <label htmlFor='email' className='block font-medium'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full px-3 py-2 mt-1 bg-blue-50 ring-1 ring-slate-900/10 rounded'
              />
            </div>

            <div>
              <label htmlFor='password' className='block font-medium'>
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full px-3 py-2 mt-1 bg-blue-50 ring-1 ring-slate-900/10 rounded'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
            disabled={loading}>
              {loading ? "please wait" :currState === 'Sign Up' ? 'Sign Up' : 'Login'}
            </button>

            <div className='text-center text-sm'>
              {currState === 'Login' ? (
                <>
                  Don&#39;t have an account?{' '}
                  <span
                    onClick={() => setCurrState('Sign Up')}
                    className='text-blue-600 cursor-pointer underline'
                  >
                    Create Account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    onClick={() => setCurrState('Login')}
                    className='text-blue-600 cursor-pointer underline'
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
