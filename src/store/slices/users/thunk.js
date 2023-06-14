import { newAuth0User } from "../../../helpers/setAuth0User";
import { auth0Consulta, consulta } from "../../../hooks/useFetch";
import { getTheUsers, loginFailed, requestFailed, roleModified, setTeam, setUsers, startLoadingUsers } from "../../../slices/users/userSlice"
import bcrypt from 'bcryptjs';


/**
 * Verifica las credenciales de inicio de sesión proporcionadas por el usuario y establece una cookie de sesión en caso de éxito.
 * 
 * @param {Object} credentials - Objeto que contiene las credenciales de inicio de sesión: email y password.
 * @param {string} logged - Cadena de texto que indica el estado actual de inicio de sesión del usuario.
 * @param {function} setlogged - Función que establece el estado de inicio de sesión del usuario.
 * @returns {function} - Función asincrónica que realiza la verificación de credenciales y establece la cookie de sesión.
 */
export const checkLogin = ({ email, password }, logged, setlogged) => {

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

                dispatch(setUsers({ id_user: petition.data[0].id_user, email: petition.data[0].email, role: petition.data[0].role, name: petition.data[0].name, team: petition.data[0].team }))
                setlogged('admitted')
                document.cookie = `token=${petition.token}; max-age=3600; Secure; SameSite=Strict;`

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

export const auth0Login = (user, setvalidate) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        console.log(user)
        const newUser = newAuth0User(user)


        try {
            const resp = await consulta(`/api/users`, 'post', user)
            const petition = await resp.json()


            if (petition.ok) {
                const userForSlice = {
                    email: petition.data[0].email,
                    role: petition.data[0].role,
                    name: petition.data[0].name,
                    id_user: petition.data[0].id_user,
                    team: petition.data[0].team
                }
                dispatch(setUsers({ ...userForSlice }));
                document.cookie = `token=${petition.token}; max-age=3600; Secure; SameSite=Strict;`
                setvalidate('successfull')
            } else {
                console.log(newUser, 'pasipasi')
                const resp2 = await consulta(`/api/users/signup`, 'post', newUser)

                const petition2 = await resp2.json()
                console.log(petition2, newUser, 'createuser')

                if (petition2.ok) {
                    const reduxUser = {
                        email: petition2.data[0].email,
                        role: petition2.data[0].role,
                        name: petition2.data[0].name,
                        id_user: petition2.data[0].id_user,
                        team: petition2.data[0].team
                    }
                    dispatch(setUsers({ ...reduxUser }));
                    document.cookie = `token=${petition2.token}; max-age=3600; Secure; SameSite=Strict;`
                    setvalidate('successfull')
                }
            }
        } catch (error) {
            dispatch(loginFailed())
            setvalidate('serverFailed')
        }
    }
}


/**
 * Verifica la validez de la cookie y obtiene los datos del usuario asociado al token.
 *
 * @param {string} cookie - El valor de la cookie de autenticación.
 * @param {function} setlogged - Función que establece el estado de la sesión del usuario.
 * @return {Promise<void>} - Promesa que no devuelve ningún valor.
 * @throws {Error} - Error lanzado cuando la petición no se completa correctamente.
 *
 * @example
 *
 * checkCookie('token=123456789', setlogged);
 */
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
                dispatch(setUsers({ id_user: petition.user.id_user, email: petition.user.email, role: petition.user.role, name: petition.user.name }))
                setlogged('admitted')

            } else {
                dispatch(loginFailed())
                setlogged('unLogged')
            }
        }
    }
}


/**
 * Actualiza la contraseña del usuario en el servidor.
 * 
 * @async
 * @param {object} body - Objeto con los datos de la contraseña antigua y la nueva.
 * @param {string} body.password - Contraseña antigua.
 * @param {string} body.newPassword - Contraseña nueva.
 * @param {string} body.email - Email del usuario a cambiar.
 * @param {function} setvalidate - Función para establecer el estado de validación del formulario.
 * @returns {Promise<void>} - Una promesa que resuelve cuando la contraseña se actualiza correctamente.
 */
export const changePass = async (body, setvalidate) => {

    const resp = await consulta('/api/users/updatepass', 'put', body)
    const petition = await resp.json()

    setvalidate('successfull')


}


/**
 * Selecciona un equipo para un usuario.
 *
 * @param {string} team - El nombre del equipo a seleccionar.
 * @param {string} email - El correo electrónico del usuario al que se le seleccionará el equipo.
 * @returns {Promise<void>} - Una promesa que no devuelve nada una vez que se ha seleccionado el equipo correctamente o se ha producido un error.
 * @throws {Error} - Si se produce un error al llamar a la API o si la respuesta de la API no es válida.
 */
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

            if (petition.ok) {

                dispatch(setTeam({ team: team }))

            } else {
                dispatch(requestFailed())
            }
        } catch (error) {

            dispatch(requestFailed())
        }


    }
}


/**
 * Registra a un usuario en el sistema.
 * @param {object} data - Objeto con los datos del usuario a registrar (email, contraseña, nombre, etc.).
 * @param {function} setvalidate - Función para establecer el estado de validación del registro.
 * @returns {function} - Función async que hace la petición al servidor y maneja la respuesta.
 */
export const registerUser = (data, setvalidate) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const body = {
            ...data
        }

        try {
            const resp = await consulta(`/api/users/signup`, 'post', body)
            const auth0Req = await auth0Consulta(body)
            const meh = await auth0Req.json()
            console.log(meh, 'meh')

            const petition = await resp.json()
            console.log(petition, 'createuser')

            if (petition.ok) {
                const newUser = {
                    email: petition.data[0].email,
                    role: petition.data[0].role,
                    name: petition.data[0].name,
                    id_user: petition.data[0].id_user,
                    team: petition.data[0].team
                }
                dispatch(setUsers({ ...newUser }));
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
        catch (error) {

        }


    }
}


/**
 * Obtiene todos los usuarios de la aplicación.
 *
 * @returns {Function} Función asincrónica que obtiene todos los usuarios y los guarda en el estado global de Redux.
 */
export const getAllUsers = () => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        try {
            const resp = await consulta('/api/users')
            const petition = await resp.json()

            if (petition.ok) {
                dispatch(getTheUsers({ users: petition.petition }))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Actualiza el rol de un usuario en la base de datos mediante una petición PUT a la API /api/users/updaterole.
 * @param {string} email - El correo electrónico del usuario cuyo rol se desea actualizar.
 * @param {string} role - El nuevo rol que se desea asignar al usuario.
 * @returns {Function} - Una función asíncrona que dispara acciones de Redux según el resultado de la petición a la API.
 * @throws {Error} - Si la petición a la API falla.
 */
export const updateRoleUser = (email, role) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingUsers())
        const body = {
            role,
            email
        }
        try {
            const resp = await consulta('/api/users/updaterole', 'put', body)
            const petition = await resp.json()

            if (petition.ok) {
                dispatch(roleModified({ email: email, role: role }))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

