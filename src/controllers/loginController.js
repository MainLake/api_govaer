const express = require('express'),// instanciando framework express
    bodyParser = require('body-parser'),// parseo de body
    jwt = require('jsonwebtoken'),// obt. token 
    config = require('../../configs/config'),// obt. key definida
    app = express();// recibiendo obj. de express
const router = express.Router();// generar rutas

const loginModel = require("../routes-models/loginModel");// invocando archivo model

app.set('llave', config.llave);// actualizar llave en app
app.use(bodyParser.urlencoded({ extended: true }));// agregar parseo
app.use(bodyParser.json());// retornar body en json

app.post('/log', function (req, res, next)  {// login (simulado p/obt token)
    const { login, psswrd} = req.body;
    // enviar datos al modelo p/obt login
    loginModel
    .obtLog(login,psswrd)// enviar datos al metodo
    .then(login => {
        if(login?.length > 0){
            // res.json(login); // convertir a json
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, app.get('llave'), {// token tarda 1 dia
                expiresIn: 7200 // 2 hras activo 
            });

            res.json({
                mensaje: 'Autenticación correcta',
                token: token,
                log_in: login
            });
        }else{
            return res.status(500).send("Usuario o contraseña incorrectos");
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send("Error en login");
    });
});

// TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjY1MzI1OTk5LCJleHAiOjE2NjUzMjc0Mzl9.DSreYmCN6Unf8PP3fnFkY9F3g4-ROnSwlK7psz1mJUk

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

module.exports = app;
