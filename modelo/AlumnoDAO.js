const PesosDAO = require('./PesosDAO.js');
const { getConnection, query } = require('./coneccion/Coneccion.js');
const Conexion = require('./coneccion/Conexion.js');

class AlumnoDAO{
    constructor(){}
   

    async matricular(curso,profesor,alumno){
        let conexion = new Conexion();
        try {
            let selectQuery = `
            SELECT Matricula.notas
            FROM Matricula
            JOIN Curso_Profesor ON Curso_Profesor.id = Matricula.idCursoProfesor
            WHERE Matricula.idAlumno = ?
            AND Curso_Profesor.idCurso = ?;
            `;
            await conexion.conectar();
            let res = await conexion.query(selectQuery,[alumno,curso]);
            console.log("MATRICULA EXISTENTE",res)
            if(res.length >0){
                await conexion.desconectar()
                return -1;
            }

            let Pesos = new PesosDAO();
            let pesos = await Pesos.obtenerPesos(curso,profesor);
            if(pesos.length<=0){
                await conexion.desconectar()
                return -1;
            }
            pesos = (pesos[0].pesos)
            pesos = JSON.parse(pesos)
            console.log("PESOS desde Alumnos: ",pesos)
            const nuevoObjeto = {};

            for (const clave in pesos.pesos) {
                if (pesos.pesos.hasOwnProperty(clave)) {
                    nuevoObjeto[clave] = 0;
                }
            }

            console.log(nuevoObjeto);
            let insertQuery = `
            INSERT INTO Matricula (idAlumno, idCursoProfesor, notas)
            VALUES (?, (SELECT id FROM Curso_Profesor WHERE idCurso = ? AND idProfesor = ?), ?);
            `;

            res = await conexion.query(insertQuery,[alumno,curso,profesor,JSON.stringify(nuevoObjeto)])
            
        } catch (error) {
            console.log(error)
            return 0;
        }
        return 1;
    }
    async reMatricular(curso,profesor,alumno){
        let conexion = new Conexion();
        try {
            await conexion.conectar();
            let alumnoExistente = await conexion.query(`
            SELECT *
            FROM Alumno
            WHERE DNI = ?;
            `,[alumno]);
            console.log("ALUMNO EXISTNTO;",alumnoExistente)
            if(alumnoExistente.length==0){
                await conexion.desconectar()
                return -1;
            }

            alumno=alumnoExistente[0].CODIGO
            let selectQuery = `
            SELECT Matricula.*
            FROM Matricula
            JOIN Curso_Profesor ON Curso_Profesor.id = Matricula.idCursoProfesor
            WHERE Matricula.idAlumno = ?
            AND Curso_Profesor.idCurso = ?;
            `;
            
            let res = await conexion.query(selectQuery,[alumno,curso]);
            console.log("MATRICULA EXISTENTE",res)
            if(res.length ==0){
                await conexion.desconectar()
                return await this.matricular(curso,profesor,alumno)
            }
            let id = res[0].id;
            let Pesos = new PesosDAO();
            let pesos = await Pesos.obtenerPesos(curso,profesor);
            if(pesos.length<=0){
                await conexion.desconectar()
                return -1;
            }
            pesos = (pesos[0].pesos)
            pesos = JSON.parse(pesos)
            //console.log("PESOS desde Alumnos: ",pesos)
            const nuevoObjeto = {};

            for (const clave in pesos.pesos) {
                if (pesos.pesos.hasOwnProperty(clave)) {
                    nuevoObjeto[clave] = 0;
                }
            }

            console.log(curso,profesor,id);
            let insertQuery = `
            UPDATE Matricula
            SET idCursoProfesor = (
                SELECT id
                FROM Curso_Profesor
                WHERE idCurso = ? AND idProfesor = ?
            )
            WHERE id = ?;

            `;
            
            res = await conexion.exec(insertQuery,[curso,profesor,id])
            console.log(res)
            
        } catch (error) {
            console.log(error)
            return 0;
        }
        return 1;
    }
    async ingresarAlumno(nombre , apellidos , dni , correo,direccion){       
        let connection;

        try {
            connection = await getConnection();           
            
            const insertQuery = `INSERT INTO Alumno (Nombre, Apellidos, DNI, correo, direccion) 
            VALUES (?,?,?,?,?)`;
            await query(insertQuery, [nombre , apellidos , dni , correo,direccion]);            

            if (connection) {
            await connection.release();
            }
        } catch (error) {
            console.error(error);
            if (connection) {
            await connection.release();
            }
            return error;
        }

        return false; //// false si noo hubo error , error si lo hubo
    }
    async ingresarAlumnos(data) {
        let connection;
      
        try {
          connection = await getConnection();
      
          const insertQuery = `INSERT INTO Alumno (Nombre, Apellidos, DNI, correo, direccion) 
            VALUES (?, ?, ?, ?, ?)`;
      
          for (let i = 0; i < data.length; i++) {
            const { Nombre, Apellidos, DNI, correo, direccion} = data[i];
            await query(insertQuery, [Nombre, Apellidos, DNI, correo, direccion]);
          }
      
          if (connection) {
            await connection.release();
          }
        } catch (error) {
          console.error(error);
          if (connection) {
            await connection.release();
          }
          return error;
        }
      
        return false; 
    }
      
   
    async obtenerListaDeAlumnos(curso,profesor){
        console.log(curso,profesor)
        let CURSO = false;
        let PROFESOR = false;
        let params = [curso,profesor];
        let selectQuery = `
            SELECT Alumno.*
            FROM Alumno
            INNER JOIN Matricula ON Alumno.CODIGO = Matricula.idAlumno
            INNER JOIN Curso_Profesor ON Matricula.idCursoProfesor = Curso_Profesor.id
            WHERE (Curso_Profesor.idCurso = ? )
            AND (Curso_Profesor.idProfesor = ? )
            
            `;
            
        if(curso/1==0 && profesor/1==0){
            console.log("VCASO TODOS")
            selectQuery = `
            SELECT *
            FROM Alumno;
            `;
            params=[];
        }
        let connection;
        let resultado=false;
        try {
            connection = await getConnection();                   
            
            resultado = await query(selectQuery, params);
            

            if (connection) {
                await connection.release();                
            }
            
        }catch(error){
            console.error(error);
            if (connection) {
                await connection.release();
            }
        }
        return resultado;

        
    }

