import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useFierbase } from "./context/fierbasecontext";
import Login from "./Pages/Login/index";
import OtpAuth from "./Pages/Otp-Auth/index";
import MultiLandParcel from "./Pages/MultipleLandParcel/index";
import Event from "./Pages/Event/index";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage/index";
import FarmerPage from "./Pages/FarmDetalis/index";
import CountryCop from "./Pages/CountryPage/index";
import EventDetails from "./Pages/EventDetails/index"
import CropPage from "./Pages/Croppage/index";
import Notification from "./Pages/Notificationpage/index"
import Showcam from "./Pages/Event/components/CameraRedirect"
import SpeedDialNav from "./Components/SpeedDialNav";
import NavMain from "./Components/NavMain";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<OtpAuth />} />
        <Route path="/countrys" element={<CountryCop />} />
        <Route
          path="/home"
          element={
            <>
              <NavMain />
              <MultiLandParcel />
              <Navbar />
            </>
          }
        />
        <Route path="/profile" element={
          <>
            <ProfilePage />
          </>
        } />
        <Route path="/event/:id" element={
          <>
            <Event />
          </>
        } />
        <Route path="/cam/:id" element={
          <>
            <Showcam />
          </>
        } />
        <Route
          path="/farm/:id"
          element={
            <>
              <SpeedDialNav elementpass={<FarmerPage />} />
            </>
          }
        />
        <Route path="/crop/:id" element={
          <>
            <SpeedDialNav elementpass={<CropPage />} />
          </>}
        />
        <Route path="/eventdetails/:id" element={
          <>
            <EventDetails />
          </>
        } />

        <Route path="/notification" element={
          <>
            <NavMain />
            <Notification />
            <Navbar />
          </>
        } />
      </Routes>
    </>
  );
};

export default App;
