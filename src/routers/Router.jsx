import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Login } from '../components/Login'
import { LogOut } from '../components/LogOut'
import { Home } from '../components/Home'
import { ChangePass } from '../components/ChangePass'
import { UploadEntry } from '../components/collaborator/UploadEntry'
import { CreateUser } from '../components/CreateUser'
import { useSelector } from 'react-redux'
import { ViewOne } from '../components/ViewOne'
import { UpdateRole } from '../components/admin/UpdateRole'

export const Router = () => {

  const {role} = useSelector((state) => state.users)
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<LogOut />} />
    <Route path='/viewone/:id' element={<ViewOne />} />
    <Route path='/changepass' element={<ChangePass />} />
    <Route path='/createuser' element={<CreateUser />} />
    <Route path='/*' element={<Navigate to={'/'} />} />
    {
    role == 'collaborator' && 
    <Route path='/collaborator/uploadentry' element={<UploadEntry />} />
    }
    {
    role == 'admin' && 
    <Route path='/admin/updaterole' element={<UpdateRole />} />
    }
    </Routes>
    
    </>
  )
}
