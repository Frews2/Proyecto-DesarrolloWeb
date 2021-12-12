const API_FIGURAS = "http://localhost:4000/figuras/"

export async function servicioObtenerFiguras() {
    return fetch(API_FIGURAS+"Buscar", 
    {
        method: "GET",
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}

export async function servicioRegistroFiguras(formFigura) {
    return fetch(API_FIGURAS+"Registrar", 
    {
        method: "POST",
        headers: 
        {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body:formFigura,
        
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}