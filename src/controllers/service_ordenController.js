const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const serviceModel = require("../routes-models/service_ordenModel");// invocando archivo model

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
    serviceModel
    .mostrarReg()// llamar metodo
    .then(serv => {
        if(serv?.length > 0){
            res.json(serv?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo servicios");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {agreed_date,so_description,id_property,id_activity,id_user,id_status} = req.body;
    
    if (!agreed_date || !so_description || !id_property || !id_activity) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    serviceModel
    .insertarServ(agreed_date,so_description,id_property,id_activity,id_user,id_status)// env datos method
    .then(idServInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando servicios");
    });
});

app.get('/bsq/:no_orden',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    serviceModel
    .obtPorBsq(req.params.no_orden)// enviar datos al metodo
    .then(serv => {
        if(serv?.length > 0){
            res.json(serv?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo servicio");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {no_orden,agreed_date,so_description,id_property,id_activity,id_user,id_status} = req.body;
    
    if (!no_orden || !agreed_date || !so_description || !id_property || !id_activity) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    serviceModel
    .actualizarServ(agreed_date,so_description,id_property,id_activity,id_user,id_status,no_orden)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando servicio");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {no_orden,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    serviceModel
    .statusServ(id_user,id_status,no_orden)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando servicio");
    });
});

module.exports = app;
