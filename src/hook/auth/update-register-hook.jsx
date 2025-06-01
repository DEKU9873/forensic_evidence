import React, { useState, useEffect } from "react";
import notify from "../../hook/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUser } from "../../redux/actions/authAction";

const UpdateRegisterHook = (user) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState(user.full_name || "");
  const [name, setName] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone_number || "");
  const [role, setRole] = useState(user.role || "");
  const [loading, setLoading] = useState(true);

  const res = useSelector((state) => state.authReducer.updateUser);
  console.log("res", res);

  // دالة تغيّر أي حقل بناءً على الاسم
  const handleChange = (setter) => (e) => setter(e.target.value);

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
    if (!emailRegex.test(email)) {
      notify("من فضلك ادخل ايميل صحيح", "error");
      return false;
    }
    if (phone.length <= 10) {
      notify("من فضلك ادخل رقم هاتف صحيح", "error");
      return false;
    }

    return true;
  };

  const OnSubmit = async () => {
    if (!validationValues()) return;

    setLoading(true);
    try {
      await dispatch(
        updateUser(user.id, {
          full_name: fullName,
          username: name,
          email,
          phone_number: phone,
          role,
        })
      );
    } catch (error) {
      notify("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && res) {
      notify("تم تعديل المستخدم", "success");
      dispatch(getAllUsers()); 
    }
  }, [loading, res]);

  useEffect(() => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      setFirstName(names[0]);
      setLastName(names.slice(1).join(" "));
    }
  }, [fullName]);

  return [
    firstName,
    lastName,
    fullName,
    role,
    name,
    email,
    phone,
    loading,
    handleChange(setName),
    handleChange(setEmail),
    handleChange(setPhone),
    handleChange(setRole),
    handleChange(setFirstName),
    handleChange(setLastName),
    handleChange(setFullName),
    OnSubmit,
  ];
};

export default UpdateRegisterHook;
