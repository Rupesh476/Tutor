import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">PrimeTutor</h2>
          <p className="text-gray-400 text-sm">
            We connect students with certified online tutors from around the globe.
            whether you&#39;re preparing for exams or mastering new skills,
            our platform helps you learn with confidence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-white transition">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/tutors" className="hover:text-white transition">
                Find a Tutor
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
          <div className='flex-col mt-5 '>
        <h4 className='text-xl mb-3'>Get in Touch</h4>
        <p>+9779702549523</p>
        <p>sahrupesh288@gmail.com</p>
      </div>
        </div>
      </div>

      {/* Copyright */}
      
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PrimeTuto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;