    async editarListaDeAlumnos(lista){
        let connection ;
        try {
            connection = await getConnection();   
            for (const usuario of lista) {
                const { CODIGO, Nombre, Apellidos, DNI, Correo, Direccion } = usuario;
                //console.log("PRUEBAAA",[Nombre, Apellidos, DNI, Correo, Direccion, CODIGO])
                const q = `UPDATE Alumno SET Nombre = ?, Apellidos = ?, DNI = ?, Correo = ?, Direccion = ? WHERE CODIGO = ?`;
                const params = [Nombre, Apellidos, DNI, Correo, Direccion, CODIGO];
                await query(q, params);
            }
            if (connection) {
                await connection.release();                
            }
        }catch(error){
            console.log(error)
            if (connection) {
                await connection.release();                
            }
            return error;
        }
        return false; ///TODO BIEN
    }

    async editarAlumno(Nombre, Apellidos, DNI, Correo, Direccion, CODIGO){
        let connection;

        try {
            connection = await getConnection();               
            
            const q = `UPDATE Alumno SET Nombre = ?, Apellidos = ?, Correo = ?, Direccion = ? WHERE DNI = ?`;
            const params = [Nombre, Apellidos,  Correo, Direccion, DNI];
            await query(q, params);
            
        }catch(error){
            console.log(error)
            return error;
        }
        return false;
    }
}
module.exports = AlumnoDAO