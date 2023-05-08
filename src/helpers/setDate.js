export const setNewDate = (dateUnSetted) => {
    console.log(dateUnSetted)
    const date = new Date(dateUnSetted)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Sumamos 1 para obtener el mes en base 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
console.log(formattedDate)
 return formattedDate 
}