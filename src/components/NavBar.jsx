import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Login } from './Login'
import { CreateUser2 } from './CreateUser2'
import { ChangePass } from './ChangePass'


export const NavBar = () => {
  
    const { email, name, role, isLoading, requestState } = useSelector((state) => state.users);

    

    const clearPage = () => {
      const mainContainer = document.querySelector('main');
      const loginForm = document.querySelector('.loginForm');
      const registerForm = document.querySelector('.register');
      const changePassForm = document.querySelector('.changePassDiv');
      mainContainer.classList.remove('tapao')
      loginForm.classList.add('displayNone')
      registerForm.classList.add('displayNone')
      changePassForm.classList.add('displayNone')
    }
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

    useEffect(() => {
         if (requestState == 'successfull') clearPage()
    }, [requestState])
    

  return (
    <>
    <nav>

          <NavLink to='/' className='navLink'
          
          >Home
          </NavLink>
        {
            name && <>
            <NavLink to='logout' className='navLink'
          
            >Logout
            </NavLink>
            <NavLink onClick={()=>handleLogins('changePass')} className='navLink'
          
            >Cambiar contraseña
            </NavLink>
            
            </>
            
        }
        {
            name == null && <>
            <NavLink onClick={()=>handleLogins('login')} className='navLink'
          
            >Login
            </NavLink>
            <NavLink onClick={()=>handleLogins('register')} className='navLink'
          
            >Registro
            </NavLink>
            </>
            
        }
        {
            role == 'collaborator' && <>
            <NavLink to='collaborator/uploadentry' className='navLink'
          
          >Subir noticia
          </NavLink>
          <NavLink to='collaborator/newsonstates' className='navLink'
          
          >Consultar estados
          </NavLink>
            </>
            
        }

        {
            role == 'admin' && <>
            <NavLink to='admin/updaterole' className='navLink'
          
          >Gestionar usuarios
          </NavLink>
            </>
            
        }

        {
            role == 'editor' && <>
            <NavLink to='editor/editnewstate' className='navLink'
          
          >Publicar noticias
          </NavLink>
            </>
            
        }

          
    </nav>
        
      </>
  )
}
