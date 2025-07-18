import React from 'react';
import Image from 'next/image';
import about1 from '../assets/about1.png';
import playButton from '../assets/playButton.png';
import { FaArrowRight, FaChalkboardTeacher, FaUsers, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-6 lg:px-12 py-16 xl:py-20 bg-gray-50">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h3 className="capitalize text-3xl font-bold text-gray-800 mb-4">
          Chosen By Thousands Of Learners And Top Instructors
        </h3>
        <p className="text-gray-600">
          Our platform brings together thousands of motivated learners and highly-rated tutors from around the world.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image src={about1} alt="about img" className="w-full h-auto rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src={playButton} alt="play button" width={66} height={66} className="cursor-pointer" />
          </div>
        </div>

        {/* Text Section */}
        <div className="bg-teal-800 text-white rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-medium text-xl mb-3">Do you have formal teaching experience?</h4>
            <p className="text-white/80 text-sm">
              Share your academic background and teaching history to help us verify your profile. Experienced tutors gain more visibility and trust among students.
            </p>
          </div>
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">Become a tutor on our platform</h4>
            <button className="bg-white text-teal-800 p-2 rounded-full hover:bg-gray-200 transition">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center text-center">
          <FaChalkboardTeacher className="text-3xl text-blue-600 mb-4" />
          <h5 className="text-xl font-bold text-gray-800 mb-2">Teach What You Love</h5>
          <p className="text-gray-600 text-sm">
            Share your knowledge, connect with eager learners, and inspire growth through flexible, personalized online tutoring sessions.
          </p>
        </div>
        <div className="bg-pink-100 rounded-2xl p-6 flex flex-col items-center text-center">
          <FaUsers className="text-3xl text-pink-600 mb-4" />
          <h5 className="text-xl font-bold text-gray-800 mb-2">Join a Global Community</h5>
          <p className="text-gray-600 text-sm">
            Collaborate with expert tutors and students from around the world, building your reputation and earning with flexibility.
          </p>
        </div>
        <div className="bg-yellow-100 rounded-2xl p-6 flex flex-col items-center text-center">
          <FaClock className="text-3xl text-yellow-600 mb-4" />
          <h5 className="text-xl font-bold text-gray-800 mb-2">Teach On Your Schedule</h5>
          <p className="text-gray-600 text-sm">
            Enjoy complete freedom to set your own hours, manage your time, and grow your tutoring practice from anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;