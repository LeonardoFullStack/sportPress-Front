import React from 'react'
import { NavLink } from 'react-router-dom'

export const StateNewTable = ({item}) => {
    
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
            {item.tags}
        </td>
        <td>
        <NavLink to={'../viewone/' + item.id_new} className='navLink'>
            <button className='classicButton'>consultar</button>
        </NavLink>
        </td>
    </tr>
    </>
  )
}
