import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/landing'
import LoginPage from './components/login'
import Home from './components/home'
import Help from './components/help'

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}


export default App
