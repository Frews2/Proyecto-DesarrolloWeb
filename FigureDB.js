var connection = connect("mongodb://figureAdmin:proyectoweb@localhost/admin");
db = connection.getSiblingDB('FigureDB')
db.cuentas.insertMany([
    {
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "Email": "sam@gmail.com",
        "TipoCuenta": "Periodista",
        "Password": "$2a$10$P.B.9arPZ1I3Wg3m962TXewwih8mLS.XW4H6enWNpv0LQ6nI2jO.W",
        "Apodo": "SamJuarez",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "Email": "frews@gmail.com",
        "TipoCuenta": "Coleccionista",
        "Password": "$2a$10$Y6BUBqzyoZ9lLJYEawIgJu5rXNsOYkX/2chhvXM86osYdqENtnehu",
        "Apodo": "El frews",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Email": "marcos@gmail.com",
        "TipoCuenta": "Coleccionista",
        "Password": "$2a$10$09vwxAXe6Z.LbLCoSi72huWEXcLo5/EPe7p5OVGEIJqOh/eHe4Iue",
        "Apodo": "Marco Polo",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "2fda76ac-6382-41d4-8208-2e4324c495fc",
        "Email": "pklove@gmail.com",
        "TipoCuenta": "Administrador",
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
        "Foto": "rutaPlaceholder",
        "NombreFoto": "batman_2021_Guason",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de un hombre alto con una capa y mascara vestido de negro."
    },
    {
        "IdFigura": "7c488d35-67a6-44c9-9173-db880d29c9d6",
        "Nombre": "Superman 1987",
        "Altura": "20 cm",
        "Material": "Plastico",
        "Marca": "Ikea",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "superman-1987-imagen",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de un hombre alto con una capa vestido de colores claros."
    },
    {
        "IdFigura": "034a5fcb-4c35-4c57-91a4-ae8fd54cae94",
        "Nombre": "Superman sol rojo edicion Comunista",
        "Altura": "30 cm",
        "Material": "Acero Inoxidable",
        "Marca": "Guason Inc.",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "supermanSolRojo",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de un hombre alto con una capa y mascara vestido de colores oscuros."
    }
])

db.colecciones.insert([
    {
        "IdColeccion": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "IdCuenta": "Batman 2021 edicion especial",
        "Figuras": ["b763f4b3-f67a-498e-917d-f74b4affb19e"]
    }
])

db.noticias.insert([
    {
        "IdPublicacion": "a4d3c395-f2e8-41c3-8fc1-9e8362b088d4",
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "FechaRegistro": "1529644667834",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Titulo": "BATMAN PLATEADO",
        "Texto": "Nueva figura de batman plateado",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "batman2021plateado",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de un hombre alto con una capa y mascara.",
        "Etiquetas": ["DC","Batman","Metal"],
        "Comentarios": ["296586c3-f036-49f8-b6c0-4f051de6c10a"]
    },
    {
        "IdPublicacion": "8b840e73-7dae-4650-b0c9-6c2609c734e2",
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "FechaRegistro": "1529644607834",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Titulo": "BATMAN Edicion Super chida",
        "Texto": "Nueva figura de batman de diamante",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "batman2021diamante",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de un hombre alto con una capa y mascara vestido de colores claros.",
        "Etiquetas": ["Ikea","Batman","Diamante"]
    },
    {
        "IdPublicacion": "3a6a452d-1d67-45b8-8955-a32c015228bf",
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "FechaRegistro": "1529634667834",
        "IdFigura": "034a5fcb-4c35-4c57-91a4-ae8fd54cae94",
        "Titulo": "Superman sol rojo",
        "Texto": "Nueva figura de superman sol roja que salio este mismo año",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "noticia-superman-sol-rojo",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de una caja transparante con un hombre alto con una capa adentro.",
        "Etiquetas": ["DC","Superman","nuevo"]
    }
])

db.reviews.insert([
    {
        "IdPublicacion": "e0335ad4-828a-42c1-990d-0ced7d3592ef",
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaRegistro": "1529645967834",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Titulo": "Review de Batman millenial 2021",
        "Texto": "Review sobre el nuevo Batman 2021",
        "Calificacion": "10",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "review_Frews_Batman",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de una figura de hombre alto con una capa y mascara vestido de negro.",
        "Etiquetas": ["DC","Batman"],
        "Comentarios": ["e0345ad4-828a-42c1-990d-0ced7d3592ef"]
    },
    {
        "IdPublicacion": "0c485062-d4b7-4df9-901a-04986ac36266",
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaRegistro": "1529642967834",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Titulo": "Review de Batman",
        "Texto": "Review sobre el hombre de diamante",
        "Calificacion": "8",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "img12120101",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de una figura de un hombre alto con una capa y una mascara en su mano izquierda.",
        "Etiquetas": ["Ikea","Batman","Diamante"]
    },
    {
        "IdPublicacion": "f890d08a-5fcd-4fbd-995a-8f64c6db2998",
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaRegistro": "1529641967834",
        "IdFigura": "3a6a452d-1d67-45b8-8955-a32c015228bf",
        "Titulo": "Review de la figura nueva Superman",
        "Texto": "Review sobre la nueva figura de Superman sol rojo que salio en 2021",
        "Calificacion": "9",
        "Foto": "rutaPlaceholder",
        "NombreFoto": "foto-review-chida",
        "TipoFoto": ".jpg",
        "DescripcionFoto": "Imagen de la cara de un hombre con barba con una figura junto de su mejilla.",
        "Etiquetas": ["Noticia","Superman","Sol"]
    }
])

db.comentarios.insert([
    {
        "IdComentario": "e0335ad4-828a-42c1-990d-0ced7d3592ef",
        "Texto": "Buen review",
        "IdPublicacionOriginal":"5b8e53b1-94e1-4b97-a2fc-7b9078133e76"
    },
    {
        "IdComentario": "a4d3c395-f2e8-41c3-8fc1-9e8362b088d4",
        "Texto": "Buena noticia",
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
