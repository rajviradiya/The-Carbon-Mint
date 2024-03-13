import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useFierbase } from "./context/fierbasecontext";
import Login from "./Pages/Login/index";
import OtpAuth from "./Pages/Otp-Auth/index";
import HomePage from "./Pages/Home/index";
import Event from "./Pages/Event/index";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage/index";
import FarmerPage from "./Pages/FarmDetalis/index";
import CountryCop from "./Pages/CountryPage/index"
import CropPage from "./Pages/Croppage/index"
import { v4 as uuid } from "uuid";
import SpeedDialNav from "./Components/SpeedDialNav";

const App = () => {
  const fierbase = useFierbase();

  console.log(fierbase, "main fierbase context");
  useEffect(() => {
    fierbase.authuser();
  }, []);

  if (fierbase.authuserrrr === "") {
    console.log("user Loged Out");
  } else {
    console.log("useloged in");
    fierbase.Writedata("/users/" + uuid(), {
      name: fierbase.authuserrrr.phoneNumber,
    });
  }

  //realtime DB
  const handleuser = () => {
    //create user
    // let sigininuser = fierbase.signInWithEmailAndPassword(
    //   "raj112@gmial.com",
    //   "123456"
    // );
    //set That data in realtime database
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<OtpAuth />} />
        <Route path="/countrys" element={<CountryCop/>}/>
        <Route
          path="/home"
          element={
            <>
              <HomePage />
              <Navbar />
            </>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event" element={<Event />} />
        <Route
          path="/farm"
          element={
            <>
              <SpeedDialNav elementpass={<FarmerPage />} />
            </>
          }
        />
        <Route path="/crop" element={<CropPage />} />
      </Routes>
    </>
  );
};

export default App;
