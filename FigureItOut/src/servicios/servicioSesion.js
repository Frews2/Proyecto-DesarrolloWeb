const API_SESIONES = "http://localhost:4000/cuentas/"

export async function servicioLogin(datosDeUsuario) {
    return fetch(API_SESIONES+"Login", 
    {
        method: "POST",
        headers: 
        {
            'Content-Type': 'application/json'
        },
            
        body: datosDeUsuario
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}

export async function servicioRegistro(datosDeUsuario) {
    return fetch(API_SESIONES+"Registrar", 
    {
        method: "POST",
        headers: 
        {
            'Content-Type': 'application/json'
        },
            
        body: datosDeUsuario
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}

export async function servicioValidarCorreo(datosDeUsuario)
{
    return fetch(API_SESIONES+"Verificar", 
    {
        method: "POST",
        headers: 
        {
            'Content-Type': 'application/json'
        },
            
        body: datosDeUsuario
    })
    .then(response=> response.json())
    .then(data=>
        {
          return data;  
        })
}

export async function servicioValidarPeriodista() 
{
    return fetch(API_SESIONES+"verificarPeriodista", 
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.exito;
    })    
}

export async function servicioValidarColeccionista() 
{
    return fetch(API_SESIONES+"verificarColeccionista", 
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.exito;
    })    
}