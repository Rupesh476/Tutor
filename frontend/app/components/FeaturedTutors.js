"use client"
import Image from 'next/image'
import tutor1 from '../assets/tutor1.png'
import tutor2 from '../assets/tutor2.png'
import tutor3 from '../assets/tutor3.png'
import { FaStar } from 'react-icons/fa'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const FeaturedTutors = () => {
    const { tutors, router, currency } = useContext(AppContext)

    return (
        <section className='py-16 xl:py-20 bg-gray-50'>
            {/* Title */}
            <div className='max-w-xl mx-auto text-center pb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                    <div className='inline-flex items-center justify-center gap-3 flex-wrap'>
                        Made For Professionals
                        <div className='flex items-center -space-x-4'>
                            <Image src={tutor1} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                            <Image src={tutor2} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                            <Image src={tutor3} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                        </div>
                        Delivering Quality Education
                    </div>
                </h2>
                <p className='text-gray-600 mt-4 text-lg'>
                    Our platform is designed to empower professional tutors who are passionate about sharing knowledge and shaping futures.
                </p>
            </div>
            {/* Container */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 max-w-7xl mx-auto'>
                {tutors.slice(0, 5).map((tutor, i) => (
                    <div
                        key={i}
                        className='relative group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                        <Image
                            src={tutor.image}
                            alt="tutor image"
                            width={300}
                            height={300}
                            className='w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-90'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                        <div className='absolute bottom-0 p-4 text-white w-full'>
                            <div className='flex items-center gap-1 mb-1'>
                                <FaStar className='text-yellow-400' />
                                <span className='text-sm font-medium'>{tutor.rating || 4.8}</span>
                            </div>
                            <h5 className='text-lg font-semibold'>{tutor.name}</h5>
                            <p className='text-sm text-gray-200 italic'>{tutor.subject}</p>
                        </div>
                        <div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <div className='flex flex-col gap-3 w-full px-6 pt-30 '>
                                <button
                                    onClick={() => { router.push(`/session/${tutor._id}`); window.scrollTo(0, 0); }}
                                    className='bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors'
                                >
                                    View Profile
                                </button>
                                <button
                                    onClick={() => { router.push('/tutors'); window.scrollTo(0, 0); }}
                                    className='bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                                >
                                    Explore Tutors
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedTutors