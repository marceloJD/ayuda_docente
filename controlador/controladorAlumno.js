const AlumnoDAO = require("../modelo/AlumnoDAO");
const Respuesta = require("../modelo/DTO/Respuesta");
const NotasDAO = require("../modelo/NotasDAO.js");
const PesosDAO = require("../modelo/PesosDAO.js");


let editarMatriculaAlumno=async (pregunta , respuesta)=>{
    let {curso,profesor,alumno} = pregunta.body;
    console.log(pregunta.body)
    let Alumno = new AlumnoDAO();
    let res = await Alumno.reMatricular(curso,profesor,alumno);
    if(res==1){
        respuesta.json(new Respuesta(200,false,true,res,"OK"));
    }else{
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }
}
let matricularAlumno = async (pregunta , respuesta)=>{
    let {curso,profesor,alumno} = pregunta.body;
    console.log(pregunta.body)
    let Alumno = new AlumnoDAO();
    let res = await Alumno.matricular(curso,profesor,alumno);
    if(res==1){
        respuesta.json(new Respuesta(200,false,true,res,"OK"));
    }else{
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }
}


let ModificarListaDeNotas = async (pregunta , respuesta)=>{
    let array = pregunta.body.array;
    let curso = pregunta.body.curso;
    let profesor = pregunta.body.profesor||pregunta.cookies.usuario ;
    console.log(array,curso,profesor)
    
    let Notas = new NotasDAO();
    let error = await Notas.ingresarListaDeNotas(array);
    if(error){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,array,"Cambios guardados correctamente."));
    }
}

let ModificarListaDePesos = async (pregunta , respuesta)=>{   
    let profesor = pregunta.body.profesor;
    let curso = pregunta.body.curso;
    let pesos = pregunta.body.pesos;
    let Pesos = new PesosDAO();
    
    let error = await Pesos.definirPesos(curso,profesor,pesos);
    if(error){
        respuesta.json({mensaje:"ERROR", status:400 , resultado: false});
    }else{
        
        respuesta.json({mensaje:"OK", status:200 , resultado: true});
    }
}

let ObtenerListaDeAlumnosConNotas = async (pregunta , respuesta)=>{   
    let profesor = pregunta.cookies.usuario||pregunta.body.profesor;
    let curso = pregunta.body.curso;
    console.log(profesor,curso)
    let Notas = new NotasDAO();
    
    let data = await Notas.obtenerNotas(curso,profesor);
    if(data){
        respuesta.json(new Respuesta(200,false,true,data,"OK"));
    }else{
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }
}




let IngresarAlumno = async (pregunta , respuesta)=>{
    console.log(pregunta.body)
    //////
    let nombre = pregunta.body.Nombre;
    let apellidos = pregunta.body.Apellidos;
    let dni = pregunta.body.DNI;
    let correo = pregunta.body.Correo; 
    let direccion = pregunta.body.Direccion;   
    //////

    let alumnos = new AlumnoDAO();
    let resultado = await alumnos.ingresarAlumno(nombre , apellidos , dni , correo , direccion);
    if(resultado){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));        
    }else{
        respuesta.json(new Respuesta(200,false,true,{nombre , apellidos , dni , correo, direccion},"OK"));
    }
    
}

let IngresarAlumnos = async (pregunta , respuesta)=>{
    console.log(pregunta.body)
    //////
    let data = pregunta.body.data; 
    //////

    let alumnos = new AlumnoDAO();
    let resultado = await alumnos.ingresarAlumnos(data);
    if(resultado){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));        
    }else{
        respuesta.json(new Respuesta(200,false,true,[],"OK"));
    }
    
}

let ObtenerListaDeAlumnos = async (pregunta , respuesta)=>{   
    
    let profesor = pregunta.body.profesor||pregunta.cookies.usuario;
    let curso = pregunta.body.curso;
    let alumnos = new AlumnoDAO();
    let data = await alumnos.obtenerListaDeAlumnos(curso,profesor);
    if(data){
        respuesta.json(new Respuesta(200,false,true,data,"OK"));
    }else{
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }
}

let ModificarListaDeAlumnos = async (pregunta , respuesta)=>{   
    let array = pregunta.body;
    console.log(array)
    let alumnos = new AlumnoDAO();
    let error = await alumnos.editarListaDeAlumnos(array);
    if(error){
        respuesta.json(new Respuesta(400,true,false,array,"ERROR"));
    }else{
        
        respuesta.json(new Respuesta(200,false,true,array,"OK"));
    }   
}

let EditarAlumno = async (pregunta , respuesta)=>{   
    console.log(pregunta.body)
    let nombre = pregunta.body.Nombre;
    let apellidos = pregunta.body.Apellidos;
    let dni = pregunta.body.DNI;
    let correo = pregunta.body.Correo; 
    let direccion = pregunta.body.Direccion;   
 

    let alumnos = new AlumnoDAO();
    let resultado = await alumnos.editarAlumno(nombre , apellidos , dni , correo , direccion);
    if(resultado){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));        
    }else{
        respuesta.json(new Respuesta(200,false,true,{nombre , apellidos , dni , correo, direccion},"OK"));
    }
}


module.exports = { 
    ObtenerListaDeAlumnos ,
    IngresarAlumno , 
    EditarAlumno , 
    ModificarListaDeAlumnos,
    ModificarListaDeNotas,
    ModificarListaDePesos,
    ObtenerListaDeAlumnosConNotas,
    matricularAlumno,
    editarMatriculaAlumno,
    IngresarAlumnos
}