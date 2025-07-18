import React from 'react';
import { blogs } from '../assets/data';
import Image from 'next/image';

const page = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-16 xl:py-28 px-4 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="overflow-hidden rounded-t-xl">
              <Image
                src={blog.image}
                alt="blog-img"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <p className="text-sm text-indigo-600 font-medium">{blog.category}</p>
              <h2 className="text-lg font-semibold text-gray-800 mt-2 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit at itaque iste. Id consequatur minus esse ipsam ratione, laborum ipsa, quibusdam ipsum dolor necessitatibus sed praesentium, dolores quam magni excepturi!
              </p>
              <button className="mt-4 text-indigo-600 font-semibold hover:underline">
                Continue reading
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
