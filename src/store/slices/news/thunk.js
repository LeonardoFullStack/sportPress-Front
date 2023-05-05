import { uploadCloudinary } from "../../../hooks/useFetch";

export const uploadEntry = (data) => {
    console.log(data)
    console.log('llego')
    return async (dispatch, getState) => {
        console.log('llego')
        const imageOnCloud = await uploadCloudinary(data.entryImage)
    }
}