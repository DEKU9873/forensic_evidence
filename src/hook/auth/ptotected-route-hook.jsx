import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProtectedRouteHook = () => {
  const [userData, setUserData] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ إضافة حالة تحميل

  useEffect(() => {
    const fetchUserData = () => {
      const cookie = Cookies.get("user"); // ✅ جلب الكوكيز مباشرة عند التحديث
      if (cookie) {
        const parsedUser = JSON.parse(cookie);
        setUserData(parsedUser);
        setIsAuthenticated(true);
        setIsUser(parsedUser.role === "User");
        setIsAdmin(parsedUser.role !== "User");
      } else {
        setIsAuthenticated(false);
        setIsUser(false);
        setIsAdmin(false);
      }
      setLoading(false); // ✅ إنهاء التحميل بعد استرجاع البيانات
    };

    fetchUserData();
    
    // ✅ مراقبة تغييرات الكوكيز لحل المشكلة
    const interval = setInterval(fetchUserData, 1000); // فحص الكوكيز كل ثانية
    return () => clearInterval(interval); // تنظيف التايمر عند تفكيك المكون
  }, []);

  return [isUser, isAdmin, userData, isAuthenticated, loading];
};

export default ProtectedRouteHook;




// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie"; 

// const ProtectedRouteHook = () => {
//   const [userData, setUserData] = useState(() => {
//     const cookie = Cookies.get("user");
//     return cookie ? JSON.parse(cookie) : null;
//   });
//   const [isUser, setIsUser] = useState();
//   const [isAdmin, setIsAdmin] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState();

//   useEffect(() => {
//     if (userData != null) {
//       setIsAuthenticated(true);
//       if (userData.role === "User") {
//         setIsUser(true);
//         setIsAdmin(false);
//       } else {
//         setIsUser(false);
//         setIsAdmin(true);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//       setIsUser(false);
//     }
//   }, []);

//   return [isUser, isAdmin, userData, isAuthenticated];
// };

// export default ProtectedRouteHook;
