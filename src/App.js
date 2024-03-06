import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from "./Pages/Login/index"
import OtpAuth from "./Pages/Otp-Auth/index"
import HOmePage from "./Pages/Home/index"
import { useFierbase } from './context/fierbasecontext'

const App = () => {

  const [authuserrrr, setauthuserrrr] = useState("");
  const fierbase = useFierbase();

  useEffect(() => {
    fierbase.authuser(setauthuserrrr);
  }, []);

  if(authuserrrr === ""){
    console.log("user Loged Out")
  }else{
    console.log("useloged in")
  }

  return (
    <>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/auth' element={<OtpAuth/>}/>
          <Route path='/home' element={<HOmePage  authuserrrr={authuserrrr} setauthuserrrr={setauthuserrrr}/>}/>
          {/* <Route path='/event' element/> */}
        </Routes>
    </>
  )
}

export default App
