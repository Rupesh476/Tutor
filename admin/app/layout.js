import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import AppContextProvider from './context/AppContext'
import AdminContextProvider from './context/AdminContext'
import TutorContextProvider from './context/TutorContext'
import Sidebar from './components/Sidebar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tutor  Admin",
  description: "Tutor Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <AdminContextProvider>
            <TutorContextProvider>
              {children}
            </TutorContextProvider>
          </AdminContextProvider>
        </AppContextProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
