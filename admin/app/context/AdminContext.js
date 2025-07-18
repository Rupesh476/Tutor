"use client"
import React,{createContext,useState,useEffect,useContext} from 'react'
import {AppContext} from './AppContext'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

 const AdminContextProvider = (props) =>{

    const [aToken,setAtoken] = useState('')
    const {backendUrl} = useContext(AppContext)

    const [tutors, setTutors] = useState([])
    const [sessions, setSessions] = useState([])
    const [dashData, setDashData] = useState(false)

    useEffect(() =>{
        const token = localStorage.getItem('aToken') || ''; 
        setAtoken(token);
    },[])

    const getAllTutors = async() => {
        try {
            const res = await fetch(`${backendUrl}/api/admin/all-tutors`, {
        method: 'post',
        headers: {
        aToken,
        },
    });

    const data = await res.json();


    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch tutors')
    }
                
            if (data.success) {
                    setTutors(data.tutors)
                }else{
                    toast.error(data.message)
                }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'something went wrong')
        }
    }

    const changeAvailability = async (tutId) => {
        try {
            const res = await fetch(`${backendUrl}/api/admin/change-availability`,{
                method:'post',
                headers:{ 'Content-Type': 'application/json', aToken,},
                body:JSON.stringify({tutId}),
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message)
                getAllTutors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getAllSessions = async () =>{
        try {
            const res = await fetch(`${backendUrl}/api/admin/sessions`,{
                method:'get',
                headers:{ aToken,}
            })
            const data = await res.json()
            if (data.success) {
                setSessions(data.sessions)
            }else{
                
            toast.error(data.message || 'Failed to fetch sessions')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'something went wrong')
            
        }
    }

    const cancelSession = async (sessionId) =>{
        try {
            const res = await fetch(`${backendUrl}/api/admin/cancel-session`, {
                method:'post',
                headers:{ 'Content-Type': 'application/json',  aToken},
                body: JSON.stringify({sessionId})
            });

            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
                getAllSessions()
            }else{
                toast.error(data.message || 'cancel failed')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Something wnt wrong')
        }
    }

    const getDashData = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/admin/dashboard`,{
                method:'get',
                headers: {aToken},
            })

            const data = await res.json()
            if (data.success) {
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {aToken,setAtoken,getAllTutors,tutors,changeAvailability,getAllSessions,sessions,setSessions,cancelSession,getDashData,dashData}
    return (
        <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
    )
}

export default AdminContextProvider