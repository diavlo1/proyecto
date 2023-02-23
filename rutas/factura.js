
const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req, res) => {
    let sql = "select codFactura,tipoDocumento,numDocumento,nombre,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,codPago from factura;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
});

route.get('/:codFactura',function(req,res) {
    let sql = "select codFactura,tipoDocumento,numDocumento,nombre,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,codPago from factura where codFactura=?;"
    conexion.query(sql,[req.params.codFactura],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        tipoDocumento:req.body.tipoDocumento,
        numDocumento:req.body.numDocumento,
        nombre:req.body.nombre,
        codPago:req.body.codPago
    }
    let sql = 'Insert into factura set ?';
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
route.put('/:codFactura',function(req,res) {
    let codFactura = req.params.codFactura;
    let tipoDocumento=req.body.tipoDocumento;
    let numDocumento=req.body.numDocumento;
    let nombre=req.body.nombre;
    let codPago=req.body.codPago
    let sql = 'Update factura set tipoDocumento = ?, numDocumento=?, nombre=?, codPago=? where codFactura = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[tipoDocumento,numDocumento,nombre,codPago,codFactura],function(err,resul){
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
 route.delete('/:codFactura',function(req,res) {
    let codFactura = req.params.codFactura;
    let sql = 'Delete from factura where codFactura = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[codFactura],function(err,resul){
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
