import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
  
    const { email, name, role, isLoading } = useSelector((state) => state.users)

  return (
    <nav>
          <NavLink to='/' className='navLink'
          
          >Home
          </NavLink>
        {
            name && <>
            <NavLink to='logout' className='navLink'
          
            >Logout
            </NavLink>
            <NavLink to='changepass' className='navLink'
          
            >Cambiar contraseña
            </NavLink>
            
            </>
            
        }
        {
            name == null && <>
            <NavLink to='login' className='navLink'
          
            >Login
            </NavLink>
            <NavLink to='createuser' className='navLink'
          
            >Registrarse
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
  )
}
