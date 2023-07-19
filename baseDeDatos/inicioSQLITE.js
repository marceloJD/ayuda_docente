/// USA SQLITE3 PARA CREAR LA BASE DE DATOS
let fs = require('fs');
let sqlite3 = require('sqlite3').verbose();


/// obtener el codigo SQL del archivo inicio.sql 
let contenido ;
contenido = fs.readFileSync("BD.sql",'utf-8');

// PREGUNTAR SI EL archivo .db existe y si es así eliminarlo 
if (fs.existsSync("database.db")) {
    fs.unlinkSync("database.db");
}

/// me conecto con la BD representada en el archivo.db (en caso no exista el archivo , lo crea)
let db = new sqlite3.Database("database.db");

/// ejecuto el codigo de creacion de dicha base de datos (creacion de tablas)
db.exec(contenido, function(err) {
    if (err) {
      console.error('Error in  SQL script:', err);
    } else {
      console.log('OK');
    }
    db.close();
});
















