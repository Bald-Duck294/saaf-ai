// components/Header.js
"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { logout } from '../store/slices/authSlice'; // Adjust the import path as needed
import { logout } from "../../store/slices/authSlice.js";
import { LogOut } from "lucide-react";

/**
 * A reusable header component that connects to the Redux store.
 * @param {object} props - The component's properties.
 * @param {string} props.pageTitle - The title to display for the current page.
 */
const Header = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get the user object from the Redux store
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/login"); // Redirect to the login page
  };

  // Determine the role text based on user's role_id
  const getRoleText = () => {
    if (!user || !user.role_id) {
      return "User"; // Default role if not specified
    }
    switch (user.role_id) {
      case 1:
        return "Admin";
      case 2:
        return "Cleaner / Supervisor";
      default:
        return "User";
    }
  };

  const userRole = getRoleText();

  return (
    <header className="h-27 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Page Title Section */}
      <h2 className="text-xl font-semibold text-slate-800">
        {pageTitle || "Dashboard"}
      </h2>

      {/* User Info and Logout Section */}
      <div className="flex items-center space-x-4">
        {/* User Name and Role */}
        <div className="text-right">
          <span className="font-semibold text-sm text-slate-700">
            {user?.name || "Guest"} {/* Display user's name from Redux */}
          </span>
          <span className="block text-xs text-red-600 font-bold uppercase tracking-wider">
            {userRole} {/* Display the determined role */}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // The logout function is now handled internally
          className="px-4 py-2 text-sm font-medium text-white bg-slate-800 
          rounded-lg hover:bg-slate-900 
          transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
