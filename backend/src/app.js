import express from 'express';
import pool from './config.js';
import categorias from './modulos/categorias/ruta.js'
import productos from './modulos/productos/ruta.js'
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));




app.use(express.json());

app.set('port', process.env.DB_PORT);

app.use('/api/categorias', categorias);
app.use('/api/productos', productos);


export default app;