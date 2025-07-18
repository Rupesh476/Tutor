"use client"
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {AdminContext} from './context/AdminContext'
import {TutorContext} from './context/TutorContext'

const Page = () => {
const {aToken} = useContext(AdminContext)
const {tToken} = useContext(TutorContext)
const router = useRouter()

  useEffect(() =>{
    if (aToken) {
      router.push('/admin')
    }else if(tToken) {
      router.push('/tutor')
    } else{
      router.push('/login')
    }
  },[aToken,tToken])
  
  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
  </div>
)
}

export default Page