import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Uitily/Sidebar";
import ProtectedRouteHook from "./hook/auth/ptotected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Home from "./Components/Home/Home";
import Map from "./pages/Map/map";
import Profile from "./Components/Profile/Profile";
import ReceivingDeliveringSamplesFormPage from "./pages/FormPage/ReceivingDeliveringSamplesFormPage";
import ReceivingDeliveringSamplesForm from "./Components/Form/ReceivingDeliveringSamples/ReceivingDeliveringSamplesForm";
import CriminalEffectsPage from "./pages/FormPage/CriminalEffectsPage";
import CriminalEffects from "./Components/Form/CriminalEffects/CriminalEffects";
import TrafficEetectionReportPage from "./pages/FormPage/TrafficEetectionReportPage";
import TrafficEetectionReport from "./Components/Form/TrafficEetection/TrafficEetectionReport";
import InjuriesOnBodyForm from "./Components/Form/InjuriesOnBodyForm";
import CarForm from "./Components/Form/CarForm";
import ReportDownloader from "./Components/Report/ReportDownloader";
import CrimeDashboard from "./pages/Dashboard/CrimeDashboard";

const App = () => {
  const [isUser, isAdmin, userData, isAuthenticated, loading] = ProtectedRouteHook();

  if (loading) {
    return <div>Loading...</div>; // ✅ عرض رسالة تحميل أثناء استرجاع البيانات
  }

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form1" element={<ReceivingDeliveringSamplesFormPage />} />
        <Route path="/form1/:id" element={<ReceivingDeliveringSamplesForm />} />
        <Route path="/form2" element={<CriminalEffectsPage />} />
        <Route path="/form2/:id" element={<CriminalEffects />} />
        <Route path="/form3" element={<TrafficEetectionReportPage />} />
        <Route path="/form3/:id" element={<TrafficEetectionReport />} />
        <Route path="/form4" element={<InjuriesOnBodyForm />} />
        <Route path="/form5" element={<CarForm />} />
        <Route path="/report" element={<ReportDownloader />} />
        <Route path="/dashboard" element={<CrimeDashboard />} />
        <Route
          path="/map"
          element={isAuthenticated ? <Map /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;





// import React from "react";
// import Map from "./pages/Map/map";
// import Login from "./pages/Auth/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./Components/Uitily/Sidebar";
// import ProtectedRouteHook from "./hook/auth/ptotected-route-hook";
// import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
// import Home from "./Components/Home/Home";
// import Profile from "./Components/Profile/Profile";
// import ReceivingDeliveringSamplesForm from "./Components/Form/ReceivingDeliveringSamples/ReceivingDeliveringSamplesForm";
// import CriminalEffects from "./Components/Form/CriminalEffects/CriminalEffects";
// import TrafficEetectionReport from "./Components/Form/TrafficEetection/TrafficEetectionReport";
// import ReceivingDeliveringSamplesFormPage from "./pages/FormPage/ReceivingDeliveringSamplesFormPage";
// import CriminalEffectsPage from "./pages/FormPage/CriminalEffectsPage";
// import TrafficEetectionReportPage from "./pages/FormPage/TrafficEetectionReportPage";
// import InjuriesOnBodyForm from "./Components/Form/InjuriesOnBodyForm";
// import CarForm from "./Components/Form/CarForm";

// const App = () => {
//   const [isUser, isAdmin, userData, isAuthenticated] = ProtectedRouteHook();

//   return (
//     <BrowserRouter>
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/form1" element={<ReceivingDeliveringSamplesFormPage />} />
//         <Route path="/form1/:id" element={<ReceivingDeliveringSamplesForm />} />
//         <Route path="/form2" element={<CriminalEffectsPage />} />
//         <Route path="/form2/:id" element={<CriminalEffects />} />
//         <Route path="/form3" element={<TrafficEetectionReportPage />} />
//         <Route path="/form3/:id" element={<TrafficEetectionReport />} />
//         <Route path="/form4" element={<InjuriesOnBodyForm />} />
//         <Route path="/form5" element={<CarForm />} />

//         <Route element={<ProtectedRoute auth={isAuthenticated} />}>
//           <Route path="/map" element={<Map />} />
//           <Route path="/profile" element={<Profile />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
