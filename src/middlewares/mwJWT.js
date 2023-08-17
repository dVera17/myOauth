import { SignJWT, jwtVerify } from "jose"
import conn from "../db/connection.js";
import { ObjectId } from "mongodb";
import { config } from "dotenv";
config();

const db = await conn();

const crearToken = async (req, res) => {
    const encoder = new TextEncoder();
    // Busca el parámetro ``usuario`` en la colección "usuarios"
    const result = await db.collection('usuarios').findOne({ usuario: req.params.usuario });
    if (!result) return res.status(404).send('Usuario no encontrado');
    const id = result._id.toString();
    // Crear el token con el id del documento buscado
    const jwtConstructor = await new SignJWT({ id: id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    res.send(jwtConstructor);
}

const validarToken = async (token) => {
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        return await db.collection('usuarios').findOne({ _id: new ObjectId(jwtData.payload.id) });
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    crearToken,
    validarToken
}