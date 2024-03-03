const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const customersModel = require("../routes-models/customersModel");// invocando archivo model

app.set('llave', config.llave);// actualizar llave en app
app.use(bodyParser.urlencoded({ extended: true }));// agregar parseo
app.use(bodyParser.json());// retornar body en json

router.use((req, res, next) => {// autenticando token en las rutas
    const token = req.headers['access-token'];// obt. token del header
    
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no asignada.' 
      });
    }
 });

app.get('/',router,function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    customersModel
    .mostrarReg()// llamar metodo
    .then(client => {
        // console.log(client?.length);// num de registros
        if(client?.length > 0){
            res.json(client?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo clientes");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status} = req.body;
    
    if (!first_name || !last_name || !address_customer || !mail || !phone_number || !rfc) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    customersModel
    .insertarCustomer(first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status)// env datos method
    .then(idCustomInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando cliente");
    });
});

app.get('/bsq/:id_customer',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    customersModel
    .obtPorBsq(req.params.id_customer)// enviar datos al metodo
    .then(client => {
        if(client?.length > 0){
            res.json(client?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo cliente");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_customer,first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status} = req.body;
    
    if (!first_name || !last_name || !address_customer || !mail || !phone_number || !rfc) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    customersModel
    .actualizarCustomer(first_name,last_name,address_customer,mail,phone_number,rfc,id_user,id_status,id_customer)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando cliente");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_customer,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    customersModel
    .statusCustomer(id_user,id_status,id_customer)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando cliente");
    });
});

/*
app.delete('/delete/:id_customer',router, function (req, res, next) {
    // enviar datos al modelo
    customersModel
    .eliminarCustomer(req.params.id_customer)// env datos al metodo
    .then(() => {
        res.status(200).send("REGISTRO ELIMINADO");
    })
    .catch(err => {
        return res.status(500).send("Error eliminando");
    });
});
*/

module.exports = app;
