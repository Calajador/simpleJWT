const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function (req, res, next) {

    // Leer el Token
    const token = req.headers['x-access-token'];

    // No hay token
    if(!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token'
        });
    };

    // Si hay token lo decodificamos extraemos el id 
   // Luego lo asignamos a la propiedad userId que creamos, y la pasamos por el req
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded._id;
  
    next();
  };
