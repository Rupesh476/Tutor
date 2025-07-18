"use client"
import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { AppContext } from '../context/AppContext'
import { TutorContext } from '../context/TutorContext'
import Sidebar from '../components/Sidebar'
import LoginForm from '../components/LoginForm'
import { ToastContainer } from 'react-toastify'

export default function AdminLayout({ children }) {
  const { aToken, setAtoken } = useContext(AdminContext)
  const { setTToken } = useContext(TutorContext)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return null // prevent hydration issues

  return (
    <main>
      <ToastContainer position="bottom-right" />
      {aToken ? (
        <div className="bg-light text-tertiary">
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      ) : (
        <LoginForm setAtoken={setAtoken} setTToken={setTToken} />
      )}
    </main>
  )
}
