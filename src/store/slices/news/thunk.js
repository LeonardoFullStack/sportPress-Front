import { consulta, uploadCloudinary } from "../../../hooks/useFetch";
import { getLast4News, startLoading, uploadInput } from "../../../slices/news/newSlice";

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
            const resp = await consulta(`/api/news/lastnews/`)
            const petition = await resp.json()
            console.log(petition.data)
            dispatch(getLast4News({data: petition.data})) 
        } catch (error) {
            
        }
    }
}