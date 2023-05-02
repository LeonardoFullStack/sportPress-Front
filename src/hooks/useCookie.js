import { consulta } from "./useFetch"



const key = 'Porqueelcoyotecomprabadinamitapudiendocomprarcomida92736mibiciesverde'

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