import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./Pages/Login/index"
import OtpAuth from "./Pages/Otp-Auth/index"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/auth' element={<OtpAuth/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
