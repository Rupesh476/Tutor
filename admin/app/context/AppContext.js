"use client"
import React,{createContext} from 'react'
import {useRouter} from 'next/navigation'

export const AppContext = createContext();

const AppContextProvider = (props) =>{
    
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
    const currency = "$"
    const router = useRouter()

    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const today = new Date();
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {router, backendUrl, currency,  calculateAge}
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}

export default AppContextProvider