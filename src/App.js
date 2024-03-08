import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useFierbase } from "./context/fierbasecontext";
import Login from "./Pages/Login/index";
import OtpAuth from "./Pages/Otp-Auth/index";
import HomePage from "./Pages/Home/index";
import Event from "./Pages/Event/index";
import NavbarWrapper from "./Components/NavbarWrapper";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage/index"

const App = () => {
  const [authuserrrr, setauthuserrrr] = useState("");
  const fierbase = useFierbase();

  useEffect(() => {
    fierbase.authuser(setauthuserrrr);
  }, []);

  if (authuserrrr === "") {
    console.log("user Loged Out");
  } else {
    console.log("useloged in");
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<OtpAuth />} />
        <Route
          path="/home"
          element={
            <>
              <HomePage
                authuserrrr={authuserrrr}
                setauthuserrrr={setauthuserrrr}
              />
              <Navbar />
            </>
          }
        />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/event" element={<Event />} />
      </Routes>
    </>
  );
};

export default App;
