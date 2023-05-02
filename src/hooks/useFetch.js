

const urlMain = 'http://localhost:3000'
export const consulta = async(url,method,body) => {
console.log(url,method,body)
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

