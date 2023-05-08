import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginFailed } from '../slices/users/userSlice'

export const LogOut = () => {

    const dispatch = useDispatch()

    const clearCookie = () => {

      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax' ;

    }

    useEffect(()=>{
      dispatch(loginFailed()) //reseteamos el state de user
      clearCookie() // eliminamos la cookie
    },[])

    
  return (
    <Navigate to={'/'} />
  )
}
