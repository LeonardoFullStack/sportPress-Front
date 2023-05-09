

/**
 * Función para formatear una fecha en un formato mas cómodo
 * @param {string} dateUnSetted - La fecha que se va a formatear
 * @returns {string} La fecha formateada en el formato "dd/mm/yyyy hh:mm"
 */
export const setNewDate = (dateUnSetted) => {
    
    const date = new Date(dateUnSetted)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Sumamos 1 para obtener el mes en base 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

 return formattedDate 
}