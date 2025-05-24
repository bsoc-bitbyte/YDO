import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/Login'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from './components/Home/Home'

function App() {
  return (
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>
  )
}

export default App
