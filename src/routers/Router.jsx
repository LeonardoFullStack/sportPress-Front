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
import { EditNewState } from '../components/editor/EditNewState'
import { NewsOnStates } from '../components/collaborator/NewsOnStates'
import { Auth0 } from '../components/Auth0'
import { CreateUser2 } from '../components/CreateUser2'

export const Router = () => {

  const {role} = useSelector((state) => state.users)
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/auth0' element={<Auth0 />} />
    <Route path='/login' element={<Login />} />
    <Route path='/logout' element={<LogOut />} />
    <Route path='/viewone/:id' element={<ViewOne />} />
    <Route path='/changepass' element={<ChangePass />} />
    <Route path='/createuser' element={<CreateUser2 />} />
    <Route path='/*' element={<Navigate to={'/'} />} />
    {
    role == 'collaborator' && <>
    <Route path='/collaborator/uploadentry' element={<UploadEntry />} />
    <Route path='/collaborator/newsonstates' element={<NewsOnStates />} />
    </>
    }
    {
    role == 'admin' && 
    <Route path='/admin/updaterole' element={<UpdateRole />} />
    }
    {
    role == 'editor' && 
    <Route path='/editor/editnewstate' element={<EditNewState />} />
    }
    </Routes>
    
    </>
  )
}
