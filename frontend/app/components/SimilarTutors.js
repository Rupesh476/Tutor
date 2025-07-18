import React,{useEffect,useContext,useState} from 'react'
import {AppContext} from '../context/AppContext'
import Image from 'next/image'
import {FaStar} from 'react-icons/fa'

const SimilarTutors = ({tutId, subject}) => {

  const{tutors,router} = useContext(AppContext)
  const[simTutors,setSimTutors] = useState([])

  useEffect(()=>{
    if (tutors.length > 0 && subject) {
      const tutData = tutors.filter((tutor)=>tutor.subject === subject && tutor._id !== tutId)
    
      setSimTutors(tutData)
  }
  },[tutors, subject,tutId])

  useEffect(() => {
}, [simTutors]);

  return (
    <section className='pt-10 xl:pt-17 '>
      {/* Title */}
      <div className='max-w-xl mx-auto text-center pb-16'>
        <div className='text-xl '>
          <h1 className=' flex text-center justify-center font-bold pb-5 gap-2 flex-wrap capitalize'>Tutors with Similar Expertise</h1>
        </div>
        <p>Our platform is designed to empower professional tutors who are passionate about sharing knowledge and shaping futures.</p>
      </div>
      {/* container */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 max-w-7xl mx-auto'>
                {simTutors.slice(0, 5).map((tutor, i) => (
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

export default SimilarTutors