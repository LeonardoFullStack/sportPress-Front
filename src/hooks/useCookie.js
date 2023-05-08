import { consulta } from "./useFetch"




/**
 * Función que utiliza un token de cookie para verificar la sesión de un usuario.
 * 
 * @async
 * @param {string} cookie - La cookie del usuario a verificar.
 */
export const useCookie = async (cookie) => {
    const splittedCookie = cookie.split('=')
    const token = splittedCookie[1]
    console.log(token)
    const body = {
        token
    }
    const user = await consulta('/api/users/verifytoken', 'post', body)
    console.log(user)
    
}