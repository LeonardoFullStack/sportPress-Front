import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/users/thunk';
import { Navigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { useAuth0 } from '@auth0/auth0-react' 

export const CreateUser2 = ({clearPage}) => {
    const {handleChange, enviado, serializarFormulario} = useForm('');
    const { isLoading } = useSelector((state) => state.users)
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
  
      <div className='loginForm register displayNone'>

        
        
        <form onSubmit={handleSubmit}>
        <span className='xLogin' onClick={clearPage}>
          X
        </span>
        <div className='bigLogo'>
            <img alt='logo completo' src='images/sportpressregister.png'/>
          </div>
          

          <div className='inputsLogin'>
            <input type='text' className='formInput' name='email' placeholder='Email' onChange={handleChange} />

            <input type='text' className='formInput' name='name' placeholder='Nickname' onChange={handleChange}/>
            
            <input type='password' className='formInput' name='password' placeholder='Password' onChange={handleChange} />

          </div>
            {isLoading ?
              (<div className='loadingImage'>
                <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
              </div>)
              :
              (<button type='submit' className='entryButton'>
                <img src="images/entrar.png"/>
              </button>)
            }
          <a className='pointer' onClick={() => loginWithRedirect()}>
            <div className='googleLink'>
              <p>
                Entrar con la cuenta de Google
              </p>
            </div>
          </a>

            

          
        </form>
      </div>



    </>
  )
}
