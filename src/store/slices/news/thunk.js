import { setNewDate } from "../../../helpers/setDate";
import { consulta, uploadCloudinary } from "../../../hooks/useFetch";
import { createaComment, deleteAComment, getPendingNewsReducer, getSingleNew,  getStateNewsAproved, getStateNewsPending, getStateNewsRejected, getTheNews,  startLoading, updateStateNew, uploadInput } from "../../../slices/news/newSlice";
import { requestFailed } from "../../../slices/users/userSlice";


/**
 * Carga la entrada (noticia) subida por el usuario a la base de datos del servidor
 *
 * @param {Object} data - La información de la entrada (noticia) a cargar
 * @param {string} data.title - El título de la entrada
 * @param {string} data.extract - El extracto de la entrada
 * @param {string} data.text - El contenido de la entrada
 * @param {string} data.tags - Las etiquetas de la entrada
 * @param {Object} data.entryImage - La imagen de la entrada a cargar
 * @param {string} id_user - El id del usuario que sube la entrada
 * @returns {function} - Una función async que carga la entrada en la base de datos del servidor y dispatchea la acción correspondiente en la store
 */
export const uploadEntry = (data, id_user) => {
    
    console.log(data.entryImage)
    return async (dispatch, getState) => {
        dispatch(startLoading())


        try {
            
            const imageOnCloud = await uploadCloudinary(data.entryImage)
        const body = {
            ...data,
            image:imageOnCloud,
            id_user
        }
        const resp = await consulta(`/api/news/createnew/`, 'post', body)
        const petition = await resp.json()

        dispatch(uploadInput({image: imageOnCloud, id_user:id_user, title:data.title, extract:data.extract, tags:data.tags, text:data.text }))
        } catch (error) {
            dispatch(requestFailed())
        }

        

    }
}


/**
 * Obtiene las últimas noticias y el resto de las noticias.
 *
 * @async
 * @function getLastNews
 * @returns {Promise<void>} Promesa que no devuelve ningún valor explícito.
 * @throws {Error} Si hay un error al hacer la petición al servidor.
 */
export const getLastNews = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())

        try {
            const resp = await consulta(`/api/news/lastnews/`) //noticias del carrusel
            const petition = await resp.json()
            
            const resp2 = await consulta(`/api/news/restnews/`) //resto de noticias
            const petition2 = await resp2.json()
            console.log(petition2)
            
            dispatch(getTheNews({data1: petition.data, data2: petition2.data})) 

        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Obtiene una noticia por su ID junto con sus comentarios
 * @param {number} id - ID de la noticia a obtener
 * @returns {Function} Función async que dispara acciones Redux según el resultado de la petición
 */
export const getNewByIdAndComments = (id) => {

    return async (dispatch, getState) => {
        dispatch(startLoading())
        try {
            const resp = await consulta(`/api/news/viewone/${id}`) //noticias del carrusel
            const petition = await resp.json()

            const dateSetted = setNewDate(petition.data.newsLetter[0].date)
            
            dispatch(getSingleNew({
                id_new: petition.data.newsLetter[0].id_new,
                title: petition.data.newsLetter[0].title,
                text: petition.data.newsLetter[0].text,
                extract: petition.data.newsLetter[0].extract,
                image: petition.data.newsLetter[0].image,
                tags: petition.data.newsLetter[0].tags,
                date: dateSetted,
                id_user: petition.data.newsLetter[0].id_user,
                altImage: petition.data.newsLetter[0].altimage,
                comments: petition.data.comments,
                state: petition.data.newsLetter[0].state
                }))
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Borra un comentario de la base de datos.
 *
 * @param {number} id - El id del comentario a borrar.
 * @returns {Function} Una función asíncrona que despacha una acción para actualizar el estado de la aplicación.
 * @throws {Error} Si ocurre un error al hacer la petición al servidor.
 */
export const deleteComment = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        try {
            const resp = await consulta(`/api/comments/deletecomment/${id}`, 'delete') //noticias del carrusel
            const petition = await resp.json()
            
            if (petition.ok) {
                dispatch(deleteAComment({id: id}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Sube un comentario a la base de datos y actualiza los comentarios de la noticia correspondiente
 * @param {string} text - El contenido del comentario
 * @param {string} name - El nombre del usuario que hizo el comentario
 * @param {string} id_user - El id del usuario que hizo el comentario
 * @param {string} id_new - El id de la noticia en la que se hizo el comentario
 * @return {function} - Función asincrónica que actualiza los comentarios en el estado de la aplicación
 */
export const uploadComment = (text, name, id_user, id_new) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const body = {
            id_user,
            text,
            id_new,
            name
        }

        
        try {

            const resp = await consulta(`/api/comments/createcomment`, 'post', body) 
            const petition = await resp.json()
            
            const resp2 = await consulta(`/api/news/viewone/${id_new}`) //volvemos a coger los comentarios
            const petition2 = await resp2.json()
            

            if (petition.ok) {
                dispatch(createaComment({data: petition2.data.comments}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Obtiene todas las noticias pendientes de aprobación.
 * 
 * @returns {function} Función que realiza la petición HTTP y dispara acciones.
 */
export const getPendingNews = () => {
    
    return async (dispatch, getState) => {
        dispatch(startLoading())


        try {
            const resp = await consulta(`/api/news/newsbystate/pending`) 
            const petition = await resp.json() 
            
            if (petition.ok) {
                dispatch(getPendingNewsReducer({data: petition.data}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}


/**
 * Actualiza el estado de una noticia en la base de datos y en la store
 *
 * @param {string} newState - El nuevo estado de la noticia
 * @param {number} idNew - El id de la noticia a actualizar
 * @returns {function} - Función asincrónica que recibe dispatch y getState como argumentos y devuelve un dispatch para actualizar la store
 */
export const updateNewState = (newState, idNew) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())

        const body = {
            state: newState,
            id_new: idNew
        }
        try {
            const resp = await consulta('/api/news/updatenewstate', 'put', body)
            const petition = await resp.json()
            
            if (petition.ok) {
                dispatch(updateStateNew({id_new: idNew}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

export const getNewsByStates = (id_user) => {
    return async (dispatch, getState) => {
        const body1 = {
            state:'pending',
            id_user
        }

        const body2 = {
            state:'aproved',
            id_user
        }

        const body3 = {
            state:'rejected',
            id_user
        }

        try {
            const resp1 = await consulta(`/api/news/newsstateuser/`, 'post', body1) 
            const resp2 = await consulta(`/api/news/newsstateuser/`, 'post', body2)
            const resp3 = await consulta(`/api/news/newsstateuser/`, 'post', body3)

            const pending = await resp1.json() 
            const aproved = await resp2.json()
            const rejected = await resp3.json()

            

            if (pending.ok) {
                dispatch(getStateNewsPending({pending: pending.data}))
            } else {
                dispatch(getStateNewsPending({pending: []}))
            }

            if (aproved.ok) {
                dispatch(getStateNewsAproved({aproved: aproved.data}))
            } else {
                dispatch(getStateNewsAproved({aproved: []}))
            }

            if (rejected.ok) {
                dispatch(getStateNewsRejected({rejected: rejected.data}))
            } else {
                dispatch(getStateNewsRejected({rejected: []}))
            }
            
                
            
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}