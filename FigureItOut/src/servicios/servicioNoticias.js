const API_NOTICIAS = "https://figure-it-out-uv.herokuapp.com/noticias/"

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