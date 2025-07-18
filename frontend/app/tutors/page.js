"use client";

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import tutor1 from "../assets/tutor1.png";
import tutor2 from "../assets/tutor2.png";
import tutor3 from "../assets/tutor3.png";
import { AppContext } from "../context/AppContext";
import { useParams, useRouter } from "next/navigation";
import { subjectsData } from "../assets/data";
import { FaStar } from "react-icons/fa";

const Tutors = () => {
  const { subject: subjectParam } = useParams();
  const { tutors } = useContext(AppContext);
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState([]);

  // Handle subject click
  const handleSubjectClick = (subjectName) => {
    router.push(`/tutors/${subjectName}`);
  };

  // Filter tutors based on the selected subject
  useEffect(() => {
    if (subjectParam) {
      setFilteredTutors(tutors.filter((tutor) => tutor.subject === subjectParam));
    } else {
      setFilteredTutors(tutors); // Show all tutors when no subject is selected
    }
  }, [subjectParam, tutors]);

  return (
    <div className="w-full mx-auto py-12 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center px-4 pb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 flex flex-col md:flex-row items-center justify-center gap-4">
          Get Started with the Skilled Tutors
          <div className="flex -space-x-3">
            <Image
              src={tutor1}
              alt="tutor image"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-white shadow-md"
            />
            <Image
              src={tutor2}
              alt="tutor image"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-white shadow-md"
            />
            <Image
              src={tutor3}
              alt="tutor image"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-white shadow-md"
            />
          </div>
        </h2>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          Our platform is designed to empower professional tutors who are
          passionate about sharing knowledge and shaping futures.
        </p>
      </div>

      {/* Tabs */}
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md ml-5 mb-5 sm:hidden transition-colors hover:bg-blue-700"
      >
        Filters
      </button>
      <div
        className={`max-w-5xl mx-auto px-5 ${
          showFilters ? "flex flex-col" : "hidden sm:flex sm:flex-row"
        } gap-2 sm:gap-4 mb-10 overflow-x-auto sm:overflow-hidden rounded-lg`}
      >
        {subjectsData.map((subject, i) => (
          <button
            key={i}
            onClick={() => handleSubjectClick(subject.name)}
            className={`px-4 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
              subject.name === subjectParam
                ? "bg-blue-800 text-yellow-400"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* Tutors Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {filteredTutors?.map((tutor, i) => (
          <div
            key={i}
            className="relative group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={tutor.image}
              alt="tutor image"
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1 mb-1">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-medium">
                  {tutor.rating || 4.8}
                </span>
              </div>
              <h5 className="text-lg font-semibold">{tutor.name}</h5>
              <p className="text-sm text-gray-300">{tutor.subject}</p>
            </div>
            <div className="absolute inset-0 flex items-end justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => {
                  router.push(`/session/${tutor._id}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium mb-4 hover:bg-indigo-700 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;