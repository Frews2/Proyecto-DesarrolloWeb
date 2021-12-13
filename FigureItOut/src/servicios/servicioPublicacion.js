const API = "http://localhost:4000/"

export async function servicioComentarPublicacion(formComentario) 
{
    return fetch(API+"comentarios/registrar", 
    {
        method: "POST",
        headers: 
        {
            'Authorization': sessionStorage.getItem('token')
        },
        body:formComentario,
        
    })
    .then(response => response.json())
    .then(data =>
        {
          return data;
        })
}

export async function servicioReportarPublicacion(formReporte) 
{
    return fetch(API+"reportes/registrar", 
    {
        method: "POST",
        headers: 
        {
            'Authorization': sessionStorage.getItem('token')
        },
        body:formReporte,
        
    })
    .then(response => response.json())
    .then(data =>
        {
          return data;
        })
}