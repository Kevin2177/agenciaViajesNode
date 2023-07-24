// Extraemos express
// const express = require('express');
// Otra forma de importalo - la mas actual
import express, { text } from 'express'; 
import router from './routes/index.js'; // importamos las rutas
import db from './config/db.js';

// Se asigna la funcion de express a la variable app
const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('DB conectada') )
    .catch( error => console.log(error) );

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
/*
    req --> Lo que tu envias al servidor
    res --> Lo que estas recibiendo
    next --> "Ya termine, pasa a la siguiente iteracion (mideware)"
*/
app.use( (req, res, next) =>{
    const year = new Date();
    
    res.locals.yearAct = year.getFullYear();
    res.locals.nameSite = "Agencia de Viajes";

    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);


// Ejecutamos la función que lleva un callback
app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});


/**
 * Para ejecutar es necesario cambiar el archivo packaje.json
 *  --> En la parte de "scripts": limpiar y crear uno con las siguientes valores : "dev": "nodemon index.js"
 * 
 *  --> Ejecutar en la consola "npm run dev"
 */