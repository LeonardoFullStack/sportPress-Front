import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Login } from '../components/Login'
import { LogOut } from '../components/LogOut'
import { Home } from '../components/Home'
import { ChangePass } from '../components/ChangePass'
import { UploadEntry } from '../components/collaborator/UploadEntry'
import { CreateUser } from '../components/CreateUser'

export const Router = () => {
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<LogOut />} />
    <Route path='/changepass' element={<ChangePass />} />
    <Route path='/collaborator/uploadentry' element={<UploadEntry />} />
    <Route path='/createuser' element={<CreateUser />} />
    <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
    
    </>
  )
}
