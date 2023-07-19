const jwt = require('jsonwebtoken');
let SECRET_KEY="HOLA";
const authenticateJWT = (req, res, next) => {
    //console.log(req.cookies)


    next();

    /*
    // Obtener el token de la cookie HTTP Only
    const token = req.cookies.jwt;
    console.log(req.cookies)
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token es inválido o ha expirado
            return res.status(401).json({ error: 'Token inválido o expirado' });
        } else {
            // El token es válido, almacenar los datos del usuario en el objeto de solicitud (req)
            req.user = decoded;
            next();
        }
        });
    } else {
        // No se encontró el token en la cookie
        res.status(401).json({ error: 'Token no proporcionado' });
    }*/
};

module.exports = {SECRET_KEY,authenticateJWT}