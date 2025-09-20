"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../store/slices/authSlice"; // Import the logout action
import {
  LayoutDashboard,
  List,
  FolderTree,
  FolderPlus,
  Bath,
  PlusCircle,
  UserCheck,
  ClipboardList,
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  X,
  MapPin,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Get user data directly from the Redux store
  const { user } = useSelector((state) => state.auth);

  // console.log(user, "usr form sidebar");
  const dispatch = useDispatch();
  const router = useRouter();

  // Check if the user has an admin role (assuming role_id 1 is admin)
  const isAdmin = user?.role_id === "1";

  // const adminMenuItems = [
  //   { icon: Home, label: "Dashboard", href: "/" },
  //   { icon: UserCheck, label: "Map view", href: "/locations" },
  //   {
  //     icon: Folder,
  //     label: "Location Types",
  //     hasDropdown: true,
  //     key: "locationTypes",
  //     children: [
  //       { icon: List, label: "View Location Types", href: "/location-types" },
  //       {
  //         icon: FolderPlus,
  //         label: "Add Location Type",
  //         href: "/location-types/add",
  //       },
  //     ],
  //   },
  //   {
  //     icon: Bath,
  //     label: "Washrooms",
  //     hasDropdown: true,
  //     key: "washrooms",
  //     children: [
  //       { icon: List, label: "Washrooms List", href: "/washrooms" },
  //       { icon: Plus, label: "Add Washroom", href: "/add-location" },
  //     ],
  //   },
  //   {
  //     icon: UserCheck,
  //     label: "Assigne Locations",
  //     href: "/cleaner-assignments",
  //   },
  //   { icon: UserCheck, label: "Cleaner Review", href: "/cleaner-review" },
  //   { icon: Star, label: "User Review", href: "/user-review" },
  // ];

  // const cleanerMenuItems = [
  //   { icon: UserCheck, label: "Cleaner Review", href: "/cleaner-review" },
  //   { icon: CheckCircle, label: "Completed Tasks", href: "/completed-tasks" },
  // ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: MapPin, label: "Map view", href: "/locations" },
    {
      icon: FolderTree,
      label: "Location Types",
      hasDropdown: true,
      key: "locationTypes",
      children: [
        { icon: List, label: "View Location Types", href: "/location-types" },
        {
          icon: FolderPlus,
          label: "Add Location Type",
          href: "/location-types/add",
        },
      ],
    },
    {
      icon: Bath,
      label: "Washrooms",
      hasDropdown: true,
      key: "washrooms",
      children: [
        { icon: List, label: "Washrooms List", href: "/washrooms" },
        { icon: PlusCircle, label: "Add Washroom", href: "/add-location" },
      ],
    },
    // {
    //   icon: UserCheck,
    //   label: "Assign Locations",
    //   href: "/cleaner-assignments",
    // },

    {
      icon: Bath,
      label: "Cleaner Assignments",
      hasDropdown: true,
      key: "cleaner-assignments",
      children: [
        {
          icon: List,
          label: "Assignments List",
          href: "/cleaner-assignments", // ✅ absolute path
        },
        {
          icon: PlusCircle,
          label: "Add Assignment",
          href: "/cleaner-assignments/add", // ✅ absolute path
        },
      ],
    },

    { icon: ClipboardList, label: "Cleaner Review", href: "/cleaner-review" },
    // { icon: Star, label: "User Review", href: "/user-review" },
  ];

  const cleanerMenuItems = [
    { icon: ClipboardList, label: "Cleaner Review", href: "/cleaner-review" },
    { icon: CheckCircle, label: "Completed Tasks", href: "/completed-tasks" },
  ];
  const menuItems = isAdmin ? adminMenuItems : cleanerMenuItems;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setSidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItemClick = (item) => {
    if (item.hasDropdown) {
      if (!sidebarOpen) {
        setSidebarOpen(true);
        setTimeout(() => toggleDropdown(item.key), 100);
      } else {
        toggleDropdown(item.key);
      }
    } else {
      router.push(item.href); // Use Next.js router for navigation
      if (isMobile) setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action from Redux
    router.push("/login"); // Redirect to the login page
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-2 left-4 z-[60] p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg lg:hidden transition-all duration-200"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={15} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full flex flex-col bg-slate-900 text-gray-200 shadow-2xl transition-all duration-300 z-50
          ${sidebarOpen ? "w-64" : "w-16"}
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800 min-h-[60px]">
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-white tracking-wide">
              Dashboard
            </h1>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-700 transition-all duration-200"
            >
              {sidebarOpen ? (
                <ChevronLeft size={20} className="text-gray-300" />
              ) : (
                <ChevronRight size={20} className="text-gray-300" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 mt-2">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isDropdownOpen = openDropdowns[item.key];

              return (
                <li key={index} className="group">
                  <div
                    onClick={() => handleItemClick(item)}
                    className={`flex items-center px-3 py-3 rounded-md cursor-pointer relative overflow-hidden
                      ${
                        isDropdownOpen
                          ? "bg-slate-800 text-white"
                          : "text-gray-300"
                      }
                      hover:bg-indigo-600 hover:text-white transition-all duration-200
                      ${!sidebarOpen ? "justify-center" : ""}
                    `}
                  >
                    <IconComponent size={20} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="ml-3 font-medium flex-1">
                          {item.label}
                        </span>
                        {item.hasDropdown && (
                          <div className="ml-auto">
                            {isDropdownOpen ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {!sidebarOpen && (
                      <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-md text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </div>

                  {item.hasDropdown && sidebarOpen && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isDropdownOpen ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <ul className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-3">
                        {item.children?.map((child, childIndex) => {
                          const ChildIcon = child.icon;
                          return (
                            <li key={childIndex}>
                              <button
                                onClick={() => {
                                  router.push(child.href);
                                  if (isMobile) setSidebarOpen(false);
                                }}
                                className="w-full flex items-center px-2 py-2 rounded-md text-gray-400 hover:bg-slate-700 hover:text-white transition-all duration-200 text-sm"
                              >
                                <ChildIcon
                                  size={16}
                                  className="flex-shrink-0"
                                />
                                <span className="ml-2">{child.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 bg-slate-800">
          <div className="p-4">
            {sidebarOpen && (
              <div className="flex items-center space-x-3 mb-3 p-2 rounded-md hover:bg-slate-700 transition">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {getInitials()}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {user?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isAdmin ? "Administrator" : "Cleaner"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200
                ${!sidebarOpen ? "justify-center" : ""}
              `}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
