const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const service_activityModel = require("../routes-models/service_activityModel");// invocando archivo model

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
    service_activityModel
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
    const {activity_description,id_user,id_status} = req.body;
    
    if (!activity_description) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    service_activityModel
    .insertarServAct(activity_description,id_user,id_status)// env datos method
    .then(idServInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando servicios");
    });
});

app.get('/bsq/:id_activity',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    service_activityModel
    .obtPorBsq(req.params.id_activity)// enviar datos al metodo
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
    const {id_activity,activity_description,id_user,id_status} = req.body;
    
    if (!id_activity || !activity_description) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    service_activityModel
    .actualizarServAct(activity_description,id_user,id_status,id_activity)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando servicio");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_activity,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    service_activityModel
    .statusServAct(id_user,id_status,id_activity)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando servicio");
    });
});

module.exports = app;
