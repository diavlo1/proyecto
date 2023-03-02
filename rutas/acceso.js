const express = require('express');
const route = express.Router();
const encrypt = require('bcryptjs')
const {conexion}=require('../configuracion/database')
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');


route.post('/',function(req,res) {
    const usuario = req.body.usuario;
   let sql = 'select usuario,contraseña from login where usuario = ?';
   conexion.query(sql, [usuario], async function(error, results)  {
     if (error) {
       res.json({mensaje:'error  inesperado comuniquese con el admin'});
     }
     if (results.length == 0) {
       res.json({mensaje:'Usuario no encontrado'});
       return;
     }
      const contra= results[0].contraseña;
        await encrypt.compare(req.body.contraseña, contra)
        .then((result) => {
          if (result) {
              //------
              jwt.sign(usuario, jwt_secret, function (err,token)
              {
              if(err){
                  console.log("error, vuelva intentarlo mas tarde");
              }else{
                  res.json({token:token});
                  // res.status(200).json({token:token}) 
              }
           });
              //----
          } else {
            res.json({mensaje:'Datos incorrectos'});
          }
        })
    })
})


module.exports =  route 