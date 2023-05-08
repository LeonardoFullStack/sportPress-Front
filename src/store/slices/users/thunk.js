import { consulta } from "../../../hooks/useFetch";
import { getTheUsers, loginFailed, requestFailed, roleModified, setTeam, setUsers, startLoadingUsers } from "../../../slices/users/userSlice"
import bcrypt from 'bcryptjs';



export const checkLogin = ({ email, password }, logged, setlogged) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())

        const body = {
            email
        }

        const resp = await consulta(`/api/users`, 'post', body)// cogemos el usuario
        const petition = await resp.json()
        console.log(petition)
        if (petition.ok) {

            let passwordOk = bcrypt.compareSync(password, petition.data[0].password)//verificamos su password
            console.log(petition.data[0].id_user)
            if (passwordOk) {
                console.log(passwordOk)
                dispatch(setUsers({ id_user: petition.data[0].id_user, email: petition.data[0].email, role: petition.data[0].role, name: petition.data[0].name, team: petition.data[0].team }))
                setlogged('admitted')
                document.cookie = `token=${petition.token}; max-age=3600; Secure; SameSite=Strict;`
                console.log(document.cookie)
            } else {
                dispatch(loginFailed())
                setlogged('failed')
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
        if (!token) {
            dispatch(loginFailed())
            setlogged('unLogged')
        } else {


            const body = {
                token
            }

            const resp = await consulta(`/api/users/verifytoken`, 'post', body)// cogemos el usuario
            const petition = await resp.json()

            if (petition.ok) {
                dispatch(setUsers({id_user:petition.user.id_user, email: petition.user.email, role: petition.user.role, name: petition.user.name }))
                setlogged('admitted')

            } else {
                dispatch(loginFailed())
                setlogged('unLogged')
            }






        }
    }
}

export const changePass = async (body, setvalidate) => {
    
    const resp = await consulta('/api/users/updatepass', 'put', body)
    const petition = await resp.json()
    console.log(petition)
    setvalidate('successfull')
    console.log('paso')

}

export const selectTeam = (team, email) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())

        const body = {
            team,
            email
        }

        try {
            const resp = await consulta('/api/users/selectteam', 'put', body)
            const petition = await resp.json()
            console.log(petition)
            if (petition.ok) {

                dispatch(setTeam({team: team}))

            } else {
                dispatch(requestFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(requestFailed())
        }
        

    }
}

export const registerUser = (data, setvalidate) => {

    return async (dispatch, getState) => {
        /* dispatch(startLoadingUsers()) */
        const body = {
            ...data
        }
        console.log('llego')
        const resp = await consulta(`/api/users/signup`, 'post', body)
        console.log(resp)
        const petition = await resp.json()
        console.log(petition.msg)
        
        if (petition.ok) {
            const newUser = {
                email: petition.data[0].email,
                 role: petition.data[0].role,
                  name: petition.data[0].name
            }
            dispatch(setUsers({...newUser}));
            document.cookie = `token=${petition.token}; max-age=3600; Secure; SameSite=Strict;`
            setvalidate('successfull')
        } else if (petition.msg === "Email ya en uso") {
            dispatch(loginFailed())
            setvalidate('usedEmail')

        }
        else {
            dispatch(loginFailed())
            setvalidate('serverFailed')
        }
    }
}

export const getAllUsers = () => {
    return async (dispatch,getState) => {

        try {
            const resp = await consulta('/api/users')
            const petition = await resp.json()
            
            if (petition.ok) {
                dispatch(getTheUsers({users: petition.petition}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

export const updateRoleUser = (email, role) => {
    return async (dispatch, getState) => {
        const body = {
            role,
            email
        }
        try {
            const resp = await consulta('/api/users/updaterole', 'put', body)
            const petition = await resp.json()
            
            if (petition.ok) {
                dispatch(roleModified({email: email}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}