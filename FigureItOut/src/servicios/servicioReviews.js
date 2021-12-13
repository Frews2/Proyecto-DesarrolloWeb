const API_NOTICIAS = "http://localhost:4000/reviews/"

export async function servicioRegistroReviews(formReview) {
    return fetch(API_NOTICIAS+"Registrar", 
    {
        method: "POST",
        headers: 
        {
            'Authorization': sessionStorage.getItem('token')
        },
        body:formReview,
        
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}