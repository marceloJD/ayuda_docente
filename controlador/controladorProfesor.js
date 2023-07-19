const Respuesta = require("../modelo/DTO/Respuesta");
const ProfesorDAO = require("../modelo/ProfesorDAO");

let ObtenerListaDeProfesores =async (pregunta , respuesta)=>{
    //let {profesor, curso} = pregunta.body;
    let pro =new ProfesorDAO()
    let profes = await pro.obtenerProfesores(); 
    if(profes==false){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,profes,"OK"));
    }
}

module.exports={ObtenerListaDeProfesores}