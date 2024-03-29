import React, { useState } from 'react'
import { setNewDate } from '../helpers/setDate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../store/slices/news/thunk'

export const Comments = ({item}) => {
    const { role } = useSelector((state) => state.users)
    const { requestState, id_new } = useSelector((state) => state.news)
    
    const newDate = setNewDate(item.date)
    const dispatch = useDispatch()

    const handleDelete = (ev) => {
        dispatch(deleteComment(item.id_comment))
    }

  return (

    <>
    <article id='comments'>
    <div className='commentData'>
    <p className='nameComment'>
       {item.name} :
    </p>
    <p className='dateComment'>
        {newDate}
    </p>
    
    <p className='textComment'>
    {item.text}
    </p>
    
    <div className='editButton'>
        {
            role == 'moderator' &&
            <button className='redButton' onClick={handleDelete}>
                eliminar
            </button>
        }
    </div>
    </div>
    
    </article>
    </>
  )
}
