import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { changePass } from '../store/slices/users/thunk'

export const ChangePass = () => {
    const {handleChange, serializarFormulario} =useForm('')
    const { email } = useSelector((state) => state.users)
    const [validate, setvalidate] = useState('')
    const dispatch = useDispatch()
    const handleSubmit=(ev)=>{
        ev.preventDefault()

      const data=serializarFormulario(ev.target)

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
console.log(validate)
  return (
    <>
   

        <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <div className='formGroup'>
                <p>
                    Contraseña actual
                </p>
            <input type='password' className='formInput' name='password' placeholder=' ' onChange={handleChange}/>
            <p>
                    Contraseña nueva
                </p>
            <input type='password' className='formInput' name='newPassword' placeholder='Password' onChange={handleChange}/>

            <input type='submit' className='classicButton' value='cambiar contraseña'/>
            {validate == 'invalid' &&
            <div className='errors'>
              La contraseña debe tener mínimo 4 caracteres.
            </div>}
            {validate == 'successfull' &&
            <div className='successfull'>
              Contraseña modificada correctamente.
            </div>}
            </div>
        </form>
        </div>
    
   
    
    </>
  )
}
