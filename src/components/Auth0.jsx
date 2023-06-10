import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth0Login } from '../store/slices/users/thunk';

export const Auth0 = () => {
    const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
    const [validate, setvalidate] = useState('')
    const dispatch = useDispatch();



    useEffect(() => {
      if (user) {

        console.log('paso')
        dispatch(auth0Login(user, setvalidate))
      }
    
      
    }, [user])
    

  return (
    <h1>Auth0</h1>
  )
}
