import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsByStates } from '../../store/slices/news/thunk'
import { StateNewTable } from './StateNewTable'

export const NewsOnStates = () => {
    const { id_user } = useSelector((state) => state.users)
    const { stateNews, requestState } = useSelector((state) => state.news)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getNewsByStates(id_user))
    },[])
  return (
    <>

    <section>
        <table className='usersTable aproved'>
            <thead>
                <th colspan="4" className='aproved'>
                    Aprovadas
                </th>
                <tr>
                <th>
                Título
                </th>
                <th>
                    Extracto
                </th>
                <th>
                    Tags
                </th>
                <th>
                    Consultar
                </th>
                </tr>
            </thead>
            <tbody>

            {
                stateNews.aproved.map((item)=> (
                    <StateNewTable item={item} key={item.id_new}/>
                ))
            }

            </tbody>
        </table>
        
    </section>

    <section>
        <table className='usersTable pending'>
            <thead>
            <th colspan="4" className='pending'>
                    Pendientes
                </th>
                <tr>
                <th>
                Título
                </th>
                <th>
                    Extracto
                </th>
                <th>
                    Tags
                </th>
                <th>
                    Consultar
                </th>
                </tr>
            </thead>
            <tbody>

            {
                stateNews.pending.map((item)=> (
                    <StateNewTable item={item} key={item.id_new}/>
                ))
            }

            </tbody>
        </table>
        
    </section>

    <section>
        <table className='usersTable rejected'>
            <thead>
            <th colspan="4" className='rejected'>
                    Rechazadas
                </th>
                <tr>
                <th>
                Título
                </th>
                <th>
                    Extracto
                </th>
                <th>
                    Tags
                </th>
                <th>
                    Consultar
                </th>
                </tr>
            </thead>
            <tbody>

            {
                stateNews.rejected.map((item)=> (
                    <StateNewTable item={item} key={item.id_new}/>
                ))
            }

            </tbody>
        </table>
        
    </section>

    </>
  )
}
