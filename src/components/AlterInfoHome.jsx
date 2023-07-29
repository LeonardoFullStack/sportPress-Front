import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { TeamInfo } from './TeamInfo'
import { Publi } from './Publi'

export const AlterInfoHome = () => {
    const { email, name, role, team } = useSelector((state) => state.users)

    const handleLogins = (order) => {
        const mainContainer = document.querySelector('main');
        const loginForm = document.querySelector('.loginForm');
        const registerForm = document.querySelector('.register');
        const changePassForm = document.querySelector('.changePassDiv');
  
        mainContainer.classList.add('tapao')
  
        switch (order) {
          case 'login':
            loginForm.classList.remove('displayNone')
            break;
            case 'register':
            registerForm.classList.remove('displayNone')
            break;
            case 'changePass':
            changePassForm.classList.remove('displayNone')
            break;
        }
        
      }

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
                <NavLink onClick={()=>handleLogins('login')} className='navLinkUser'
          
                >
                    <button className='classicButton center'>
                        Login
                    </button>
                </NavLink>
                <NavLink onClick={()=>handleLogins('register')} className='navLinkUser'
          
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
        <Publi/>
    
    </>
  )
}
