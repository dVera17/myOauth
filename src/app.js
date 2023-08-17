import express from 'express';
import passportHelper from './helpers/passportHelper.js';
import { crearToken } from './middlewares/mwJWT.js';
import validateRol from './middlewares/mwValidateRol.js';
import { config } from "dotenv";
config();
const app = express();
app.set('port', process.env.PORT_SERVER);
app.use(express.json());
app.use(passportHelper.initialize());

app.use('/token/:usuario', crearToken);

const bearerAuth = passportHelper.authenticate('bearer', { session: false })

app.use('/api/admin', bearerAuth, validateRol, (req, res) => {
    res.json({ mensaje: 'Hola admin', usuario: req.user });
})

app.use('/api/vendedor', bearerAuth, validateRol, (req, res) => {
    res.json({ mensaje: 'Hola admin', usuario: req.user });
})

export default app;