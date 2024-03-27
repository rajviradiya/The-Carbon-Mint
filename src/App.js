import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useFierbase } from "./context/fierbasecontext";
import Login from "./Pages/Login/index";
import OtpAuth from "./Pages/Otp-Auth/index";
import HomePage from "./Pages/Home/index";
import Event from "./Pages/Event/index";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage/index";
import FarmerPage from "./Pages/FarmDetalis/index";
import CountryCop from "./Pages/CountryPage/index";
import EventDetails from "./Pages/EventDetails/index"
import CropPage from "./Pages/Croppage/index";
import Showcam from "./Pages/Event/components/CameraRedirect"
import SpeedDialNav from "./Components/SpeedDialNav";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import InternetStatus from "./Utils/InternetStatus";

const App = () => {

  const fierbase = useFierbase();
  useEffect(() => {
    //fetch auth object
    fierbase.authuser();
  }, [fierbase.authuserrrr]);

  useEffect(() => {
    fierbase.readdata("/users/");
  }, [fierbase.authuserrrr]);

  useEffect(() => {
    fierbase.requestPermission()
  }, []);

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
              <InternetStatus>
                <ProtectedRoutes>
                  <HomePage />
                  <Navbar />
                </ProtectedRoutes>
              </InternetStatus>
            </>
          }
        />
        <Route path="/profile" element={
          <>
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          </>
        } />
        <Route path="/event" element={
          <>
            <ProtectedRoutes>
              <Event />
            </ProtectedRoutes>
          </>
        } />
        <Route path="/cam" element={
          <>
            <ProtectedRoutes>
              <Showcam />
            </ProtectedRoutes>
          </>
        } />
        <Route
          path="/farm"
          element={
            <>
              <ProtectedRoutes>
                <SpeedDialNav elementpass={<FarmerPage />} />
              </ProtectedRoutes>
            </>
          }
        />
        <Route path="/crop/:id" element={
          <>
            <ProtectedRoutes>
              <SpeedDialNav elementpass={<CropPage />} />
            </ProtectedRoutes>
          </>}
        />
        <Route path="/eventdetails/:id" element={
          <>
            <ProtectedRoutes>
              <EventDetails />
            </ProtectedRoutes>
          </>
        } />

      </Routes>
    </>
  );
};

export default App;
