import React from 'react'
import { NavLink } from 'react-router-dom'

export const AlterNews = ({item}) => {
  return (
    <>
    <div className='alterNew'>
    <NavLink to={'viewone/' + item.id_new} className='navLink'>
    <h2>{item.title}</h2>
   
    </NavLink>
    <div className='alterNewImage'>
    <img src={item.image} alt={item.altimage} />
    <p>
      {item.text}  
    </p>
    </div>
    </div>
    </>
  )
}
