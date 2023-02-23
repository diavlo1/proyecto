const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');
route.get('/',(req,res) => {
    let sql = "select * from detallefactura;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codDetalleFactura',function(req,res) {
    let sql = "select * from detallefactura where codDetalleFactura=?;"
    conexion.query(sql,[req.params.codDetalleFactura],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
    
});

route.post('/',function(req,res) {
    let data = {
                codFactura:req.body.codFactura,
                codServicio:req.body.codServicio,
                codEmpleado:req.body.codEmpleado,
                codPaciente:req.body.codPaciente,
                costoUnitario:req.body.costoUnitario,
                descripcion:req.body.descripcion
            }
    let sql = 'Insert into detallefactura set ?';
  
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo adicionar un campo' });
            }else{
                res.json({ mensaje:'Se adiciono un campo' });
            }
        });  
    }else{
        res.json(err);    
    }
    }) 
});
route.put('/:codDetalleFactura',function(req,res) {
    let codigo = req.params.codDetalleFactura;
    let   codFactura=req.body.codFactura;
    let   codServicio=req.body.codServicio;
    let   codEmpleado=req.body.codEmpleado;
    let   codPaciente=req.body.codPaciente;
    let   costoUnitario=req.body.costoUnitario;
    let   descripcion=req.body.descripcion;
    let sql = 'Update detalleFactura set codFactura = ?, codServicio=?, codEmpleado=?, codPaciente=?, costoUnitario=?, descripcion=? where codDetalleFactura = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[codFactura,codServicio,codEmpleado,codPaciente,costoUnitario,descripcion,codigo],function(err,resul){
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
 route.delete('/:codDetalleFactura',function(req,res) {
    let codigo = req.params.codDetalleFactura;
    let sql = 'Delete from detalleFactura where codDetalleFactura = ?';
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
