const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const fumigation_dateModel = require("../routes-models/fumigation_dateModel");// invocando archivo model

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
    fumigation_dateModel
    .mostrarReg()// llamar metodo
    .then(fumi => {
        if(fumi?.length > 0){
            res.json(fumi?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo fumarola");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {fum_date,hour,no_orden,id_user,id_status} = req.body;
    
    if (!fum_date || !hour || !no_orden) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    fumigation_dateModel
    .insertarFumigation(fum_date,hour,no_orden,id_user,id_status)// env datos method
    .then(idFumInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando fumarola");
    });
});

app.get('/bsq/:id_fum_date',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    fumigation_dateModel
    .obtPorBsq(req.params.id_fum_date)// enviar datos al metodo
    .then(fumi => {
        if(fumi?.length > 0){
            res.json(fumi?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo fumarola");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_fum_date,fum_date,hour,no_orden,id_user,id_status} = req.body;
    
    if (!id_fum_date || !fum_date || !hour || !no_orden) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    fumigation_dateModel
    .actualizarFumigation(fum_date,hour,no_orden,id_user,id_status,id_fum_date)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando fumarola");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_fum_date,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    fumigation_dateModel
    .statusFumigation(id_user,id_status,id_fum_date)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando fumarola");
    });
});

module.exports = app;
