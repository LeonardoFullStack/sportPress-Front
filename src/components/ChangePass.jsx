import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { changePass } from '../store/slices/users/thunk'

export const ChangePass = ({clearPage}) => {
  const { handleChange, serializarFormulario } = useForm('')
  const { email, isLoading } = useSelector((state) => state.users)
  const [validate, setvalidate] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const data = serializarFormulario(ev.target)

    if (data.password.length < 4 || data.newPassword.length < 4) {
      setvalidate('invalid')
      return
    }

    const body = {
      ...data,
      email
    }
    dispatch(changePass(body, setvalidate))
  }

  return (



    <>

      <div className='loginForm changePassDiv displayNone'>



        <form onSubmit={handleSubmit}>
          <span className='xLogin' onClick={clearPage}>
            X
          </span>
          <div className='bigLogo'>
            <img alt='logo completo' src='images/logoyletras.png' />
          </div>


          <div className='inputsLogin'>
            <label for='password'>
              Antigua contraseña
            </label>
            <input type='password' className='formInput' name='password' placeholder='Email' onChange={handleChange} />
            <label for='newPassword'>
              Nueva contraseña
            </label>
            <input type='password' className='formInput' name='newPassword' placeholder='Password' onChange={handleChange} />
            {isLoading ?
              (<div className='loadingImage'>
                <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
              </div>)
              :
              (<input type='submit' className='entryButtonChange' value=''/>)
            }
          </div>
        </form>
        {validate == 'invalid' &&
          <div className='errors'>
            La contraseña debe tener mínimo 4 caracteres.
          </div>}
        {validate == 'successfull' &&
          <div className='successfull'>
            Contraseña modificada correctamente.
          </div>}
      </div>





    </>
  )
}
