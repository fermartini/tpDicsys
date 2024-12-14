import express from 'express';
import pool from '../../config.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('select * from categorias');
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(404).send('Error al listar las categorias')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categorias WHERE id = ?', [req.params.id]);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(404).send('Error al listar las categorias')
    }
})

router.post('/', async(req,res) => { 
    try {
        const {nombre} = req.body;
        const [result] = await pool.query('INSERT INTO categorias (nombre) values (?)',[nombre])

        res.json({
            data: nombre,            
        })    
    } catch (error) {
        res.status(500).send('Error al crear productos')    
    }
});

router.put('/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const {nombre} = req.body
        await pool.query('UPDATE categorias set nombre = ? where id = ?',[nombre,id])

        res.json({
            message: 'Categorias Actualizada con exito',
            data: {id, nombre}
            
        })    
    } catch (error) {
        res.status(500).send('Error al actualizar Categorias')
    }

});

router.delete('/:id', async (req,res)=>{

    try {
        const {id} = req.params;
        await pool.query('DELETE FROM categorias where id = ?',[id])

        res.json({
            message: 'Categorias eliminadas con exito',
            data: {id}
            
        })    
    } catch (error) {
        res.status(500).send('Error al eliminar categorias')
    }
})


export default router;