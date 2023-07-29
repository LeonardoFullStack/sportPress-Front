import React from 'react'
import { useSelector } from 'react-redux'


export const MyTeam = () => {
  
    const { team } = useSelector((state) => state.users)

  return (
    <>
    {
        team == 'Barcelona' &&
        <img src='images/barca.png' alt='escudo barça'/>
        
    }
    {
        team == 'Madrid' &&
        <img src='images/madrid.jpg' alt='escudo madrid'/>
    }
    </>
  )
}
