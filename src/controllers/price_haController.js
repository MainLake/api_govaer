const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const price_haModel = require("../routes-models/price_haModel");// invocando archivo model

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
    price_haModel
    .mostrarReg()// llamar metodo
    .then(price => {
        if(price?.length > 0){
            res.json(price?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo precios");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {description,amount,id_user,id_status} = req.body;
    
    if (!description || !amount) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    price_haModel
    .insertarPrice(description,amount,id_user,id_status)// env datos method
    .then(idPriceInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando precio");
    });
});

app.get('/bsq/:id_price',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    price_haModel
    .obtPorBsq(req.params.id_price)// enviar datos al metodo
    .then(price => {
        if(price?.length > 0){
            res.json(price?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo precio");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_price,description,amount,id_user,id_status} = req.body;
    
    if (!description || !amount) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    price_haModel
    .actualizarPrice(description,amount,id_user,id_status,id_price)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando precios");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_price,id_user,id_status} = req.body;
    
    // enviar datos al modelo
    price_haModel
    .statusPrice(id_user,id_status,id_price)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando precio");
    });
});

module.exports = app;
