//importar dotenv y debe ir hasta arriba 
require('dotenv').config()

//importar mogoose
const mongoose = require('mongoose')

//deconstruir las variables
const {
    DB_USER, DB_PASSWORD,DB_HOST,DB_NAME

} = process.env

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=kodemia`

//modelo de datos, el modelo sería una colección de base de datos 
const Koder = mongoose.model('koder', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    lastName: {
        type: String,
        required: false,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    },
    birthDate: {
        type: Date,
        required: false,

    },
    generation: {
        type: Number,
        min: 1,
        max: 100,
        required: false,
    }

}))

//La función model crea el modelo, recibe 2 argumentos el primero es el nombre del modelo que a su ves debe ser el nombre de la colección 
//mientras que el segundo argumento va a ser el tipo de esquema que queremos que cree este se pone entre parentesis

//procolo mongodb+srv
//Estructura
//protocolo://usuario:passqord@host:/dbName
//El link por defecto no trae el nombre de la Bd 

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('conexion exitosa')
    //insertar datos
    //.create regresa una promesa por lo que podemos poner otro then y otro catch
    Koder.create({
        firstName: "Sebas",
        lastName: "Lozano",
        email: "hugolozano@prueba.com",
        birthDate: new Date("1999-07-26"),
        generation: 33,
    }).then(() => {
        console.log("koder created")
    }).catch((error) => {
        console.log('Error al crear koder', error)
    })

}).catch((error) => {
    console.error('Error al conectar con la base de datos', error)
})

/**
 Las promesas son objetos que representan una ejecución, la cual puede que se cumpla o que no se cumpla (pendiente)


Las promesas por defecto nacen o se crean en estado de pendiente
Las promesas siempre son un objeto

-resolve: se resuelve la promesa (then)
-reject:se rechaza la promesa(catch)

*/


