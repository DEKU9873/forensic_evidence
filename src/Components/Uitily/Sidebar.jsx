import React, { useState, useEffect } from "react";
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
  FaChartBar,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { History } from "lucide-react";

const Sidebar = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie != null) setUser(JSON.parse(userCookie));
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleForms = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setIsFormsOpen(!isFormsOpen);
  };

  const handleLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");
    navigate("/");
  };

  if (location.pathname === "/") {
    return null;
  }

  const formsMenu = [
    { to: "/form2", text: "محضر كشف وإظهار الآثار الجرمية" },
    { to: "/form1", text: "إستمارة إستلام وتسليم العينات" },
    { to: "/form3", text: "محضر كشف الحرائق" },
  ];

  return (
    <>
      {isOpen && window.innerWidth < 768 && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSidebar}
        />
      )}

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
        >
          <FaBars />
        </button>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white z-40 transition-all duration-300 ease-in-out shadow-2xl print:hidden flex flex-col
          ${
            isOpen
              ? "translate-x-0 w-64"
              : "translate-x-full w-0 md:w-20 md:translate-x-0"
          }`}
      >
        <div className="h-16 bg-blue-600 flex items-center justify-between px-4">
          {isOpen && (
            <h1 className="text-white text-lg font-bold">الادلة الجنائية</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-blue-700 p-2 rounded-md"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          {isOpen ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-2">
                <FaUser />
              </div>
              <p className="text-gray-800 font-medium">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-gray-500 text-sm">
                {user.role === "user" ? "مستخدم" : "أدمن"}
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <FaUser />
              </div>
            </div>
          )}
        </div>

        <nav className="p-3 overflow-y-auto flex-grow">
          <Link
            to="/home"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/home"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaHome className="text-lg" />
            {isOpen && <span className="text-sm">الصفحة الرئيسية</span>}
          </Link>

          <Link
            to="/profile"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaUser className="text-lg" />
            {isOpen && <span className="text-sm">الملف الشخصي</span>}
          </Link>

          {/* <Link
            to="/register"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/register"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaUserPlus className="text-lg" />
            {isOpen && <span className="text-sm">إضافة مستخدمين</span>}
          </Link> */}

          {/* رابط عرض المستخدمين */}
          <Link
            to="/allusers"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/users"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaUsers className="text-lg" />
            {isOpen && <span className="text-sm">عرض المستخدمين</span>}
          </Link>

          <Link
            to="/map"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/map"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaMapMarkerAlt className="text-lg" />
            {isOpen && <span className="text-sm">الخرائط</span>}
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FaChartBar className="text-lg" />
            {isOpen && <span className="text-sm">الإحصائيات</span>}
          </Link>
          <Link
            to="/logs"
            className={`flex items-center gap-3 p-3 rounded-md mb-2 transition-all
              ${
                location.pathname === "/logs"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <History className="text-lg" />
            {isOpen && <span className="text-sm">السجل</span>}
          </Link>

          <div className="mb-2">
            <button
              onClick={toggleForms}
              className={`w-full flex items-center justify-between p-3 rounded-md transition-all
                ${
                  isFormsOpen || location.pathname.includes("/form")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-lg" />
                {isOpen && <span className="text-sm">استمارات</span>}
              </div>
              {isOpen &&
                (isFormsOpen ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                ))}
            </button>

            {isOpen && isFormsOpen && (
              <div className="mr-4 mt-1 border-r-2 border-blue-100 pr-2">
                {formsMenu.map((form) => (
                  <Link
                    key={form.to}
                    to={form.to}
                    className={`flex items-center p-2 text-sm rounded-md my-1 transition-all
                      ${
                        location.pathname === form.to
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {form.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="mt-auto border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 transition-all"
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && <span className="text-sm">تسجيل خروج</span>}
          </button>
        </div>
      </div>

      <main
        className={`transition-all duration-300 ${
          isOpen ? "md:mr-64" : "md:mr-20"
        }`}
      ></main>
    </>
  );
};

export default Sidebar;
