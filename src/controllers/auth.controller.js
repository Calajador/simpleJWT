const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('../controllers/verifyToken');


const authCTRL = {};

authCTRL.register = async (req, res) => {

    //recogemos propiedades
    const {username, email, password} = req.body;
    const user = new User({
        username: username,
        email: email,
        password: password
    });

    //Encriptamos y guardamos
    user.password = await user.encryptPassword(user.password);
    await user.save();

    //creamos el token con el id del usuario creado y devolvemos el mensaje
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({
        ok:true,
        mensaje:'Usuario creado',
        token: token
    });
}

authCTRL.login = async (req, res) => {
    // Cogemos las propiedades mandadas incluida el
    const {email, password} = req.body;

    // Cogemos el email y comprobamos que exista
    const user = await User.findOne({email: email})
    if(!user) {
        return res.status(404).json({
            ok: false,
            mensaje: 'Email no existente'
        });
    };

    // Cogemos el password y comprobamos que sea correcta
    const validPassword = await user.validatePassword(password);
    if(!validPassword) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Password incorrecto'
        });
    }

    // Si todo va bien creamos el token usando el _id que viene siempre cada vez que creamos un user
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });


    res.status(200).json({
        ok:true,
        mensaje:'Identificado correctamente',
        token: token
    });

}

authCTRL.profile = verifyToken, async (req, res) => {
   
   const user = await User.findById(req.userId, {password:0});

   if(!user) {
       return res.status(404).json({
           ok: false,
           mensaje: 'Usuario no encontrado'
       });
   }

   res.json(user);
}


module.exports = authCTRL;