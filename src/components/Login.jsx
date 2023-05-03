import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { checkCookie, checkLogin } from '../store/slices/users/thunk'
import { useCookie } from '../hooks/useCookie'
import { Navigate } from 'react-router-dom'

export const Login = () => {

    const {formulario,handleChange,enviado, setEnviado, serializarFormulario, setFormulario} =useForm('')
    const { email, name, role, isLoading } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [logged, setlogged] = useState('unLogged')
  

    const handleSubmit=(ev)=>{
      ev.preventDefault()

    const data=serializarFormulario(ev.target)

      if (data.email.length < 10 || data.password.length <= 2) {
        setlogged('invalid')
        return
      }
     

      setFormulario(data)

      setEnviado(true)
     

  }

  console.log(isLoading)
    useEffect(() => {
      
        if (enviado) {
          dispatch(checkLogin(formulario, logged, setlogged))
          setEnviado(false)
        } 
    }, [enviado])

    useEffect(() => {
      dispatch(checkCookie(document.cookie, setlogged))
         
    }, [])

  return (
    <>
    
          <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <div className='formGroup'>
            <input type='text' className='formInput' name='email' placeholder=' ' onChange={handleChange}/>
            <label className='formLabel' for='email'>Email</label>
            <input type='password' className='formInput' name='password' placeholder='Password' onChange={handleChange}/>

            {isLoading ?
             (<div className='loadingImage'>
            <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
            </div> )
            :
            (<input type='submit' className='classicButton' value='entrar'/>)
            }

           {logged == 'invalid' &&
            <div className='errors'>
              Campo usuario o contraseña inválidos.
            </div>}

            {logged == 'failed' &&
            <div className='errors'>
              Usuario o contraseña incorrecta.
            </div>}

            </div>
        </form>
        </div>

                {
                  logged == 'admitted' &&
                  <Navigate to={'/'} />
                }


    </>
  )
}
