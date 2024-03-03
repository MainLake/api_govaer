const express = require('express'),// instanciando framework express
      bodyParser = require('body-parser'),// parseo de body
      jwt = require('jsonwebtoken'),// obt. token 
      config = require('../../configs/config'),// obt. key definida
      app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const usersModel = require("../routes-models/usersModel");// invocando archivo model

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
    usersModel
    .mostrarReg()// llamar metodo
    .then(user => {
        if(user?.length > 0){
            res.json(user?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo usuario");
    });
});

app.post('/insert',router, function (req, res, next) {// insertar datos
    const {name,first_name,last_name,login,psswrd,id_rol,id_status} = req.body;
    
    if (!name || !first_name || !last_name || !login || !psswrd || !id_rol) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo
    usersModel
    .insertarUser(name,first_name,last_name,login,psswrd,id_rol,id_status)// env datos method
    .then(idUserInsertado => {
        res.status(200).send("REGISTRO INSERTADO");
    })
    .catch(err => {
        return res.status(500).send("Error insertando usuario");
    });
});

app.get('/bsq/:id_user',router, function (req, res, next) {// mostrar todos los registros
    // enviar datos al modelo
    usersModel
    .obtPorBsq(req.params.id_user)// enviar datos al metodo
    .then(user => {
        if(user?.length > 0){
            res.json(user?.sort()); // convertir a json
        }else{
            return res.status(500).send("No se encontraron registros");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error obteniendo usuario");
    });
});

app.put('/update',router, function (req, res, next) {// insertar datos
    const {id_user,name,first_name,last_name,login,psswrd,id_rol,id_status} = req.body;
    
    if (!id_user || !name || !first_name || !last_name || !login || !psswrd || !id_rol) {// validacion datos vacios
        return res.status(500).send("COMPLETA DATOS OBLIGATORIOS");
    }

    // enviar datos al modelo 
    usersModel
    .actualizarUser(name,first_name,last_name,login,psswrd,id_rol,id_status,id_user)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando usuario");
    });
});

app.put('/upd_status',router, function (req, res, next) {// insertar datos
    const {id_user,id_status} = req.body;
    
    // enviar datos al modelo
    usersModel
    .statusUser(id_status,id_user)// env datos meth
    .then(() => {
        res.status(200).send("REGISTRO ACTUALIZADO");
    })
    .catch(err => {
        return res.status(500).send("Error actualizando usuario");
    });
});

module.exports = app;
