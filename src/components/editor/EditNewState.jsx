import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPendingNews } from '../../store/slices/news/thunk'
import { TableNews } from './TableNews'

export const EditNewState = () => {
    const { pendingNews } = useSelector((state) => state.news)
    const dispatch = useDispatch()
    
    useEffect(() =>{
        dispatch(getPendingNews())
    },[])
    
  return (
    <section>
        <table className='usersTable'>
            <thead>
                <tr>
                <th>
                Título
                </th>
                <th>
                    extracto
                </th>
                <th>
                    ID usuario
                </th>
                <th>
                    Consultar
                </th>
                <th>
                    Administrar
                </th>
                </tr>
            </thead>
            <tbody>
            {
       
                pendingNews.map((item, index)=> (
                    <TableNews item={item} key={item.id_user}/>
                ))
            }
        </tbody>
        </table>
    </section>
  )
}
