let path = require('path');
let fs = require('fs')
let appRoot = require('app-root-path');
//////////////////////////////////////
const logFilePath = path.join(appRoot.path, 'logs', 'http.log');
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] - ${req.method} ${req.url} - ${res.statusCode}\n`;
  
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error al escribir en el archivo de log:', err);
      }
    });
  
    next();
};

module.exports=logger