"use client"
import React from 'react'
import {FaRegWindowClose} from 'react-icons/fa'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const Navbar = ({containerStyles,toggleMenu, menuOpened}) => {

    const navItems = [
        {name:'Home',href:'/'},
        {name:'Tutors',href:'/tutors'},
        {name:'Blogs',href:'/blog'},
        {name:'Contact',href:'/contact'},
    ]
    const pathname = usePathname();

return (
    <nav className={containerStyles}>
        {/* close button inside the navbar */}
        {menuOpened && (
            <>
            <FaRegWindowClose onClick={toggleMenu} className='text-xl self-end cursor-pointer relative left-8' />
            {/* Logo */}
            <Link href='/' className='bold-24  flex pb-1'>
        <span className='inline-flex'>
            <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-orange-600 text-gray-100  -rotate-[31deg] rounded-full'>
            P
            </span>
            rimeTutor
        </span>
        </Link>
        </>
        )}
        {navItems.map(({name, href})=>{
            const isActive = pathname === href;

        return (
        <Link
            key={name}
            href={href}
            className={`
        relative pb-1 transition text-gray-300 hover:text-white
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
        after:bg-white after:transition-all after:duration-300
        ${isActive ? "after:w-full text-white" : "after:w-0"}
        hover:after:w-full
    `}
>
            {name}
        </Link>
        );
        })}
    </nav>
)
}

export default Navbar