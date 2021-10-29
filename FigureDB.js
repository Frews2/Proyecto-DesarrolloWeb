var connection = connect("mongodb://figureAdmin:proyectoweb@localhost/admin");
db = connection.getSiblingDB('FigureDB')
db.cuentas.insertMany([
    {
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "Email": "sam@gmail.com",
        "TipoCuenta": "periodista",
        "Password": "$2a$10$P.B.9arPZ1I3Wg3m962TXewwih8mLS.XW4H6enWNpv0LQ6nI2jO.W",
        "Apodo": "SamJuarez",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "Email": "frews@gmail.com",
        "TipoCuenta": "coleccionista",
        "Password": "$2a$10$Y6BUBqzyoZ9lLJYEawIgJu5rXNsOYkX/2chhvXM86osYdqENtnehu",
        "Apodo": "El frews",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Email": "marcos@gmail.com",
        "TipoCuenta": "coleccionista",
        "Password": "$2a$10$09vwxAXe6Z.LbLCoSi72huWEXcLo5/EPe7p5OVGEIJqOh/eHe4Iue",
        "Apodo": "Marco Polo",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "2fda76ac-6382-41d4-8208-2e4324c495fc",
        "Email": "pklove@gmail.com",
        "TipoCuenta": "administrador",
        "Password": "$2a$10$p3587jEEAustpjOtyp6QNusUWtf/4dWzSApNA.vr9wEBqCXcd8DqW",
        "Apodo": "El Admin",
        "Estatus": "Activo"
    }
])

db.administradores.insert([
    {
        "IdCuenta": "2fda76ac-6382-41d4-8208-2e4324c495fc"
    }
])

db.figuras.insert([
    {
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Nombre": "Batman 2021 edicion especial",
        "Altura": "40 cm",
        "Material": "Acero Inoxidable",
        "Marca": "Guason Inc.",
        "Foto": "rutafake"
    }
])

db.colecciones.insert([
    {
        "IdColeccion": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "IdCuenta": "Batman 2021 edicion especial",
        "Figuras": ["b763f4b3-f67a-498e-917d-f74b4affb19e"]
    }
])

db.publicaciones.insertMany([
    {
        "IdPublicacion": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaRegistro": "2021-10-03"
    },
    {
        "IdPublicacion": "5b8e53b1-94e1-4b97-a2fc-7b9078133e76",
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaRegistro": "2021-10-04"
    }
])

db.noticias.insert([
    {
        "IdPublicacion": "a4d3c395-f2e8-41c3-8fc1-9e8362b088d4",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Texto": "Nueva figura de batman plateado",
        "Foto": "rutafake",
        "Etiquetas": ["DC","Batman","Metal"]
    }
])

db.reviews.insert([
    {
        "IdPublicacion": "5b8e53b1-94e1-4b97-a2fc-7b9078133e76",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Texto": "Review sobre el nuevo Batman 2021",
        "Calificacion": " 3.5 de 5 estrellas",
        "Foto":"rutafake",
        "Etiquetas": ["DC","Batman","Metal"],
        "Comentarios": ["296586c3-f036-49f8-b6c0-4f051de6c90a"]
    }
])

db.comentarios.insert([
    {
        "IdComentario": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "Texto": "Buen review",
        "IdPublicacionOriginal":"5b8e53b1-94e1-4b97-a2fc-7b9078133e76"
    }
])

db.reportes.insert([
    {
        "Id": "7e15a339-c2b0-4210-b82c-a79f6db5f7ee",
        "IdPublicacion": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "TipoPublicacion": "Review",
        "IdAcusador": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Razon": "No es un review, es un video de hitler",
        "IdAcusado": "6f2850f9-b82f-451d-baf2-26fd93874418"
    }
])
