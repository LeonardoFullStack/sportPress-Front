import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { TeamInfo } from './TeamInfo'

export const AlterInfoHome = () => {
    const { email, name, role, team } = useSelector((state) => state.users)
  return (
    <>
        {
            name != null &&
            <TeamInfo/>     
        }
        
        <div id='userInfo'>
            {
                name == null ?
                <>
                <p>
                    No te has registrado
                </p>
                <NavLink to='login' className='navLinkUser'
          
                >
                    <button className='classicButton center'>
                        Login
                    </button>
                </NavLink>
                <NavLink to='login' className='navLinkUser'
          
                >
                    <button className='classicButton center'>
                        Registrarme
                    </button>
                </NavLink>
                <p>
                Regístrate para poder comentar!
               </p>
              </>
              :
              <>
                <p className='userInfoKey'>
                    Usuario: <span className='userInfoValue'>{email}</span>
                </p>
                <p className='userInfoKey'>
                    Nombre: <span className='userInfoValue'>{name}</span>
                </p>
                <p className='userInfoKey'>
                    Rol: <span className='userInfoValue'>{role}</span>
                </p>
              </>
            }
        </div>
        
    
    </>
  )
}
