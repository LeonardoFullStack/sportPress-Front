

const urlMain = 'https://sportpressback.onrender.com'

/**
 * Realiza una consulta al servidor utilizando el método y la URL especificados,
 * y opcionalmente envía un cuerpo de datos en formato JSON.
 * @param {string} url - La URL a la que se enviará la consulta.
 * @param {string} method - El método HTTP a utilizar en la consulta (get, post, put o delete).
 * @param {Object} [body] - El cuerpo de datos a enviar en formato JSON (opcional, solo para post y put).
 * @returns {Promise<Response>} Una promesa que se resuelve en la respuesta del servidor.
 */
export const consulta = async(url,method,body) => {

    let options={}
    if(method=='post' || method=='put'){
        
       const data={...body};
         options={
            method:method,
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        }
    }
    if(method=='delete'){
        const data={...body};
         options={
            method:method,
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        }
    }
    if(method=='get'){
        options={
            method: method,
        }
    }
    
      return await fetch(`${urlMain}${url}`,options);
}


/**
 * Función asíncrona para subir un archivo a Cloudinary
 * @param {File} file - El archivo que se va a subir
 * @returns {string} La URL del archivo subido
 */
export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'ylrjapdu')
    const options = {
      method: 'POST',
      body: formData
    }
  
    try {
      const petition = await fetch('https://api.cloudinary.com/v1_1/dnxliek6h/image/upload', options)
      const json = await petition.json()

      return json.url 
    } catch (error) {
      return 'Error al subir la imagen'
    }
  }

