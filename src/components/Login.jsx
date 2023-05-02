import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { checkCookie, checkLogin } from '../store/slices/users/thunk'
import { useCookie } from '../hooks/useCookie'
import { Navigate } from 'react-router-dom'

export const Login = () => {

    const {formulario,handleChange,handleSubmit,enviado, setEnviado} =useForm('')
    const { email, name, role, isLoading } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [logged, setlogged] = useState('unLogged')
  console.log(document.cookie)
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
    {
            (logged === 'unLogged' || logged === 'failed') && 
            <form onSubmit={handleSubmit}>
            <input type='text' name='email' onChange={handleChange}/>
            <input type='password' name='password' onChange={handleChange}/>
            <input type='submit' value='entrar'/>
        </form>
        }
    
    {
            logged == 'failed' &&
             <p>Usuario o contraseña incorrecta </p> 
        }

{
                    isLoading ?
                        (<img src="https://i.gifer.com/ZKZg.gif" alt="" />)
                        :
                        (
                            <h1>
                              {role}
                            </h1>
                        )
                }

                {
                  logged == 'admitted' &&
                  <Navigate to={'/'} />
                }
    </>
  )
}
