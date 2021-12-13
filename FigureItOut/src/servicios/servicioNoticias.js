const API_NOTICIAS = "http://localhost:4000/noticias/"

export async function servicioRegistroNoticias(formNoticia)
{
    return fetch(API_NOTICIAS+"Registrar", 
    {
        method: "POST",
        headers: 
        {
            'Authorization': sessionStorage.getItem('token')
        },
        body:formNoticia,
        
    })
    .then(response => response.json())
    .then(data =>
        {
          return data;  
        })
}