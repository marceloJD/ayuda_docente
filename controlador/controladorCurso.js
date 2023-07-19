const Respuesta = require("../modelo/DTO/Respuesta");
const CursosDAO = require("../modelo/CursosDAO");

let verificarLimiteIngreso=async (pregunta , respuesta)=>{
    let profesor = pregunta.body.profesor || pregunta.cookies.usuario;
    console.log("PORFESOR",profesor)
    let cur =new CursosDAO()
    let fechas = await cur.verificarLimiteIngreso(profesor); 
    if(fechas===false){
        
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,fechas,"OK"));
    }
}

let ObtenerListaDeCursos =async (pregunta , respuesta)=>{
    //let {profesor, curso} = pregunta.body;
    let cur =new CursosDAO()
    let cursos = await cur.obtenerCursos(); 
    if(cursos==false){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,cursos,"OK"));
    }
}

let ObtenerListaDeCursosPorID =async (pregunta , respuesta)=>{
    let profesor = pregunta.cookies.usuario;
    console.log("pregunta.cookies:",pregunta.cookies.usuario)
    let cur =new CursosDAO()
    let cursos = await cur.obtenerCursosPorID(profesor); 
    if(cursos==false){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,cursos,"OK"));
    }
}

let ingresarFechaLimite = async (pregunta , respuesta)=>{
    let {curso,profesor,fecha} =pregunta.body;

    let cur =new CursosDAO()
    let res = await cur.ingresarFechaLimite(curso,profesor,fecha); 
    if(res==false){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,[],"OK"));
    }
}

module.exports={ObtenerListaDeCursos,ingresarFechaLimite,verificarLimiteIngreso,ObtenerListaDeCursosPorID}