const express = require('express');
const route = express.Router()
const {conexion}= require ('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req,res) => {
    let sql = "select codCita,codPaciente,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,descripcion,date_format(fechaProxima,'%Y/%m/%d')AS fechaProxima,hora from cita;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error");
            throw err
        }else{
            res.json(resul)
        }
    });
})


route.get('/:codCita',function(req,res) {
    let sql = "select codCita,codPaciente,date_format(fecha,'%Y/%m/%d %H:%i:%s')AS fecha,descripcion,date_format(fechaProxima,'%Y/%m/%d')AS fechaProxima,hora from cita where codCita=?;"
    conexion.query(sql,[req.params.codCita],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});

route.post('/',function(req,res) {
    let data = {
        codPaciente:req.body.codPaciente,
        descripcion:req.body.descripcion,
        fechaProxima:req.body.fechaProxima,
        hora:req.body.hora
        
    }
    
    let sql = 'Insert into cita set ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,data, function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se agregar un campo' });
            }else{
                res.json({ mensaje:'Se agrego un campo' });
            }
        });
      
    }else{
        res.json(err);    
    }
    }) 
});
route.put('/:codCita',function(req,res) {
    let codigo = req.params.codCita;    
    let codPaciente=req.body.codPaciente;
    let descripcion=req.body.descripcion;
    let fechaProxima=req.body.fechaProxima;
    let  hora=req.body.hora

    let sql = 'Update cita set codPaciente = ?, descripcion=?, fechaProxima=?, hora=? where codCita = ?';
    let tok=req.header('Authorization')
    jwt.verify(tok, jwt_secret, function (err,datos)
    {
    if(datos){
        conexion.query(sql,[codPaciente,descripcion,fechaProxima,hora,codigo],function(err,resul){
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
 route.delete('/:codCita',function(req,res) {
    let codigo = req.params.codCita;
    let sql = 'Delete from cita where codCita = ?';
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