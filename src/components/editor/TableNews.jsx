import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNewState } from '../../store/slices/news/thunk'

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
    
    <button onClick={handleApproveClick} className="classicButton">Aprovar</button>
    <button onClick={handleRejectClick} className="redButton">Rechazar</button>
    </td>
    </tr>
    {requestState === 'successfullStateNew' && (
        <tr>
          <td colSpan="4">Noticia modificada correctamente</td>
        </tr>
      )}
    </>
  )
}
