"use client"
import {useContext} from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { MapIcon } from '@heroicons/react/24/outline'; // Updated import path


export default function Navbar() { // Add parentheses here

  const authContext = useContext(AuthContext);
  const router = useRouter();
  
  if (!authContext) {
    throw new Error("AuthContext is not available.");
  }
  
  const { user, setUser } = authContext;
  
  // Function to handle logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      setUser(null); // Clear user data
      localStorage.removeItem("user"); // Clear localStorage
      router.push("/login"); // Redirect to login page or home
    }
  };

  return (
    <nav className="border-b border-emerald-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapIcon className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold">MNNITHunt</span>
        </div >
        {user ? (
        <button
          onClick={handleLogout}
          className="bg-[#32ce95] w-[70px] h-[30px] rounded-lg text-sm font-medium"
        >
          {user.name}
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium"
        >
          Log In
        </button>
      )}
      </div>
    </nav>
  );
}
