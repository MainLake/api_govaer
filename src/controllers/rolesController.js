const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const rolModel = require("../routes-models/rolModel");// invocando archivo model

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
    rolModel
    .mostrarReg()// llamar metodo
    .then(rol => {
        if(rol?.length > 0){
            res.json(rol?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo roles");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {name_rol,id_status} = req.body;
    
    if (!name_rol) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    rolModel
    .insertarRol(name_rol,id_status)// env datos method
    .then(idRolInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando rol");
    });
});

app.get('/bsq/:id_rol',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    rolModel
    .obtPorBsq(req.params.id_rol)// enviar datos al metodo
    .then(rol => {
        if(rol?.length > 0){
            res.json(rol?.sort()); // convertir a json
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
    const {id_rol,name_rol,id_status} = req.body;
    
    if (!name_rol) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    rolModel
    .actualizarRol(name_rol,id_status,id_rol)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando roles");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_rol,id_status} = req.body;
    
    // enviar datos al modelo
    rolModel
    .statusRol(id_status,id_rol)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando rol");
    });
});

module.exports = app;
