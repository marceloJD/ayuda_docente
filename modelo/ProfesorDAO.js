const { getConnection, query } = require('./coneccion/Coneccion.js');

class ProfesorDAO{
    constructor(){}
    
    async obtenerProfesores(){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT Nombre,Apellidos,CODIGO FROM Profesor;
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
        }

        return result;
    }
    async obtenerProfesor(correo,clave){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT * FROM Profesor WHERE Correo=? AND  Clave=?;
            `;
            result = await query(selectQuery, [correo,clave]);            

            if (connection) {
                await connection.release();                
            }
            if(result.length ==1){
                result=result[0]
            }else{
                result=false
            }
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.release();
            }
        }

        return result;
    }
}

module.exports = ProfesorDAO