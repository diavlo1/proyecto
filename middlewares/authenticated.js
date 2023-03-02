const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');
const test = function(req,res,next){
    let tok = req.get('Authorization');
    if(!tok){
        res.json('Error')
    }
    if(tok){       
         jwt.verify(tok,jwt_secret, function(err){
        if(err) {
            res.json('Invalido')
        }else{
            next();
        }
    }) 
 }
}       

module.exports=test