import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Login } from '../components/Login'
import { LogOut } from '../components/LogOut'
import { Home } from '../components/Home'

export const Router = () => {
  return (
    <>
    <NavBar/>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<LogOut />} />
    <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
    
    </>
  )
}
