const { getConnection, query } = require('./coneccion/Coneccion.js');

class NotasDAO{
    constructor(){}
    async modificarListaDeNotas(curso, profesor , nuevosPesos ){
        let primerArray =await this.obtenerNotas(curso, profesor);        
        if(primerArray){
            let connection ;
            try {
                connection = await getConnection();   
                for (const usuario of primerArray) {
                    let { id ,notas } = usuario;
                    let nuevasNotas = {}
                    for (const peso of nuevosPesos) {
                        if(notas[peso.id]==undefined){
                            nuevasNotas[peso.id]=0
                        }else{
                            nuevasNotas[peso.id]=notas[peso.id]
                        }
                    }
                    nuevasNotas = JSON.stringify(nuevasNotas);
                    let q = `UPDATE Matricula SET notas = ?
                    WHERE id = ? `;
                    let params = [nuevasNotas, id];
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
        }else{
            return true;
        }
        return false;
    }


    async ingresarListaDeNotas( array){        
        let connection ;
        try {
            connection = await getConnection();   
            for (const nota of array) {
                let { id ,notas } = nota;
                notas = JSON.stringify(notas);
                let q = `UPDATE Matricula SET notas = ?
                WHERE id = ? `;
                let params = [notas, id];
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
        console.log("INGREWSO DE NOTAS EXITOSO")
        return false;
    }
    async obtenerNotas(curso, profesor ){
        let connection;
        let resultado=false;
        try {
            connection = await getConnection();                   
            let selectQuery = `
            SELECT Matricula.id, Alumno.CODIGO, Alumno.Nombre, Alumno.Apellidos, Matricula.notas
            FROM Alumno
            JOIN Matricula ON Alumno.CODIGO = Matricula.idAlumno
            JOIN Curso_Profesor ON Matricula.idCursoProfesor = Curso_Profesor.id
            JOIN Profesor ON Curso_Profesor.idProfesor = Profesor.CODIGO
            WHERE Curso_Profesor.idCurso = ?
            AND Profesor.CODIGO = ?;
            `
            resultado = await query(selectQuery, [curso, profesor]);
            resultado = resultado.map(e=>{
                return {...e , notas : JSON.parse(e.notas)}
            })

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
}

module.exports = NotasDAO