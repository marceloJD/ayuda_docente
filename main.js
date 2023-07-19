/////////////////EXPRTESS////////////////////
let express  =  require('express');
let app = express();

/////////////////REQUIRES////////////////////
let jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let path = require('path');
////////////////RECORDATORIO DE FECHA LIMITE ////////////////////
let Recordatorio = require('./utilidades/Recordatorio.js')
let recordatorio = new Recordatorio();

/////////////////LOGERS//////////////////////////
const winston = require('winston');
const morgan = require('morgan');

// Configuración del logger para errores fatales
const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
    ),
    transports: [
      new winston.transports.File({ filename: 'logs/error.log' })
    ]
  });
  
  // Captura errores no manejados
  process.on('uncaughtException', (err) => {
    // Registra el error en el logger
    errorLogger.error(err.stack || err.message);
  
    // Realiza cualquier otra acción que desees en caso de error no manejado
  
    // Finaliza la aplicación
    process.exit(1);
  });
  
  // Captura eventos de cierre de la aplicación
  process.on('SIGINT', () => {
    // Realiza cualquier acción que desees antes de cerrar la aplicación
    errorLogger.error("CERRADO MANUAL CON CTRL C");
    // Finaliza la aplicación
    process.exit(0);
  });

// Configuración del logger para las peticiones HTTP
const httpLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
    ),
    transports: [
      new winston.transports.File({ filename: 'logs/http.log' })
    ]
  });
  
  
  // Middleware para registrar las peticiones HTTP en el logger
  const httpLogStream = {
    write: (message) => {
      httpLogger.info(message.trim());
    }
  };
  
  app.use(morgan('combined', { stream: httpLogStream }));

/////////////////CONFIGURACION///////////////////
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////MIDDLEWARE/////////////////////
let {SECRET_KEY,authenticateJWT} = require('./midelwares/JWTautenticacion')

/////////////////CONTROLADORES///////////////////////
let controladorAlumnos  =  require('./controlador/controladorAlumno.js');
let controladorProfesores = require('./controlador/controladorProfesor.js');
let controladorCursos = require('./controlador/controladorCurso.js');
let controladorPesos = require('./controlador/controladorPesos');
const ProfesorDAO = require('./modelo/ProfesorDAO.js');
const Respuesta = require('./modelo/DTO/Respuesta.js');



//////////////////ENDPOINTS////////////////////
//1 - FUNCIONALIDAD : GESTION DE NOTAS 

//1.1 - HU : DOCENTE PUEDE INGRESAR NOTA POR CURSO 
app.post('/api/modificarListaDeNotas',authenticateJWT,controladorAlumnos.ModificarListaDeNotas)

//1.2 - HU : DOCENTE PUEDE INGRESAR NOTAS DE GRUPO MEDIANTE EXCEL POR CURSO
//PUBLIC

//1.3 - HU : DOCENTE PUEDE FILTRAR ALUMNOS Y NOTAS POR CURSO
app.post('/api/obtenerListaDeAlumnosConNotas',authenticateJWT,controladorAlumnos.ObtenerListaDeAlumnosConNotas)
	


//2 - FUNCIONALIDAD : GESTION DE ALUMNOS 

//2.1 - HU : SUPERVISOR PUEDE INGRESAR UN ALUMNO (X) 
app.post('/api/ingresarAlumno',authenticateJWT,controladorAlumnos.IngresarAlumno)
app.post('/api/ingresarAlumnos',authenticateJWT,controladorAlumnos.IngresarAlumnos)

//2.2 - HU : SUPERVISOR PUEDE MODIFICAR ALUMNOS (X)
app.post('/api/obtenerListaCursos',authenticateJWT,controladorCursos.ObtenerListaDeCursos)
app.post('/api/obtenerListaCursosPorID',authenticateJWT,controladorCursos.ObtenerListaDeCursosPorID)

