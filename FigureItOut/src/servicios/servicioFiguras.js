const API_FIGURAS = "https://figure-it-out-uv.herokuapp.com/figuras/"

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

export async function servicioRegistroFiguras(formFigura)
{
    return fetch(API_FIGURAS+"Registrar", 
    {
        method: "POST",
        headers: 
        {
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