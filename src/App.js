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
import Notification from "./Pages/Notificationpage/index"
import Showcam from "./Pages/Event/components/CameraRedirect"
import SpeedDialNav from "./Components/SpeedDialNav";
import Nav from "./Pages/Home/Components/Nav";

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
        <Route path="/event/:name" element={
          <>
            <Event />
          </>
        } />
        <Route path="/cam/:name" element={
          <>
            <Showcam />
          </>
        } />
        <Route
          path="/farm/:name"
          element={
            <>
              <SpeedDialNav elementpass={<FarmerPage />} />
            </>
          }
        />
        <Route path="/crop/:name" element={
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
            <Nav />
            <Notification />
            <Navbar />
          </>
        } />
      </Routes>
    </>
  );
};

export default App;
