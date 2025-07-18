"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {AdminContext} from '../context/AdminContext'
import {AppContext} from '../context/AppContext'
import {TutorContext} from '../context/TutorContext'
import { FaClipboardList,FaChalkboardTeacher, FaPlusSquare, FaListAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";

const Sidebar = () => {
  const pathname = usePathname();
  const {aToken, setAtoken } = useContext(AdminContext);
  const {tToken,setTToken} = useContext(TutorContext)
  const {router} = useContext(AppContext)

  const logout = () => {
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
    tToken && setTToken("");
    tToken && localStorage.removeItem("tToken");
    router.push('/login');
  };

  const links = [
    { name: "Dashboard", href: "/admin", icon: <FaHome /> },
    { name: "All Sessions", href: "/admin/all-sessions", icon: <IoMdListBox /> },
    { name: "Tutor List", href: "/admin/tutors/list", icon: <FaChalkboardTeacher /> },
    { name: "Add Tutor", href: "/admin/tutors/add", icon: <FaPlusSquare /> },
  ];

   const link = [
    { name: "Dashboard", href: "/tutor", icon: <FaHome /> },
    { name: "Profile", href: "/tutor/tutor-profile", icon: <FaClipboardList /> },
    { name: "Sessions", href: "/tutor/tutor-sessions", icon: <IoMdListBox /> },
  ];

  return (
    <div className="min-h-screen bg-blue-50 w-64  shadow-lg p-5 flex flex-col justify-between ">
      {/* Top section */}
      <div>
        {/* Logo */}
        <Link href='/' className='bold-24  flex'>
          <span className='inline-flex'>
            <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-orange-600 text-gray-100  -rotate-[31deg] rounded-full'>
              P
            </span>
            rimeTutor
          </span>
          </Link>
        {aToken && <span className="text-xs bg-blue-900 py-1 px-1 mt-2 text-white rounded-xl max-w-[76px]">For Admin</span>}
        {tToken && !aToken && <span className="text-xs bg-blue-900 py-1 px-1 mt-2 text-white rounded-xl max-w-[76px]">For Tutor</span>}


        {/* Nav links */}
        {aToken && !tToken (
        <nav className="flex flex-col gap-7 mt-7">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 ${
                pathname === link.href ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        )}

        {tToken && !aToken && (
        <nav className="flex flex-col gap-7 mt-7">
          {link.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 ${
                pathname === link.href ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
