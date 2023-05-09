import React from 'react'
import { useSelector } from 'react-redux'

export const MyTeam = () => {
  
    const { team } = useSelector((state) => state.users)

  return (
    <>
    {
        team == 'Barcelona' &&
        <img src='../src/assets/barca.png'/>
    }
    {
        team == 'Madrid' &&
        <img src='../src/assets/madrid.jpg'/>
    }
    </>
  )
}
