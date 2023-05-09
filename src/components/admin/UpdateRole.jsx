import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/slices/users/thunk'
import { Table } from '../Table'

export const UpdateRole = () => {
    const { users } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUsers())
    },[])
    
  return (
    <section>
        <table className='usersTable'>
            <thead>
                <tr>
                <th>
                Nombre
                </th>
                <th>
                    Email
                </th>
                <th>
                    Rol
                </th>
                <th>
                    Administrar
                </th>
                </tr>
            </thead>
            <tbody>
            {
       
                users.map((item, index)=> (
                    <Table item={item} key={item.id_user}/>
                ))
            }
        </tbody>
        </table>
        
    </section>
  )
}
