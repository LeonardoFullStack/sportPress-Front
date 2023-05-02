import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    const { email, name, role, isLoading } = useSelector((state) => state.users)
  return (
    <nav>
        {
            name && <NavLink to='logout' className='navLink'
          
            >Logout
            </NavLink>
        }
        {
            name == null && <NavLink to='login' className='navLink'
          
            >Login
            </NavLink>
        }
          
    </nav>
  )
}
