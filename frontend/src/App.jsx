import { useState } from 'react'

import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSign from './pages/UserSign'
import CaptainSign from './pages/CaptainSign'
import CaptainLogin from './pages/CaptainLogin'
function App() {
  

  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path ="/Sign" element={<UserSign />} />
        <Route path ="/Login" element={<UserLogin />} />
        <Route path="/CaptainSign" element={<CaptainSign/>}/>
        <Route path = "/CaptainLogin" element ={<CaptainLogin/>}/>

      </Routes>

    </div>
  )
}

export default App
