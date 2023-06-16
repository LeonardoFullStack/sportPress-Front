import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { checkCookie, checkLogin } from '../store/slices/users/thunk'
import { useCookie } from '../hooks/useCookie'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react' 

export const Login = () => {

  const { formulario, handleChange, enviado, setEnviado, serializarFormulario, setFormulario } = useForm('')
  const { email, name, role, isLoading } = useSelector((state) => state.users)
  const {loginWithRedirect} = useAuth0()
  const dispatch = useDispatch()
  const [logged, setlogged] = useState('unLogged')

  /**
 * Función para manejar el envío del formulario
 * @param {Object} ev - El evento que se desencadena cuando se envía el formulario
 */
  const handleSubmit = (ev) => {
    ev.preventDefault()

    const data = serializarFormulario(ev.target)

    if (data.email.length < 10 || data.password.length <= 2) {
      setlogged('invalid')
      return
    }


    setFormulario(data)

    setEnviado(true)


  }


  useEffect(() => {

    if (enviado) {
      dispatch(checkLogin(formulario, logged, setlogged))
      setEnviado(false)
    }
  }, [enviado])


  return (
    <>
  
      <div className='loginForm'>
        
        <form onSubmit={handleSubmit}>
          
        <div className='bigLogo'>
            <img alt='logo completo' src='images/logoyletras.png'/>
          </div>
          

          <div className='inputsLogin'>
            <input type='text' className='formInput' name='email' placeholder='Email' onChange={handleChange} />
            
            <input type='password' className='formInput' name='password' placeholder='Password' onChange={handleChange} />
          </div>
            {isLoading ?
              (<div className='loadingImage'>
                <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
              </div>)
              :
              (<input type='submit' className='entryButton' value=''/>)
            }
          <a className='pointer' onClick={() => loginWithRedirect()}>
            <div className='googleLink'>
              <p>
                Entrar con la cuenta de Google
              </p>
            </div>
          </a>

            {logged == 'invalid' &&
              <div className='errors'>
                Campo usuario o contraseña inválidos.
              </div>}

            {logged == 'failed' &&
              <div className='errors'>
                Usuario o contraseña incorrecta.
              </div>}

          
        </form>
      </div>

      {
        logged == 'admitted' &&
        <Navigate to={'/'} />
      }


    </>
  )
}
