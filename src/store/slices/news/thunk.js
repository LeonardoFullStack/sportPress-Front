import { setNewDate } from "../../../helpers/setDate";
import { consulta, uploadCloudinary } from "../../../hooks/useFetch";
import { createaComment, deleteAComment, getSingleNew, getTheNews,  startLoading, uploadInput } from "../../../slices/news/newSlice";
import { requestFailed } from "../../../slices/users/userSlice";

export const uploadEntry = (data, id_user) => {
    

    return async (dispatch, getState) => {
        dispatch(startLoading())


        

        const imageOnCloud = await uploadCloudinary(data.entryImage)
        const body = {
            ...data,
            image:imageOnCloud,
            id_user
        }
        const resp = await consulta(`/api/news/createnew/`, 'post', body)
        const petition = await resp.json()
        console.log(petition, imageOnCloud)
        dispatch(uploadInput({image: imageOnCloud, id_user:id_user, title:data.title, extract:data.extract, tags:data.tags, text:data.text }))

    }
}

export const getLastNews = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())

        try {
            const resp = await consulta(`/api/news/lastnews/`) //noticias del carrusel
            const petition = await resp.json()
            console.log(petition)
            const resp2 = await consulta(`/api/news/restnews/`) //noticias del carrusel
            const petition2 = await resp2.json()
            console.log(petition2.data)
            dispatch(getTheNews({data1: petition.data, data2: petition2.data})) 

        } catch (error) {
            
        }
    }
}

export const getNewByIdAndComments = (id) => {

    return async (dispatch, getState) => {
        dispatch(startLoading())
        try {
            const resp = await consulta(`/api/news/viewone/${id}`) //noticias del carrusel
            const petition = await resp.json()
            console.log(petition)
            const dateSetted = setNewDate(petition.data.newsLetter[0].date)
            console.log(dateSetted)
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
                comments: petition.data.comments
                }))
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

export const deleteComment = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        try {
            const resp = await consulta(`/api/comments/deletecomment/${id}`, 'delete') //noticias del carrusel
            const petition = await resp.json()
            console.log(petition)
            if (petition.ok) {
                dispatch(deleteAComment({id: id}))
            }
        } catch (error) {
            dispatch(requestFailed())
        }
    }
}

export const uploadComment = (text, name, id_user, id_new) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const body = {
            id_user,
            text,
            id_new,
            name
        }

        console.log(body)
        try {

            const resp = await consulta(`/api/comments/createcomment`, 'post', body) 
            const petition = await resp.json()
            console.log('llego')
            const resp2 = await consulta(`/api/news/viewone/${id_new}`) //volvemos a coger los comentarios
            const petition2 = await resp2.json()
            console.log(petition2)

            if (petition.ok) {
                dispatch(createaComment({data: petition2.data.comments}))
            }
        } catch (error) {
            
        }
    }
}