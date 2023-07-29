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
  const { requestState, newState, newTitle, newImage, newDate, newText, comments, id_new } = useSelector((state) => state.news)
  const { name, id_user } = useSelector((state) => state.users)

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
      <section id='singleNew'>
        <div className='title-date-container'>
          <h1 className='title'>{newTitle}</h1>
          <div className='date'>{newDate}</div>
        </div>
        <div className='singleImage'>
          <img src={newImage} />
        </div>
        <div className='newText'>
          <p>{newText}</p>
        </div>
      </section>

      <section id='allComments'>
       <h2> Comentarios ({comments.length}) </h2>
        {
          comments.map((item) => (
            <Comments item={item} key={item.id_comment} />
          ))
        }
      </section>
      {newState === 'aproved' &&
    <>
        {name == null ?
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
}


    </>
  )
}
