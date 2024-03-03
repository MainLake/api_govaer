const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const propertyModel = require("../routes-models/propertyModel");// invocando archivo model

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
    propertyModel
    .mostrarReg()// llamar metodo
    .then(prop => {
        if(prop?.length > 0){
            res.json(prop?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo property");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status} = req.body;
    
    if (!name_property || !coordinates || !municipality || !ha || !rfc || !id_price || !id_customer) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    propertyModel
    .insertarProperty(name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status)// env datos method
    .then(idPropInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando property");
    });
});

app.get('/bsq/:id_property',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    propertyModel
    .obtPorBsq(req.params.id_property)// enviar datos al metodo
    .then(prop => {
        if(prop?.length > 0){
            res.json(prop?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo property");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_property,name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status} = req.body;
    
    if (!name_property || !coordinates || !municipality || !ha || !rfc || !id_price || !id_customer) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    propertyModel
    .actualizarProperty(name_property,coordinates,municipality,ha,rfc,id_price,id_customer,id_user,id_status,id_property)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando property");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_property,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    propertyModel
    .statusProperty(id_user,id_status,id_property)// env datos method
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando property");
    });
});

module.exports = app;
