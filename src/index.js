const express = require('express');
const app = express();

// Databse
require('./database');


// midlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// settings
app.set('port', process.env.PORT || 3000);

// Importar y usar Rutas
const routes = require('./routes/index.router');
app.use(routes);


// Starting Server

async function init() {
    await app.listen(app.get('port'));
    console.log('Server on Port', app.get('port'))
}   

init();