import { useState } from "react"

export const useForm = (estadoInicial) => {

    const [formulario, setFormulario] = useState(estadoInicial)
    const [enviado, setEnviado] = useState(false)


    const serializarFormulario=(form)=>{

        const formData=new FormData(form)

        const data={}
       
        for(let [key,value] of formData){
            console.log(key,value)
            data[key]=value

        }

        return data

    }

    
    

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
