const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codEmpleado ,tipoEmpleado ,codUsuario from empleado;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codEmpleado',function(req,res) {
    let sql = "select codEmpleado ,tipoEmpleado ,codUsuario from empleado where codEmpleado =?;"
    conexion.query(sql,[req.params.codEmpleado],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        tipoEmpleado :req.body.tipoEmpleado,
        codUsuario  :req.body.codUsuario,        
    }
    
    let sql = 'Insert into empleado set ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agrego un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
      
    }else{
        res.json(err);    
    }
    }) 
});
route.put('/:codEmpleado',function(req,res) {
    let codigo   = req.params.codEmpleado  ;    
    let tipoEmpleado  =req.body.tipoEmpleado  ;
    let codUsuario  =req.body.codUsuario  ;
    let sql = 'Update empleado set tipoEmpleado = ?, codUsuario = ? where codEmpleado = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[tipoEmpleado ,codUsuario ,codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        }); 
      
    }else{
        res.json(err);    
    }
    }) 
 });
 route.delete('/:codEmpleado',function(req,res) {
    let codigo = req.params.codEmpleado ;
    let sql = 'Delete from empleado where codEmpleado = ?';
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