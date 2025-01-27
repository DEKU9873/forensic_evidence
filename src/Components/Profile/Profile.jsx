import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie != null) setUser(JSON.parse(userCookie));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-7xl p-10 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src="/api/placeholder/150/150"
              alt=""
              className="w-40 h-40 mx-auto mb-6 rounded-full shadow-2xl border-4 border-white ring-4 ring-blue-300 transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
              <FaUserCircle size={24} />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-2">{user.username}</h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">المنصب</p>
          <button className="mt-6 bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto gap-2">
            <FaUserCircle size={20} />
            <span>تعديل الملف الشخصي</span>
          </button>
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-200 p-8 rounded-2xl shadow-inner">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center justify-center gap-3">
            <span>المعلومات الشخصية</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <FaEnvelope size={24} className="text-blue-600" />, 
                title: "البريد الإلكتروني", 
                value: user.email
              },
              { 
                icon: <FaPhone size={24} className="text-blue-600" />, 
                title: "رقم الهاتف", 
                value: user.phoneNumber 
              },
              { 
                icon: <FaMapMarkerAlt size={24} className="text-blue-600" />, 
                title: "الموقع", 
                value: "بغداد، العراق" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-3 gap-3 border-b border-blue-100 pb-3">
                  {item.icon}
                  <span className="text-gray-500 font-semibold">{item.title}</span>
                </div>
                <span className="text-gray-800 text-lg font-bold mt-2 block">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;