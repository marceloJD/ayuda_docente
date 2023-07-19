const sqlite3 = require('sqlite3').verbose();
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf } = format;
const appRoot = require('app-root-path');
const path = require('path');

// Configuración del logger para las queries de la base de datos
const dbLogger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(appRoot.path, 'logs', 'query.log'),
      format: combine(
        timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        printf((info) => `${info.timestamp} - ${info.message}`)
      ),
    }),
  ],
});

class Conexion {
  constructor() {
    this.database = path.join(appRoot.path, 'baseDeDatos', 'database.db');
    this.db = null;
  }

  conectar() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.database, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  query(comando, parametros) {
    return new Promise((resolve, reject) => {
      this.db.all(comando, parametros, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const formattedParams = JSON.stringify(parametros);
          const logMessage = `${comando}\n${formattedParams}`;
          dbLogger.info(logMessage);
          resolve(rows);
        }
      });
    });
  }

  exec(comando, parametros) {
    return new Promise((resolve, reject) => {
      this.db.run(comando, parametros, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  desconectar() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Conexion;
