'use client'
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-4 sm:px-8 mt-25">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions, feedback, or just want to say hi? Fill out the form and we’ll get back to you soon.
            </p>
            <ul className="text-gray-700 space-y-3">
              <li>
                📍 Address: <span className="font-medium">Kathmandu, Nepal</span>
              </li>
              <li>
                📞 Phone: <span className="font-medium">+977-9702549523</span>
              </li>
              <li>
                📧 Email: <span className="font-medium">sahrupesh288@gmail.com.com</span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border-none bg-slate-100 rounded-md  focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter Your Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border-none bg-slate-100 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border-none bg-slate-100 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
