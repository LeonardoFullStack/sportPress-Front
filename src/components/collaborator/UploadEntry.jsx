import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { uploadEntry } from '../../store/slices/news/thunk';

export const UploadEntry = () => {

    const {handleChange, serializarFormulario} = useForm('');
    const { id_user } = useSelector((state) => state.users);
    const { requestState } = useSelector((state) => state.news);
    const [validate, setvalidate] = useState('')
    const dispatch = useDispatch();
 
    const handleSubmit = (ev) => {
        ev.preventDefault()
        const data=serializarFormulario(ev.target);
        console.log(data)
        if (
          data.title.length <= 2 || data.extract.length <= 2 || data.title.text <= 30 || data.entryImage.name.length == 0
        ) {
          setvalidate('invalid')
          return
        }

        dispatch(uploadEntry(data, id_user));
    }
  return (
    <>
    <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <div className='formGroup'>
                <h1 className='firtsHeader'>
                  Título
                </h1>
            <input type='text' className='formInput' name='title' placeholder='Título' onChange={handleChange}/>
            <h1 className='firtsHeader'>
                  Extracto
                </h1>
            <input type='text' className='formInput' name='extract' placeholder='extracto' onChange={handleChange}/>
            <h1 className='firtsHeader'>
                  Tags
                </h1>
            <input type='text' className='formInput' name='tags' placeholder='tags' onChange={handleChange}/>
            <h1 className='firtsHeader'>
                  Texto
                </h1>
            <textarea type='text' className='formInput textarea' name='text' placeholder='Cuerpo' onChange={handleChange}></textarea>
            <h1 className='firtsHeader'>
                  Imagen
                </h1>
            <input type='file' className='formInput fileInput' name='entryImage'  onChange={handleChange}/>
            {requestState == 'loading' ?
            (<div className='loadingImage'>
            <img src="https://i.gifer.com/ZKZg.gif" alt="imagen cargando" />
          </div>)
          :
          <input type='submit' className='classicButton' value='subir'/>
          }
            
            { validate == 'invalid' && 
            <div className='errors'>
            Rellena todos los campos para continuar.
          </div>
            }
            {requestState == 'successfull' && 
            <div className='successfull'>
            Noticia creada. A la espera de la aprovación del editor.
          </div>}
            </div>
            </form>
            </div>
            
            </>
  
  )
}
