"use client"
import React from 'react'
import {subjectsData} from '../assets/data.js'
import Link from 'next/link'
import Image from 'next/image'

const Subjects = () => {
  return (
    <section className= '  mx-auto  ' >
        <div className='mx-auto flex-col items-center justify-center px-10'>
            <h3 className='flex items-center justify-center text-2xl font-bold mb-5 '>Explore By Subject</h3>
            <p className='flex items-center justify-center'>Whether you&#39;re diving into math, mastering a language,
              or exploring science and tech, our subject-wise categories make it easy
            </p>
        </div>
        {/* Container */}
        <div className='w-full flex items-center justify-center gap-10 md:gap-20 mt-9 '>
          {subjectsData.map((subject,i)=>(
            <Link onClick={()=> scrollTo(0,0)} href={`/tutors/${subject.name}`}  key={i}>
              <Image src={subject.image} alt="subject image" height={60} width={60} className='' />
            <h5>{subject.name}</h5>
            </Link>
          ))}
        </div>
    </section>
  )
}

export default Subjects