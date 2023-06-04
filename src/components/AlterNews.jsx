import React from 'react'
import { NavLink } from 'react-router-dom'

export const AlterNews = ({item}) => {

  const smallText = item.text.substring(0,270)

  return (
    <>
    <div className='alterNew'>
    <NavLink to={'viewone/' + item.id_new} className='navLink'>
    <h2>{item.title}</h2>
   
    </NavLink>
    <div className='imageAndText'>
    <img src={item.image} alt={item.altimage} />

    <p>
      {smallText}... <NavLink to={'viewone/' + item.id_new} className='navLink'>Leer más</NavLink> 
    </p>

    </div>
    </div>
    </>
  )
}
