
const { getConnection, query } = require('./coneccion/Coneccion.js');
const Conexion = require('./coneccion/Conexion.js');

class CursosDAO{
    constructor(){}
    
    async obtenerCursosPorID(profesor) {
        let connection;
        let result = false;
        try {
            connection = await getConnection();
            const selectQuery = `
                SELECT c.*
                FROM Curso c
                INNER JOIN Curso_Profesor cp ON c.CODIGO = cp.idCurso
                INNER JOIN Profesor p ON p.CODIGO = cp.idProfesor
                WHERE p.CODIGO = ?
                ;
            `;
            
            result = await query(selectQuery, [profesor]);
          
            if (connection) {
                await connection.release();
            }
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.release();
            }
            return false;
        }
    
        return result;
    } 
    async  verificarLimiteIngreso(profesor){
        let connection = new Conexion();
        let result =false;
        try {
            connection.conectar();           
            
            const selectQuery = `
            SELECT Curso.Nombre, Curso_Profesor.fechaLimite
            FROM Curso
            JOIN Curso_Profesor ON Curso.CODIGO = Curso_Profesor.idCurso
            WHERE Curso_Profesor.idProfesor = ?;
            `;
            result = await connection.query(selectQuery, [profesor]);
            console.log("RESULTADO:",result)
            await connection.desconectar()
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.desconectar()
            }
            return false;
        }

        return result;
    }
    async obtenerCursos(){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT * FROM Curso;
            `;
            result = await query(selectQuery, []);
            

            if (connection) {
                await connection.release();
                
            }
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.release();
            }
            return false;
        }

        return result;
    }
    async ingresarFechaLimite(curso,profesor,fecha){
        let connection = new Conexion();
        let result =false;
        try {
            await connection.conectar();           
            
            const updateQuery = `
            UPDATE Curso_Profesor SET fechaLimite = ? WHERE idCurso=? AND idProfesor=?;
            `;
            result = await connection.exec(updateQuery, [fecha,curso,profesor]);
            console.log("F:",result)
            if(result.changes==0){
                await connection.desconectar()
                return false;
            }
            await connection.desconectar()
        } catch (error) {
            //let log = new Log();
            //log.error(error)
            console.error(error);
            if (connection) {
                await connection.desconectar()
            }
            return false;
        }

        return true;
    }
}

module.exports = CursosDAO