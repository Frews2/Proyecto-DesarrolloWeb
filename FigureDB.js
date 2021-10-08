db.Cuentas.insert([
    {
        "Id": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "Email": "sam@gmail.com",
        "TipoCuenta": "periodista",
        "Password": "pass"
    },
    {
        "Id": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "Email": "frews@gmail.com",
        "TipoCuenta": "coleccionista",
        "Password": "faraon"
    },
    {
        "Id": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Email": "marcos@gmail.com",
        "TipoCuenta": "coleccionista",
        "Password": "raa"
    },
    {
        "Id": "2fda76ac-6382-41d4-8208-2e4324c495fc",
        "Email": "pklove@gmail.com",
        "TipoCuenta": "administrador",
        "Password": "word"
    }
])

db.Administradores.insert([
    {
        "IdCuenta": "2fda76ac-6382-41d4-8208-2e4324c495fc",
        "Apodo": "sam@gmail.com"
    }
])

db.Periodistas.insert([
    {
        "IdCuenta": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "Nombre": "Samuel Juarez",
        "Ocupacion": "Reportero",
        "FechaRegistro": "2021-09-29",
        "FechaNacimiento": "2000-09-11",
        "Foto": "rutafake",
        "Pais": "Mexico",
        "Sexo": "Masculino"
    }
])

db.Coleccionistas.insert([
    {
        "IdCuenta": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "Apodo": "Frews",
        "FechaRegistro": "2021-10-01",
        "FechaNacimiento": "1998-05-30",
        "Foto": "rutafake",
        "Pais": "Canada",
        "Sexo": "Masculino",
        "Estatus": "Activo"
    },
    {
        "IdCuenta": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Apodo": "Marcos",
        "FechaRegistro": "2021-10-04",
        "FechaNacimiento": "1999-12-22",
        "Foto": "rutafake",
        "Pais": "Panama",
        "Sexo": "Masculino",
        "Estatus": "Activo"
    }
])

db.Figuras.insert([
    {
        "Id": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Nombre": "Batman 2021 edicion especial",
        "Altura": 40,
        "Material": "Acero Inoxidable",
        "Marca": "Guason Inc.",
        "Foto": "rutafake"
    }
])

db.Colecciones.insert([
    {
        "Id": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "IdPropietario": "Batman 2021 edicion especial",
        "Figuras": ["b763f4b3-f67a-498e-917d-f74b4affb19e"]
    }
])

db.Noticias.insert([
    {
        "Id": "a4d3c395-f2e8-41c3-8fc1-9e8362b088d4",
        "IdPeriodista": "39c2d6c5-cdaa-48e8-a231-8a60f59391c5",
        "IdFigura": "b763f4b3-f67a-498e-917d-f74b4affb19e",
        "Texto": "Nueva figura de batman plateado",
        "Foto": "rutafake",
        "FechaPublicacion": "2021-10-03",
        "Etiquetas": ["DC","Batman","Metal"]
    }
])

db.Publicaciones.insert([
    {
        "Id": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "IdColeccionista": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaPublicacion": "2021-10-03"
    },
    {
        "Id": "5b8e53b1-94e1-4b97-a2fc-7b9078133e76",
        "IdColeccionista": "6f2850f9-b82f-451d-baf2-26fd93874418",
        "FechaPublicacion": "2021-10-04"
    }
])

db.Comentarios.insert([
    {
        "IdPublicacion": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "Texto": "Buen review",
        "IdPublicacionOriginal":"5b8e53b1-94e1-4b97-a2fc-7b9078133e76"
    }
])

db.Reviews.insert([
    {
        "IdPublicacion": "5b8e53b1-94e1-4b97-a2fc-7b9078133e76",
        "Texto": "Review sobre el nuevo Batman 2021",
        "Calificacion": " 3.5 de 5 estrellas",
        "Foto":"rutafake",
        "Etiquetas": ["DC","Batman","Metal"]
    }
])

db.Reportes.insert([
    {
        "Id": "7e15a339-c2b0-4210-b82c-a79f6db5f7ee",
        "IdPublicacion": "296586c3-f036-49f8-b6c0-4f051de6c90a",
        "TipoPublicacion": "Review",
        "IdAcusador": "89e886e9-e46c-4e59-a1fb-e5bae1ead90f",
        "Razon": "No es un review, es un video de hitler",
        "IdAcusado": "6f2850f9-b82f-451d-baf2-26fd93874418"
    }
])
