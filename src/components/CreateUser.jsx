import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/slices/users/thunk';
import { Navigate } from 'react-router-dom'

export const CreateUser = () => {
    const {handleChange, enviado, serializarFormulario} = useForm('');
    const dispatch = useDispatch();
    const [validate, setvalidate] = useState('')
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const data = serializarFormulario(ev.target)

        if (data.email.length < 10 || data.password.length < 4 || data.name.length < 2) {
            setvalidate('invalid')
            return
          }
        dispatch(registerUser(data, setvalidate))
        setvalidate('submitted')
        
    }
  return (
    <>
    <div className='loginForm'>
    
        <form onSubmit={handleSubmit}>
            <div className='formGroup'>
            <h1>
            Registrarse 
            
            como
             usuario
             
           </h1>
           <span class="material-symbols-outlined">
            sports_soccer
            </span>
                <input type='text' className='formInput' name='email' placeholder='E-mail' onChange={handleChange}/>
                
                <input type='text' className='formInput' name='name' placeholder='Nickname' onChange={handleChange}/>
                
                <input type='password' className='formInput' name='password' placeholder='Contraseña' onChange={handleChange}/>

                {validate == 'usedEmail' &&
              <div className='errors'>
                Email actualmente en uso. Prueba otro.
              </div>}
              {validate == 'usedEmail' &&
              <div className='serverFailed'>
                Fallo en el servidor. No sé que ha pasado.
              </div>}
              {
                validate == 'submitted' ?
                (<div className='loadingImage'>
                <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
              </div>)
              :
              <input type='submit' className='classicButton' value='Registrarme ya'/>
              }

                
                {validate == 'successfull' &&
            <div className='successfull'>
              Usuario creado
            </div>}
            </div>
        </form>
    </div>
    {
        validate == 'successfull' &&
        <Navigate to={'/'} />
      }
    </>
  )
}
