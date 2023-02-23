
const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');
route.get('/',(req, res) => {
    let sql = "select codHistorial,descripcion,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,codServicio, codEmpleado,codPaciente from historial;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul);
        }
    });
});


route.get('/:codHistorial',function(req,res) {
    let sql = "select codHistorial,descripcion,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,codServicio, codEmpleado,codPaciente from historial where codHistorial=?;"
    conexion.query(sql,[req.params.codHistorial],function(err,resul){
        if(err){
            throw response.json(err.message);
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
    descripcion:req.body.descripcion,
    codServicio:req.body.codServicio,
    codEmpleado:req.body.codEmpleado,
    codPaciente:req.body.codPaciente
    }
  let sql = 'Insert into historial set ?';

let tok=req.header('Authorization')
  jwt.verify(tok, jwt_secret, function (err,datos)
 {
if(datos){ 
 conexion.query(sql,data, function(err,resul){
     if(err){
console.log(err.message);
         res.json({ mensaje:'Error no se adiciono' });
                  
        }else{
        res.json({ mensaje:'Se adiciono un campo' });      
                    }
                });
               
            }else{
                res.json(err);    
            }
            }) 
        });
route.put('/:codHistorial',function(req,res) {
    let codHistorial = req.params.codHistorial;
    let descripcion = req.body.descripcion;
    let codServicio = req.body.codServicio;
    let codEmpleado = req.body.codEmpleado;
    let codPaciente= req.body.codPaciente;
    let sql = 'Update historial set descripcion = ?, codServicio=?, codEmpleado = ?, codPaciente = ? where codHistorial = ?';

  
    
let tok=req.header('Authorization')
jwt.verify(tok, jwt_secret, function (err,datos)
{
if(datos){ 
    conexion.query(sql,[descripcion,codServicio,codEmpleado,codPaciente,codHistorial],function(err,resul){
        if(err){
            console.log(err.message);
            res.json({ mensaje:'Error no se actualizo' });
        }else{
            res.json({ mensaje:'Se actualizo un campo' });
        }
    });
          }else{
              res.json(err);    
          }
          }) 
 });
 route.delete('/:codHistorial',function(req,res) {
    let codigo = req.params.codHistorial;
    let sql = 'Delete from historial where codHistorial = ?';
    let tok=req.header('Authorization')
jwt.verify(tok, jwt_secret, function (err,datos)
{
if(datos){ 
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
            res.json({ mensaje:'No se pudo eliminar un campo' });
        }else{
            res.json({ mensaje:'Se elimino un campo' });
        }
});
          }else{
              res.json(err);    
          }
          }) 
 });

 module.exports=route