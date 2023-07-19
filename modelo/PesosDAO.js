const { getConnection, query } = require('./coneccion/Coneccion.js');

class PesosDAO{
    constructor(){}
    async definirPesos(curso, profesor , pesos){
        return false;
    }
    async modificarListaDePesos(curso,profesor,pesos){
        let connection;
        console.log("modificarListaDePesos(curso,profesor,pesos):")
        console.log(curso,profesor,pesos)
        try {
            connection = await getConnection();           
            pesos = JSON.stringify(pesos);
            const insertQuery = 
            `UPDATE Curso_Profesor
            SET pesos = ?
            WHERE idProfesor = ? AND idCurso = ?;
            `;
            await query(insertQuery, [pesos , profesor , curso]);            

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
    async obtenerPesos(curso, profesor ){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT pesos
            FROM Curso_Profesor
            WHERE idCurso = ? AND idProfesor = ?;
            `;
            result = await query(selectQuery, [curso, profesor]);
            console.log("Pesos curso, profesor:",curso, profesor)
            console.log("Pesos:",result)
            
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
        //console.log("PESOS:",result)
        return result;
    }
}

module.exports = PesosDAO