const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alex123',
    database: 'BDVeterinaria'
})
conexion.connect(function(err) {
    if(err){
        throw err;
    }else{
        console.log('Conexion exitosa !!!');
    }
});

module.exports={conexion}