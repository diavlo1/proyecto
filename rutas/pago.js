const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codPago,nombre, descripcion from tipoPago;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codPago',function(req,res) {
    let sql = "select codPago,nombre,descripcion from tipoPago where codPago =?;"
    conexion.query(sql,[req.params.codPago],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        nombre :req.body.nombre,
        descripcion :req.body.descripcion,
    }
    
    let sql = 'Insert into tipoPago set ?';
    let tok=req.header('Authorization')
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agregar un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
});
route.put('/:codPago',function(req,res) {
    let codigo = req.params.codPago;    
    let nombre=req.body.nombre;
    let descripcion  =req.body.descripcion;

    let sql = 'Update tipoPago set nombre = ?, descripcion = ? where codPago = ?';

        conexion.query(sql,[nombre ,descripcion ,codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo actualizar un campo' });
            }else{
                res.json({ mensaje:'Se actualizo un campo' });
            }
        }); 
 });
 route.delete('/:codPago',function(req,res) {
    let codigo = req.params.codPago ;
    let sql = 'Delete from tipoPago where codPago = ?';
        conexion.query(sql,[codigo],function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo eliminar un campo' });
            }else{
                res.json({ mensaje:'Se elimino un campo' });
            }
        });
});



module.exports=route