import React from "react";
import Map from "./Components/Map/map";
import Login from "./Components/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Uitily/Sidebar";
import ProtectedRouteHook from "./hook/auth/ptotected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import ReceivingDeliveringSamplesForm from "./Components/Form/ReceivingDeliveringSamplesForm";
import CriminalEffects from "./Components/Form/CriminalEffects";
import TrafficEetectionReport from "./Components/Form/TrafficEetectionReport";
import ReceivingDeliveringSamplesFormPage from "./pages/FormPage/ReceivingDeliveringSamplesFormPage";
import CriminalEffectsPage from "./pages/FormPage/CriminalEffectsPage";
import TrafficEetectionReportPage from "./pages/FormPage/TrafficEetectionReportPage";

const App = () => {
  const [isUser, isAdmin, userData, isAuthenticated] = ProtectedRouteHook();

  return (
    <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form1" element={<ReceivingDeliveringSamplesFormPage />} />
            <Route path="/form1Details:id" element={<ReceivingDeliveringSamplesForm />} />
            <Route path="/form2" element={<CriminalEffectsPage />} />
            <Route path="/form3" element={<TrafficEetectionReportPage />} />
            <Route path="/form3Details:id" element={<TrafficEetectionReport />} />
            <Route path="/form2Details:id" element={<CriminalEffects />} />

            <Route element={<ProtectedRoute auth={isAuthenticated} />}>
              <Route path="/map" element={<Map />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
      
    </BrowserRouter>
  );
};

export default App;