app.post('/api/obtenerListaProfesores',authenticateJWT,controladorProfesores.ObtenerListaDeProfesores)
app.post('/api/modificarListaDeAlumnos',authenticateJWT,controladorAlumnos.ModificarListaDeAlumnos)

//2.3 - HU : SUPERVISOR PUEDE INGRESAR MEDIANTE EXCEL
//PUBLIC

//2.4 - HU : SUPERVISOR FILTRAR ALUMNOS POR PROFESOR Y CURSO	(?)
app.post('/api/obtenerListaDeAlumnos',authenticateJWT,controladorAlumnos.ObtenerListaDeAlumnos)

//2.5 - HU : SUPERVISOR PUEDE EDITAR UN ALUMNO POR DNI (?)
app.post('/api/editarAlumno',authenticateJWT,controladorAlumnos.EditarAlumno)



//3 - FUNCIONALIDAD : GESTION DE PESOS DE NOTAS

//3.1 HU : PROFESOR PUEDE DEFINIR LOS PESOS DE LAS NOTAS Y LAS NOTAS 
app.post('/api/obtenerListaDePesos',authenticateJWT,controladorPesos.ObtenerListaDePesos)
app.post('/api/modificarListaDePesos',authenticateJWT,controladorPesos.ModificarListaDePesos)




//4 - FUNCIONALIDAD : ASIGNACION DE CURSO

// 4.1 - HU : Supervisor puede matricular
app.post('/api/matricularAlumno',authenticateJWT,controladorAlumnos.matricularAlumno)

// 4.2 - HU : Supervisor puede matricular
app.post('/api/editarMatriculaAlumno',authenticateJWT,controladorAlumnos.editarMatriculaAlumno)



//5 - FUNCIONALIDAD :	GESTION DE FECHA DE LIMITE DE SUBIDA DE NOTAS

// 5.1 - HU: SUPERVISOR PUEDE EDITAR LA FECHA LIMITE DE INGRESO DE NOTAS PARA UN CURSO Y PROFESOR
app.post('/api/ingresarFechaLimite',authenticateJWT,controladorCursos.ingresarFechaLimite)

// 5.2 - HU :PROFESOR PUEDE VER LOS RECORDATORIOS DE LA FECHA LIMITE DE INGRESO DE NOTAS PARA UN CURSO Y PROFESOR
app.post('/api/verificarFechaLimite',authenticateJWT,controladorCursos.verificarLimiteIngreso)


// LOGIN:
app.post('/api/login',async(pregunta,respuest)=>{
    let { usuario, clave , rol  } = pregunta.body;
    console.log(pregunta.body)
    let profesor = new ProfesorDAO();
    if(rol!='admin'){
      let result = await profesor.obtenerProfesor( usuario, clave)
      console.log("RESULT",result)
      if(!result){
        respuest.json(new Respuesta(400,true,false,[],"ERROR"));
        return;
      }
      usuario=result.CODIGO
    }
    
    //VERIFICACION EN BASE DE DATOS....
    const payload = {
        usuario,
        rol
    };
    const token = jwt.sign(payload, SECRET_KEY);

    console.log("Credenciales enviadas:");
    console.log('jwt', token, { httpOnly: true });
    console.log('usuario', usuario, { httpOnly: true });
    console.log('rol', rol, { httpOnly: true });
    console.log({ OK: true });

    respuest.cookie('jwt', token, { httpOnly: true });
    respuest.cookie('usuario', usuario, { httpOnly: true });
    respuest.cookie('rol', rol, { httpOnly: true });
    respuest.json({ OK: true });
})


// LOGOUT
app.get('/api/logout',(pregunta,respuesta)=>{
    // Eliminar la cookie HTTP Only
    respuesta.clearCookie('jwt');
    respuesta.clearCookie('usuario');
    respuesta.clearCookie('rol');
    //rediriga a appWeb/index.html
    respuesta.redirect('/appWeb/index.html');
})



//////////////////////////////////////////
app.listen( process.env.PORT||3000 , ()=>{
    console.log("EL servidor esat activo")
});

1