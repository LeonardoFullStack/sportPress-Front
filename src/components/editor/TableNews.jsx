import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNewState } from '../../store/slices/news/thunk'
import { NavLink } from 'react-router-dom'

export const TableNews = ({item}) => {
    const { requestState } = useSelector((state) => state.news)
    const dispatch = useDispatch()
    const handleApproveClick = () => {
        dispatch(updateNewState('aproved', item.id_new))
      }
    
      const handleRejectClick = () => {
        dispatch(updateNewState('rejected', item.id_new))
      }


  return (
    <>
    <tr>
    <td>
    {item.title}
    </td>
    <td>
     {item.extract}
    </td>
    <td>
        {item.id_user}
    </td>
    <td>
        <NavLink to={'../viewone/' + item.id_new} className='navLink'>
            <button className='classicButton'>consultar</button>
        </NavLink>
    </td>
    <td className='gridTable'>
    
    <button onClick={handleApproveClick} className="greenButton">Aprovar</button>
    <button onClick={handleRejectClick} className="redButton">Rechazar</button>
    </td>
    </tr>
    {requestState === 'successfullStateNew' && (
        <tr>
          <td colSpan="5">Noticia modificada correctamente</td>
        </tr>
      )}
    </>
  )
}
