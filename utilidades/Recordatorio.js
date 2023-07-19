const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Conexion = require('../modelo/coneccion/Conexion');

class RecordatorioDeFechaLimite {
  constructor() {
    this.conexion = new Conexion();
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '', 
        pass: '',
      },
    });

    cron.schedule('52-53-54 10 * * *', () => {
      this.EnviarRecordatorios();
    });
  }

  async ObtenerFechasLimites() {
    await this.conexion.conectar();
    let result = await this.conexion.query(`
      SELECT CP.fechaLimite, P.Correo, C.Nombre AS nombreCurso
      FROM Curso_Profesor CP
      INNER JOIN Profesor P ON CP.idProfesor = P.CODIGO
      INNER JOIN Curso C ON CP.idCurso = C.CODIGO
      WHERE CP.fechaLimite < date('now', '+7 days');
    `, []);
  
    await this.conexion.desconectar();
    return result;
  }
  

  async EnviarRecordatorios() {
    console.log("RECORDATORIO");
    
    const fechasLimites = await this.ObtenerFechasLimites();
    console.log(fechasLimites)
    
    fechasLimites.forEach(({ fechaLimite, Correo,nombreCurso }) => {
      const mailOptions = {
        from: this.transporter.options.auth.user,
        to: Correo,
        subject: 'Recordatorio de fecha límite',
        text: `Le recordamos que la fecha limite de envio de notas del curso ${nombreCurso} es ${fechaLimite}`,
      };

      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
    });
  }
}

module.exports = RecordatorioDeFechaLimite;
