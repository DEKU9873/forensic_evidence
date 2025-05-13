import React, { useState, useEffect } from "react";
import notify from "../useNotification";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const validationValues = () => {
    if (name === "") {
      notify("من فضلك ادخل اسم المستخدم", "error");
      return false;
    }

    if (password === "") {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) {
      return;
    }
    setIsPress(true);
    setLoading(true);
    await dispatch(loginUser({ username: name, password: password }));
    setLoading(false);
    setIsPress(false);
  };

  const res = useSelector((state) => state.authReducer.loginUser);

  useEffect(() => {
    if (!loading) {
      if (res) {
        if (res.data && res.data.data) {
          if (
            res.data.data.error ===
            "No active account found with the given credentials"
          ) {
            Cookies.remove("access");
            Cookies.remove("refresh");
            Cookies.remove("user");
            notify("اسم المستخدم او كلمة السر غير صحيحة", "error");
            return;
          }

          Cookies.set("access", res.data.data.access_token, { expires: 1 });
          Cookies.set("refresh", res.data.data.refresh_token, { expires: 1 });
          Cookies.set("user", JSON.stringify(res.data.data), { expires: 1 });

          notify("تم تسجيل الدخول بنجاح", "success");

          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else {
          Cookies.remove("access");
          Cookies.remove("refresh");
          Cookies.remove("user");
        }
      }
    }
  }, [loading, res, navigate]);

  return [
    name,
    password,
    loading,
    onChangeName,
    onChangePassword,
    onSubmit,
    isPress,
  ];
};

export default LoginHook;

// import React, { useState, useEffect } from "react";
// import notify from "../useNotification";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../redux/actions/authAction";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const LoginHook = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [isPress, setIsPress] = useState(false);

//   const onChangeName = (e) => {
//     setName(e.target.value);
//   };

//   const onChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const validationValues = () => {
//     if (name === "") {
//       notify("من فضلك ادخل اسم المستخدم", "error");
//       return false;
//     }

//     if (password === "") {
//       notify("من فضلك ادخل كلمة السر", "error");
//       return false;
//     }
//     return true;
//   };

//   const onSubmit = async () => {
//     const isValid = validationValues();
//     if (!isValid) {
//       return;
//     }
//     setIsPress(true);
//     setLoading(true);
//     await dispatch(loginUser({ username: name, password: password }));
//     setLoading(false);
//     setIsPress(false);
//   };

//   const res = useSelector((state) => state.authReducer.loginUser);

//   useEffect(() => {
//     if (!loading) {
//       if (res) {
//         if (res.data && res.data.data) {
//           // حفظ التوكنات في الكوكيز
//           Cookies.set("access", res.data.data.access_token, { expires: 1 });
//           Cookies.set("refresh", res.data.data.refresh_token, { expires: 1 });
//           Cookies.set("user", JSON.stringify(res.data.data), { expires: 1 });

//           notify("تم تسجيل الدخول بنجاح", "success");

//           setTimeout(() => {
//             navigate("/home"); // إعادة التوجيه
//           }, 1500);
//         } else {
//           Cookies.remove("access");
//           Cookies.remove("refresh");
//           Cookies.remove("user");
//         }

//         console.log(res.data.data.error)

//         if (res.data.data.error === "No active account found with the given credentials") {
//           Cookies.remove("access");
//           Cookies.remove("refresh");
//           Cookies.remove("user");
//           notify("اسم المستخدم او كلمة السر غير صحيحة", "error");
//         }
//       }
//     }
//   }, [loading, res, navigate]);

//   return [name, password, loading, onChangeName, onChangePassword, onSubmit, isPress];
// };

// export default LoginHook;
