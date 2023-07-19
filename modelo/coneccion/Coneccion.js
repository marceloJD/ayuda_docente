const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const appRoot = require('app-root-path');
const path = require('path');

// Configuración del logger para las queries de la base de datos
const dbLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: path.join(appRoot.path, 'logs', 'query.log') })
  ]
});

let DB = path.join(appRoot.path, 'baseDeDatos', 'database.db');
const db = new sqlite3.Database(DB);

const getConnection = () => {};

const query = (sql, param) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${sql}\n`;

    // Registra la consulta en el logger
    dbLogger.info(logMessage);

    // Ejecuta la consulta en la base de datos
    db.all(sql, param, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  query,
  getConnection
};
