import React from 'react'
import { NavLink } from 'react-router-dom'

export const Publi = () => {

  return (
    <section className='publi'>
        <img src='/images/devimg.png'/>
        <p>
            Esta es una página web de Leonardo developer.
            Si quieres visitar mi web y ver mis otros proyectos eres bienvenido!
        </p>
        <NavLink className='NavLink' to='https://leonardofullstack.netlify.app/' target='blank'>
            <button>
                <img src='/images/despliegue.png'/>
                <span>
                    Web Personal
                </span>
            </button>
        </NavLink>
    </section>
  )
}
