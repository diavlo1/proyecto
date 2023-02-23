const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codServicio,tipoServicio,precio,descripcion from servicio;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codServicio',function(req,res) {
    let sql = "select codServicio,tipoServicio,precio,descripcion from servicio where codServicio=?;"
    conexion.query(sql,[req.params.codServicio],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        tipoServicio :req.body.tipoServicio,
        precio  :req.body.precio ,
        descripcion  :req.body.descripcion ,
    }
    
    let sql = 'Insert into servicio set ?';
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
route.put('/:codServicio',function(req,res) {
    let  codigo= req.params.codServicio  ;    
    let tipoServicio=req.body.tipoServicio  ;
    let precio=req.body.precio;
    let descripcion=req.body.descripcion  ;

    let sql = 'Update servicio set tipoServicio = ?, precio = ?, descripcion = ? where codServicio  = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[tipoServicio,precio,descripcion,codigo],function(err,resul){
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
 route.delete('/:codServicio',function(req,res) {
    let codigo = req.params.codServicio  ;
    let sql = 'Delete from servicio where codServicio   = ?';
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