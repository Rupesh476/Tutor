import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section
      className="w-full mx-auto min-h-screen bg-blue-900 flex items-center justify-start px-6 py-5 mt-2 bg-cover  bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-4xl text-left md:px-30">
        <span className="block text-sm font-semibold text-white uppercase mb-5 underline">
          <span className="text-xl text-white">#1</span> Trusted Online Tutoring Platform
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-20">
          Personalized 1-on-1 Tutoring for Every Learner,<br /> Anytime, Anywhere
        </h1>
        <p className=" text-white px-0 md:ml-0 md:pb-9">
          Experience expert guidance with our advanced platform that connects students with top tutors across
          a range of subjects — built for results, flexibility, and growth.
        </p>
        <div className='mt-5'>
          <Link href='/login' className='text-white py-3 font-bold cursor-pointer px-5  rounded-full border'> Register Now </Link>
          <Link href='/tutors' className='bg-white font-bold ml-3 rounded-2xl px-5 py-3'> Book Appointment </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero