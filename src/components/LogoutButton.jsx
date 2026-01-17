"use client";

import  logoutUser  from "@/actions/logout";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => logoutUser()} 
      className="text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded transition"
    >
      Logout 
    </button>
  );
}