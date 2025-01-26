import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'; // استيراد مكتبة الكوكيز

const ProtectedRouteHook = () => {
    const [userData, setUserData] = useState(() => {
        const cookie = Cookies.get("user");
        return cookie ? JSON.parse(cookie) : null; // التحقق إذا كانت الكوكيز موجودة
    });
    const [isUser, setIsUser] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        if (userData != null) {
            setIsAuthenticated(true);
            if (userData.role === "User") {
                setIsUser(true);
                setIsAdmin(false);
            } else {
                setIsUser(false);
                setIsAdmin(true);
            }
        } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
            setIsUser(false);
        }
    }, [userData]);

    return [isUser, isAdmin, userData, isAuthenticated];
}

export default ProtectedRouteHook;
