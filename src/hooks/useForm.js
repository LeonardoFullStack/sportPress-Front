import { useState } from "react"


/**
 * Hook personalizado para manejar formularios
 * @param {Object} estadoInicial - El estado inicial del formulario
 * @returns {Object} Un objeto con el estado actual del formulario, una función para actualizar el estado, una bandera que indica si el formulario ha sido enviado, una función para establecer la bandera de envío, una función para serializar los datos del formulario y una función para establecer el estado del formulario.
 */
export const useForm = (estadoInicial) => {

    const [formulario, setFormulario] = useState(estadoInicial)
    const [enviado, setEnviado] = useState(false)

    /**
     * Función para serializar los datos de un formulario
     * @param {HTMLFormElement} form - El formulario que se va a serializar
     * @returns {Object} Un objeto que contiene los datos serializados del formulario
     */
    const serializarFormulario=(form)=>{

        const formData=new FormData(form)

        const data={}
       
        for(let [key,value] of formData){
            console.log(key,value)
            data[key]=value

        }

        return data

    }

    
    
    /**
     * Función para manejar el evento onChange de un input en el formulario
     * @param {Object} event - El evento que se desencadena cuando se cambia un valor de un input
     */
    const handleChange=({target})=>{
       const{name,value}=target


        if(formulario=='') return

        setFormulario({
            ...formulario,
            [name]:value
        })
    }



  return {
    formulario,
    handleChange,
    enviado,
    setEnviado,
    serializarFormulario,
    setFormulario
  }
}
