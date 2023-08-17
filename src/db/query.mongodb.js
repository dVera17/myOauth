use("oauth_bearer")
db.usuarios.insertMany([
    {
        "nombre": "Pepe",
        "usuario": "pepe123",
        "rol": "admin",
        "email": "pepe123@gmail.com"
    },
    {
        "nombre": "Juan",
        "usuario": "juan123",
        "rol": "vendedor",
        "email": "juan123@gmail.com"
    }
])
db.usuarios.find({usuario: "juan123"}).pretty()

use("oauth_bearer")
db.usuarios.distinct("rol")