const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const statusModel = require("../routes-models/statusModel");// invocando archivo model

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
    statusModel
    .mostrarReg()// llamar metodo
    .then(sta => {
        if(sta?.length > 0){
            res.json(sta?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo estatus");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {description_status} = req.body;
    
    if (!description_status) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    statusModel
    .insertarStatus(description_status)// env datos method
    .then(idStaInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando estatus");
    });
});

app.get('/bsq/:id_status',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    statusModel
    .obtPorBsq(req.params.id_status)// enviar datos al metodo
    .then(sta => {
        if(sta?.length > 0){
            res.json(sta?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo rol");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {description_status,id_status} = req.body;
    
    if (!description_status) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    statusModel
    .actualizarStatus(description_status,id_status)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando estatus");
    });
});

/* app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_rol,id_status} = req.body;
    
    // enviar datos al modelo
    statusModel
    .statusStatus(id_status,id_rol)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando rol");
    });
}); */

module.exports = app;
