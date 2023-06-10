import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/slices/users/thunk';
import { Navigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { useAuth0 } from '@auth0/auth0-react' 

export const CreateUser = () => {
    const {handleChange, enviado, serializarFormulario} = useForm('');
    const {loginWithRedirect} = useAuth0()
    const dispatch = useDispatch();
    const [validate, setvalidate] = useState('')
    const [captchaValidate, setcaptchaValidate] = useState(false)

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const data = serializarFormulario(ev.target)

        if (data.email.length < 10 || data.password.length < 4 || data.name.length < 2) {
            setvalidate('invalid')
            return
          }

          if (captchaValidate) {
            dispatch(registerUser(data, setvalidate))
            setvalidate('submitted')
        } else {
          setcaptchaValidate('unknown')
          }
        
        
    }

    const onChange = () => {
      setcaptchaValidate(true)
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


                <input type='text' className='formInput' name='email' placeholder='E-mail' onChange={handleChange}/>
                
                <input type='text' className='formInput' name='name' placeholder='Nickname' onChange={handleChange}/>
                
                <input type='password' className='formInput' name='password' placeholder='Contraseña' onChange={handleChange}/>

                {validate == 'usedEmail' &&
              <div className='errors'>
                Email actualmente en uso. Prueba otro.
              </div>}

              {validate == 'serverFailed' &&
              <div className='errors'>
                Fallo en el servidor. No sé que ha pasado.
              </div>}

              {validate == 'invalid' &&
              <div className='errors'>
                Rellena bien todos los campos.
              </div>}

              {captchaValidate == 'unknown' &&
              <div className='errors'>
                Debes completar el captcha.
              </div>}

              {
                validate == 'submitted' ?
                (<div className='loadingImage'>
                <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
              </div>)
              :
              <>
              <input type='submit' className='classicButton' value='Registrarme ya'/>
              <button onClick={() => loginWithRedirect()}>
                el googles
              </button>
              </>
              }

                
              {
              validate == 'successfull' &&
                <div className='successfull'>
                  Usuario creado
                </div>
            }
            <ReCAPTCHA
                sitekey="6LfDy-8lAAAAAHg_rPNhVgSJiZlrHnxeCOf2yfDJ"
                onChange={onChange}
            />
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
