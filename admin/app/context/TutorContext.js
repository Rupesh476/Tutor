"use client"
import React,{useContext,createContext,useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import {AppContext} from '../context/AppContext'

export const TutorContext = createContext()

const TutorContextProvider = (props) =>{

    const [tToken, setTToken] = useState('')
    const {backendUrl} = useContext(AppContext)
    const [sessions, setSessions] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    useEffect(() =>{
        const token = localStorage.getItem('tToken') || ''; 
        setTToken(token);
    },[])

    const getSessions = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/tutor/sessions`,{
                method:'get',
                headers:{tToken},
            });

            const data = await res.json()
            if (data.success) {
                setSessions(data.sessions)
                
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeSession = async (sessionId) => {
        try {
            const res = await fetch(`${backendUrl}/api/tutor/complete-session`,{
                method:'post',
                headers: {
                    'Content-Type': 'application/json' , tToken,
                },
                body:JSON.stringify({sessionId}),
            })
            const data = await res.json()
            
            if (data.success) {
                toast.success(data.message, { autoClose: 3000 })
                getSessions()
                getDashData()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelSession = async (sessionId) => {
        try {
            const res = await fetch(`${backendUrl}/api/tutor/cancel-session`,{
                method:'post',
                headers:{
                    'Content-Type': 'application/json', tToken
                },
                body: JSON.stringify({sessionId}),
            })
            const data = await res.json()
            
            if (data.success) {
                toast.success(data.message, { autoClose: 3000 })
                getSessions()
                getDashData()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/tutor/dashboard`,{
                method:'get',
                headers: {tToken},
            });

            const data = await res.json()
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/tutor/profile`,{
                method:'get',
                headers:{tToken},
            });
            const data = await res.json()
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {tToken, setTToken,sessions,setSessions,getSessions,completeSession,cancelSession,dashData,getDashData,getProfileData,profileData,setProfileData}
    return (
        <TutorContext.Provider value={value}>{props.children}</TutorContext.Provider>
    )
}

export default TutorContextProvider