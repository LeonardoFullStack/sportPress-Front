import { consulta } from "../../../hooks/useFetch";
import { loginFailed, setUsers, startLoadingUsers } from "../../../slices/users/userSlice"
import bcrypt from 'bcryptjs';


export const checkLogin = ({email, password}, logged, setlogged) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())

        const body = {
            email
        }

        const resp = await consulta(`/api/users`, 'post', body)// cogemos el usuario
        const petition = await resp.json()

        if (petition.ok) {

            let passwordOk = bcrypt.compareSync(password, petition.data[0].password)//verificamos su password

            if (passwordOk) {
                console.log(passwordOk)
                dispatch(setUsers({ email: petition.data[0].email, role: petition.data[0].role, name: petition.data[0].name  }))
                setlogged('admitted')
                document.cookie = `token=${petition.token}; max-age=3600; Secure; SameSite=Strict;`
                console.log(document.cookie)
            } else {
                dispatch(loginFailed())
                setlogged('failed')// esto se puede hacer en elñ dispatch
                return
            }

        } else {
            dispatch(loginFailed())
            setlogged('failed')
        }
       


        

        
    }

}

export const checkCookie = (cookie, setlogged) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const splittedCookie = cookie.split('=')
        const token = splittedCookie[1]
        console.log(token)
        const body = {
            token
        }

        const resp = await consulta(`/api/users/verifytoken`, 'post', body)// cogemos el usuario
        const petition = await resp.json()

        if (petition.ok) {
            dispatch(setUsers({ email: petition.user.email, role: petition.user.role, name: petition.user.name  }))
            setlogged('admitted')
           
        } else {
            dispatch(loginFailed())
            setlogged('failed')
        }
       


        

        
    }

}