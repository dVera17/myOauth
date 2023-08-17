import conn from "../db/connection.js";
const db = await conn();

const validateRol = async (req, res, next) => {
    try {
        const roles = await db.collection("usuarios").distinct("rol").toArray();
        if(roles[req.user.rol].includes(req.url.split('/')[2])) next();
        else res.status(403).send('No tienes permisos para acceder a este recurso');
    } catch (error) {
        res.send(error);
    }
}

export default validateRol;