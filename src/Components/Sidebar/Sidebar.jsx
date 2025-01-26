import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaCog, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // للحصول على المسار الحالي

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // إذا كان المسار الحالي هو "/"، لا تعرض السايد بار
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gradient-to-r from-blue-500 to-indigo-600 h-screen p-5 pt-8 relative duration-300`}
      >
        {/* Toggle Button */}
        <div
          className="absolute top-4 transform p-1 rounded-full cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-6 mt-16"> {/* زادت المسافة العلوية */}
          {/* Logo or Brand */}
          <div className={`text-white text-xl font-bold ${!isOpen && "hidden"}`}>
            الادلة الجنائية
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-6 text-white"> {/* زاد التباعد بين العناصر */}
            <Link
              to="/home"
              className="flex items-center gap-4 cursor-pointer hover:scale-110 transform transition-all duration-300"
            >
              <FaHome className="text-3xl" />
              {isOpen && <span>الصفحة الرئيسية</span>}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-4 cursor-pointer hover:scale-110 transform transition-all duration-300"
            >
              <FaUser className="text-3xl" />
              {isOpen && <span>الملف الشخصي</span>}
            </Link>
            <Link
              to="/map"
              className="flex items-center gap-4 cursor-pointer hover:scale-110 transform transition-all duration-300"
            >
              <FaMapMarkerAlt className="text-3xl" />
              {isOpen && <span>الخرائط</span>}
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-4 cursor-pointer hover:scale-110 transform transition-all duration-300"
            >
              <FaCog className="text-3xl" />
              {isOpen && <span>الاعدادات</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
