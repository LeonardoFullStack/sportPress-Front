import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getNewByIdAndComments, uploadComment } from '../store/slices/news/thunk';
import { Comments } from './Comments';
import { useForm } from '../hooks/useForm';

export const ViewOne = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { handleChange, serializarFormulario } = useForm('')
  const { requestState, newTitle, newImage, newDate, newText, comments, id_new } = useSelector((state) => state.news)
  const { name, id_user } = useSelector((state) => state.users)
  console.log(name)
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const data = serializarFormulario(ev.target)
    dispatch(uploadComment(data.text, name, id_user, id_new))
  }

  useEffect(() => {
    if (id) {
      dispatch(getNewByIdAndComments(id))
    }
  }, [])
  return (
    <>
      <section id='singleNew' style={{ display: 'grid', gridTemplateColumns: '1fr', margin: '15px auto', width: '80%', justifyContent: 'center', border: '1px solid black', borderRadius: '3px' }}>
        <div className='title-date-container'>
          <h1 className='title'>{newTitle}</h1>
          <div className='date'>{newDate}</div>
        </div>
        <div className='singleImage'>
          <img src={newImage} />
        </div>
        <div className='newText'>
          {newText}
        </div>
      </section>

      <section>
        Comentarios ({comments.length})
        {
          comments.map((item) => (
            <Comments item={item} key={item.id_comment} />
          ))
        }
      </section>
      {
        name == null ?
          <section id='unLoggedComments'>
            <p>
              Regístrate o haz login para poder comentar!
            </p>
          </section>
          :

          <div className='commentForm'>
            <form onSubmit={handleSubmit}>
              <div className='formGroup'>
                <input type='text' className='formInput' name='text' placeholder='Escribe aquí tu comentario' onChange={handleChange} />
                  
                <input type='submit' className='classicButton' value='Publicar' />
              </div>
            </form>
          </div>
      }

    </>
  )
}
