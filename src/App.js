import React, { useEffect } from "react";
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

const App = () => {

  const fierbase = useFierbase();
  useEffect(() => {
    //fetch auth object
    fierbase.authuser();
  }, [fierbase.authuserdata]);

  useEffect(() => {
    fierbase.readdata("/users/");
  }, [fierbase.authuserdata]);

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
              <HomePage />
              <Navbar />
            </>
          }
        />
        <Route path="/profile" element={
          <>
            <ProfilePage />
          </>
        } />
        <Route path="/event" element={
          <>
            <Event />
          </>
        } />
        <Route path="/cam" element={
          <>
            <Showcam />
          </>
        } />
        <Route
          path="/farm"
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

      </Routes>
    </>
  );
};

export default App;
