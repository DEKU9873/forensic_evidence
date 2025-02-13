import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleForms = () => {
    setIsFormsOpen(!isFormsOpen);
  };

  const handleLogout = () => {
    Cookies.remove("access");  
    Cookies.remove("refresh");  
    Cookies.remove("user"); 
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (location.pathname === "/") {
    return null;
  }

  const MenuItem = ({ icon: Icon, text, to, onClick, isActive }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
        ${
          isActive
            ? "bg-white bg-opacity-10 text-white"
            : "text-gray-200 hover:bg-white hover:bg-opacity-10"
        }`}
    >
      <Icon className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
      {isOpen && <span className="text-sm font-medium">{text}</span>}
    </Link>
  );

  return (
    <div className="print:hidden">
      <div
        className={`${
          isOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen fixed top-0 left-0 
        transition-all duration-300 shadow-xl z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {isOpen && (
            <h1 className="text-white text-xl font-bold mr-2">
              الادلة الجنائية
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {isOpen ? (
              <FaTimes className="text-white text-xl" />
            ) : (
              <FaBars className="text-white text-xl" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-6 px-3 flex flex-col gap-2">
          <MenuItem
            icon={FaHome}
            text="الصفحة الرئيسية"
            to="/home"
            isActive={location.pathname === "/home"}
          />
          <MenuItem
            icon={FaUser}
            text="الملف الشخصي"
            to="/profile"
            isActive={location.pathname === "/profile"}
          />
          <MenuItem
            icon={FaMapMarkerAlt}
            text="الخرائط"
            to="/map"
            isActive={location.pathname === "/map"}
          />

          {/* Forms Section */}
          <div className="mt-2">
            <button
              onClick={toggleForms}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg
                transition-all duration-200 text-gray-200 hover:bg-white hover:bg-opacity-10
                ${isFormsOpen && "bg-white bg-opacity-10"}`}
            >
              <div className="flex items-center gap-3">
                <FaFileAlt className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
                {isOpen && (
                  <span className="text-sm font-medium">استمارات</span>
                )}
              </div>
              {isOpen &&
                (isFormsOpen ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                ))}
            </button>

            {/* Forms Submenu */}
            {isOpen && isFormsOpen && (
              <div className="mt-2 mr-4 flex flex-col gap-2">
                {[
                  { to: "/form2", text: "محضر كشف وإظهار الآثار الجرمية" },
                  { to: "/form1", text: "إستمارة إستلام وتسليم العينات" },
                  { to: "/form3", text: "محضر كشف الحرائق" },
                  { to: "/form4", text: "مفصل ومخطط موقع الاصابة على الجثة" },
                  { to: "/form5", text: "مخطط الكشف على عجلة" },
                ].map((form) => (
                  <Link
                    key={form.to}
                    to={form.to}
                    className={`text-sm px-4 py-2 rounded-lg transition-all duration-200
                      ${
                        location.pathname === form.to
                          ? "bg-blue-700 text-white"
                          : "text-gray-300 hover:bg-blue-700 hover:bg-opacity-50"
                      }`}
                  >
                    {form.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 text-white hover:bg-blue-300 hover:bg-opacity-20 transition-colors duration-200 border-t border-blue-700"
        >
          <FaSignOutAlt className={`${isOpen ? "text-2xl" : "text-3xl"}`} />
          {isOpen && <span className="text-xl font-medium">تسجيل خروج</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;