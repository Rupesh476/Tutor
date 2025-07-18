"use client"
import React,{useState,useContext,useEffect} from 'react'
import Image from 'next/image'
import tutor1 from '../../assets/tutor1.png'
import tutor2 from '../../assets/tutor2.png'
import tutor3 from '../../assets/tutor3.png'
import {AppContext} from '../../context/AppContext'
import { useParams } from 'next/navigation'
import {subjectsData} from '../../assets/data'
import {FaStar} from 'react-icons/fa'

const Tutors = () => {

    const {subject: subjectParam} = useParams()
    const {router, tutors} = useContext(AppContext)
    const [showFilters, setShowFilters] = useState(false)
    const [filteredTutors, setfilteredTutors] = useState([])

    //handle subject click
    const handleSubjectClick = (subjectName)=>{
      router.push(`/tutors/${subjectName}`)
    }

    //filter the tutors based on the selected subject
    useEffect(() => {
      if (subjectParam) {
        setfilteredTutors(tutors.filter((tutor)=> tutor.subject === subjectParam))
      } else{
        setfilteredTutors(tutors) //show all tutors when no subject is selected
      }
    }, [subjectParam,tutors])
    
  return (
    <div className='w-full mx-auto py-30'>
        {/* Title */}
        <div className='max-w-xl mx-auto text-center pb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                    <div className='inline-flex items-center justify-center gap-3 flex-wrap'>
                        Get Started with the Skilled Tutors
                        <div className='flex items-center -space-x-4'>
                            <Image src={tutor1} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                            <Image src={tutor2} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                            <Image src={tutor3} alt='tutor image' width={48} height={48} className='rounded-full shadow-md ring-2 ring-white object-cover aspect-square'/>
                        </div>
                        
                    </div>
                </h2>
                <p className='text-gray-600 mt-4 text-lg'>
                    Our platform is designed to empower professional tutors who are passionate about sharing knowledge and shaping futures.
                </p>
            </div>
            {/* Tabs */}
            <button onClick={()=> setShowFilters(prev=>!prev)} className={`bg-red-400 text-white cursor-pointer ml-5 px-4 py-1.5 mb-5 rounded sm:hidden transition-all`}>
                Filters
            </button>
            <div className={`mb-12 flex-col sm:flex-row max-sm:gap-y-2 rounded overflow-hidden max-w-5xl mx-auto px-5  ${showFilters ? "flex items-center" : "hidden sm:flex items-center "}`}>
                {subjectsData.map((subject, i)=>(
                    <button key={i} onClick={() =>handleSubjectClick(subject.name)} className={`p-4 medium-15 cursor-pointer h-10 w-full bg-blue-800 text-white flex items-center sm:flex sm:items-center  border-2 border-transparent 
                        ${subject.name === subjectParam ? "border-b-2 text-yellow-500 border-b-yellow-400 " : ""}`}>{subject.name}</button>
                ))}
            </div>
            {/*cintainer  Tutors card */}
            <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10'>
              {filteredTutors?.map((tutor,i)=>(
                <div
                        key={i}
                        className='relative group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                        <Image
                            src={tutor.image}
                            alt="tutor image"
                            width={300}
                            height={300}
                            className='w-full h-90 object-cover transition-opacity duration-300 group-hover:opacity-90'
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
                            </div>
                        </div>
                    </div>
              ))}
            </div>
    </div>
  )
}

export default Tutors