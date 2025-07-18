"use client"
import {useState, useEffect, useContext} from 'react'
import {TutorContext} from '../context/TutorContext'
import {AdminContext} from '../context/AdminContext'
import Sidebar from '../components/Sidebar'
import Login from '../login/page'
import {ToastContainer} from 'react-toastify'

export default function TutorLayout({children}) {
    const {tToken, setTToken} = useContext(TutorContext);
    const {setAtoken} = useContext(AdminContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    },[]);

    if (!loaded) return null;

    return (
        <main>
            <ToastContainer position="bottom-right"/>
            {tToken ? (
                <div className='bg-light text-tertiary'>
                    <div className='mx-auto max-w-[1440px] flex flex-col sm:flex-row'>
                        <Sidebar/>
                        <div className='flex-1'>{children}</div>
                    </div>
                </div>
            ):(
                <Login setTToken={setTToken} setAtoken={setAtoken} />
            )}
        </main>
    )



}