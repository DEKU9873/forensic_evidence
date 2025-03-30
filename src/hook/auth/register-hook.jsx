import React, { useState, useEffect } from "react";
import notify from "../../hook/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../redux/actions/authAction";

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);


  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const validationValues = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
      notify("من فضلك ادخل اسم المستخدم", "error");
      return false;
    }
    if (email === "") {
      notify("من فضلك ادخل الايميل", "error");
      return false;
    }
    if (password === "") {
      notify("من فضلك ادخل كلمة السر", "error");
      return false;
    }
    if (!emailRegex.test(email)) {
      notify("من فضلك ادخل ايميل صحيح", "error");
      return false;
    }
    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }
    if (password !== confirmPassword) {
      notify("من فضلك تاكد من كلمه السر", "error");
      return false;
    }
    return true;
  };

  const res = useSelector((state) => state.authReducer.createUser);

  const OnSubmit = async () => {
    const isValid = validationValues();
    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(
        createNewUser({
          first_name: firstName,
          last_name: lastName,
          username: name,
          email: email,
          phone_number: phone,
          password: password,
          password2: confirmPassword,
          role: role,
        })
      );
    } catch (error) {
      notify("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);
        if (res.data && res.data.data) {
          localStorage.setItem("access", res.data.data.access_token);
          localStorage.setItem("refresh", res.data.data.refresh_token);
          notify("تم التسجيل بنجاح", "success");
        }
  
        if (res.data.error) {
          if (res.data.error.email) {
            notify("البريد الإلكتروني مستخدم بالفعل", "error");
          }
          if (res.data.error.username) {
            notify("اسم المستخدم مستخدم بالفعل", "error");
          }
        }
  
        if (res.data.errors && res.data.errors.length > 0) {
          const errorMessages = {
            "Password must be at least 8 characters long.": 
              "كلمة المرور يجب أن تكون على الأقل 8 أحرف.",
            "Password must contain at least one uppercase letter.": 
              "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.",
            "Password must contain at least one lowercase letter.": 
              "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل.",
            "Password must contain at least one digit.": 
              "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.",
            "Password must contain at least one special character.": 
              "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل.",
          };
  
          const errorMsg = res.data.errors[0].msg;
          const message = errorMessages[errorMsg];
  
          if (message) {
            notify(message, "error");
          } else {
            notify("حدث خطأ غير معروف", "error");
          }
        }
      }
    }
  }, [loading]);
  

  return [
    firstName,
    lastName,
    role,
    name,
    email,
    phone,
    password,
    confirmPassword,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeRole,
    onChangeFirstName,
    onChangeLastName,
    OnSubmit,
  ];
};

export default RegisterHook;
