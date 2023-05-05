import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { uploadEntry } from '../../store/slices/news/thunk';

export const UploadEntry = () => {

    const {handleChange, serializarFormulario} = useForm('');
    const dispatch = useDispatch();
    const handleSubmit = (ev) => {
        ev.preventDefault()
        const data=serializarFormulario(ev.target)
        dispatch(uploadEntry(data));
    }
  return (
    <>
    <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <div className='formGroup'>
            <input type='text' className='formInput' name='email' placeholder=' ' onChange={handleChange}/>
            <input type='file' className='formInput' name='entryImage'  onChange={handleChange}/>
            <input type='submit' className='classicButton' value='subir'/>
            </div>
            </form>
            </div>
            
            </>
  
  )
}
