const Conexion = require('./../modelo/coneccion/Conexion');
const { getConnection, query } = require('./../modelo/coneccion/Coneccion');

///CONECTARSE A LA BASE DE DATOS
let sqlite3 = require('sqlite3').verbose();

let obtenerTablas = async ()=>{
    let conexion = await   getConnection();
    
    let nombres = await query("SELECT name FROM sqlite_master WHERE type='table' ",[])
    
    for (let i = 0; i < nombres.length; i++) {
        let nombre = nombres[i].name;
        let contenido = await query("SELECT * FROM "+nombre,[])
        console.log("TABLA: "+nombre) 
        if(contenido.length==0){
            console.log("Tabla vacia ....")
        }
        for (let j = 0; j < contenido.length; j++){
            console.log(contenido[j]) 
        }   
        console.log("-----------------------------------") 
    }
    if (conexion) {
        await conexion.release();
    }
}

obtenerTablas();

