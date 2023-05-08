import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateRoleUser } from '../store/slices/users/thunk';

export const Table = ({item}) => {
    const { emailModified, requestState } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    console.log(emailModified)
    const roles = [
        "administrator",
        "moderator",
        "user",
        "collaborator",
        "editor"
      ];

    const handleRole = (ev) => {
        console.log(item.email, selectedRole)
        dispatch(updateRoleUser(item.email, selectedRole))

    }

    const [selectedRole, setSelectedRole] = useState(item.role)

    const handleSelectChange = (event) => {
      setSelectedRole(event.target.value)
    }
  
  return (
    <>
    <tr>
    <td>
    {item.name}
    </td>
    <td>
     {item.email}
    </td>
    <td>
        {item.role}
    </td>
    <td>
    <select value={selectedRole} onChange={handleSelectChange}>
      {roles.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
    <button id={item.id_user} className="classicButton" onClick={handleRole}>Cambiar</button>
    </td>
    </tr>
    
        {
            (item.email == emailModified) && (requestState == 'roleModified') &&
            <tr className='successfull'>
                rol actualizado correctamente
            </tr>
        }
    
    </>
  )
}
