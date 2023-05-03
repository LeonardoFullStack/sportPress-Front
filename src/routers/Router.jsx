import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Login } from '../components/Login'
import { LogOut } from '../components/LogOut'
import { Home } from '../components/Home'
import { ChangePass } from '../components/ChangePass'

export const Router = () => {
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<LogOut />} />
    <Route path='/changepass' element={<ChangePass />} />
    <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
    
    </>
  )
}
