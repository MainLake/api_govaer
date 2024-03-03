const express = require('express');// instanciando framework
const app = express();// recibiendo obj. de express
const morgan = require('morgan');// mostrar codigo status en shell

/* INSTANCIA DE CONTROLADORES */
const login = require('./src/controllers/loginController');// extraer model/rutas login
const customers = require('./src/controllers/customersController');// extraer model/rutas customers
const property = require('./src/controllers/propertyController');// extraer model/rutas property
const service_activity = require('./src/controllers/service_activityController');// extraer model/rutas service_activity
const service_orden = require('./src/controllers/service_ordenController');// extraer model/rutas service_orden
const fumigation_date = require('./src/controllers/fumigation_dateController');// extraer model/rutas fumigation_date
const plane_runaway = require('./src/controllers/plane_runawayController');// extraer model/rutas plane_runaway
const users = require('./src/controllers/usersController');// extraer model/rutas users
const price_ha = require('./src/controllers/price_haController');// extraer model/rutas price_ha
const rol = require('./src/controllers/rolesController');// extraer model/rutas rol
const estatus = require('./src/controllers/statusController');// extraer model/rutas status

/* CONFIGURACION DEL SERVIDOR */
const http = require('http');// asignar ip
const hostname = 'localhost'; // host
const port = 5430;

/* MIDDLEWARES */
app.use(express.json());// acceder a datos json
app.use(morgan('dev'));// ver status en consola

/* RUTAS */
app.use('/login', login);//1 ruta de peticiones a login 
app.use('/customers', customers);//2 ruta de peticiones a customers
app.use('/property', property);//3 ruta de peticiones a property
app.use('/service_activity', service_activity);//4 ruta de peticiones a service_activity
app.use('/service_orden', service_orden);//5 ruta de peticiones a service_orden
app.use('/fumigation_date', fumigation_date);//6 ruta de peticiones a fumigation_date
app.use('/plane_runaway', plane_runaway);//7 ruta de peticiones a plane_runaway
app.use('/users', users);//8 ruta de peticiones a users
app.use('/price_ha', price_ha);//9 ruta de peticiones a price_ha
app.use('/rol', rol);//10 ruta de peticiones a rol
app.use('/status', estatus);//11 ruta de peticiones a status

app.use(function(req,res){ // verifica si existe la ruta ingresada
    res.status(404).send("RUTA NO ENCONTRADA");
})

/* INICIAR EL SERVIDOR */
app.listen(port, hostname, () =>{
    console.log(`Servidor corriendo en la ruta://${hostname}:${port}/`);
});
