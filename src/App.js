import React from "react";
import Map from "./Components/Map/map";
import Login from "./Components/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import ProtectedRouteHook from "./hook/auth/ptotected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import ReceivingDeliveringSamplesForm from "./Components/Form/ReceivingDeliveringSamplesForm";
import CriminalEffects from "./Components/Form/CriminalEffects";
import TrafficEetectionReport from "./Components/Form/TrafficEetectionReport";

const App = () => {
  // استدعاء ProtectedRouteHook داخل المكون
  const [isUser, isAdmin, userData, isAuthenticated] = ProtectedRouteHook();

  return (
    <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form1" element={<ReceivingDeliveringSamplesForm />} />
            <Route path="/form2" element={<CriminalEffects />} />
            <Route path="/form3" element={<TrafficEetectionReport />} />
            <Route element={<ProtectedRoute auth={isAuthenticated} />}>
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
      
    </BrowserRouter>
  );
};

export default App;
