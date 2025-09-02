import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Principal from './Pages/Principal'
import LoginVol from './Pages/LoginVol'
import LoginOrg from './Pages/LoginOrg'
import DashboardOrg from './Pages/DashOrg'
import './App.css'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<LoginVol />} />
        <Route path="/login-org" element={<LoginOrg />} />
        <Route path="/dashboard-org" element={<DashboardOrg />} />
      </Routes>
    </>
  )
}

export default App