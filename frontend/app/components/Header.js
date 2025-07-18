"use client"
import {useState,useContext} from 'react'
import Link from 'next/link'
import Navbar from './Navbar.js'
import {CgMenuLeft} from 'react-icons/cg'
import {TbArrowNarrowRight} from 'react-icons/tb'
import {RiUserLine} from 'react-icons/ri'
import {AppContext} from '../context/AppContext'
import Image from 'next/image'
import userImage from '../assets/user.jpg'
import upload_icon from '../assets/upload_icon.png'

const Header = () => {

  const[menuOpened, setMenuOpened] = useState(false)
  const{token,setToken,router,userData} = useContext(AppContext)

  const toggleMenu =() =>{
    setMenuOpened((prev)=> !prev)
  }

  const logout= ()=>{
    router.push('/login')
    localStorage.removeItem('token')
    setToken("")
  }
  return (
      <header className='w-full fixed top-0 left-0 z-50 px-6 py-4 bg-[#004d4d] shadow-md text-white'>
        <div className=' max-w-7xl mx-auto flex items-center justify-between'>
          {/*Logo */}
          <Link href='/' className='bold-24  flex'>
          <span className='inline-flex'>
            <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-orange-600 text-gray-100  -rotate-[31deg] rounded-full'>
              P
            </span>
            rimeTutor
          </span>
          </Link>
          {/* Navbar */}
          <div>
            <Navbar menuOpened={menuOpened} toggleMenu={toggleMenu} containerStyles={`${menuOpened ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-blue-950 z-50 px-10 py-4 shadow-2xl"
              : "hidden xl:flex gap-x-5 xl:gap-x-12 medium-15  px-2 -y-1"}`} />
          </div>
          {/* Right side */}
          <div className='flex items-center justify-end gap-x-3 sm:gap-x-10'>
            {!menuOpened && (
              <CgMenuLeft onClick={toggleMenu} className='text-2xl xl:hidden cursor-pointer'/>
            )}
            <div className='group relative '>
              <div>
                { token ? (
                  <div>
                    <Image src={userData.image || upload_icon} alt='user-img' width={48} height={48} className='rounded-full w-12 cursor-pointer'/>
                  </div>
                ):(
                  <button onClick={()=>router.push('/login')} className='btn-white border-none flex items-center gap-x-2 py-3 cursor-pointer'>Login <RiUserLine/></button>
                )
                }
              </div>
              {token && (
                <>
                <ul className='bg-white shadow-sm p-2 w-36 ring-1 ring-slate-900/15 rounded absolute right-0 top-10 hidden group-hover:flex flex-col'>
                  <li onClick={()=> router.push('/my-profile')} className='flex items-center justify-center cursor-pointer'>
                    <p className='text-gray-950'>My Profile</p>
                    <TbArrowNarrowRight className='opacity-50 text-[19px]'/>
                  </li>
                  <hr className='my-2 '/>
                  
                  <li onClick={()=> router.push('/my-sessions')} className='flex items-center justify-center cursor-pointer'>
                    <p className='text-gray-950'>My Sessoins</p>
                    <TbArrowNarrowRight className='opacity-50 text-[19px]'/>
                  </li>
                  <hr className='my-2'/>
                  
                  <li onClick={logout} className='flex items-center justify-center cursor-pointer'>
                    <p className='text-red-600'>Logout</p>
                    <TbArrowNarrowRight className='opacity-50 text-[19px]'/>
                  </li>
                </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header