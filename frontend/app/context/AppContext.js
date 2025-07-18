"use client"
import React,{createContext,useState,useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const router = useRouter()
    const[token, setToken] = useState('')
    const currency = "$"
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
    const[tutors,setTutors] = useState([])
    const[userData,setUserData] = useState(false)

    useEffect(() => {
      const storedToken = localStorage.getItem('token') || ''
      setToken(storedToken)
    },[])
    
    const getTutorsData = async () =>{
      try {
        const res = await fetch(`${backendUrl}/api/tutor/list`,{
          method:'get',
          headers:{token}
        })

        const data = await res.json()
        if (data.success) {
          setTutors(data.tutors)
        } else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    const loadUserProfileData = async () =>{
      try {
        const res = await fetch(`${backendUrl}/api/user/get-profile`,{
          method:'get',
          headers: {token}
        })
        const data = await res.json();
        if (data.success) {
          console.log(data);
          setUserData(data.userData)
          
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    useEffect(() => {
      getTutorsData()
    },[])
    
  useEffect(() => {
  if (token) {
    loadUserProfileData()
  } else {
    setUserData(false)
  }
}, [token])


    const value = {tutors, router,currency, token, setToken,backendUrl,loadUserProfileData,userData,setUserData,getTutorsData}

    return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider