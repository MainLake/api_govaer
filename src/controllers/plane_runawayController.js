const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const plane_runawayModel = require("../routes-models/plane_runawayModel");// invocando archivo model

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
    plane_runawayModel
    .mostrarReg()// llamar metodo
    .then(runa => {
        if(runa?.length > 0){
            res.json(runa?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo runaway");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {name_runaway,municipality,id_user,id_status} = req.body;
    
    if (!name_runaway || !municipality) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    plane_runawayModel
    .insertarRunaway(name_runaway,municipality,id_user,id_status)// env datos method
    .then(idRunInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando runaway");
    });
});

app.get('/bsq/:id_runaway',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    plane_runawayModel
    .obtPorBsq(req.params.id_runaway)// enviar datos al metodo
    .then(runa => {
        if(runa?.length > 0){
            res.json(runa?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo runaway");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_runaway,name_runaway,municipality,id_user,id_status} = req.body;
    
    if (!name_runaway || !municipality) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    plane_runawayModel
    .actualizarRunaway(name_runaway,municipality,id_user,id_status,id_runaway)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando runaway");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_runaway,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    plane_runawayModel
    .statusRunaway(id_user,id_status,id_runaway)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando runaway");
    });
});

module.exports = app;
