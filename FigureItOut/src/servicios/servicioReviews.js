const API_NOTICIAS = "https://figure-it-out-uv.herokuapp.com/reviews/"

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