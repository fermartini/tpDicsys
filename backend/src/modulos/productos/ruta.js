import express from 'express';
import pool from '../../config.js'

const router = express.Router();


router.get('/',async(req,res) =>{
    try {
        const [result] = await pool.query('select * from productos')
        res.send(result)
    } catch (error) {
        console.log('Error al listar: ',error);
        res.status(404).send('Error al listar las productos')
    }
})

router.get('/:id',async(req,res) =>{
    try {
        const [result] = await pool.query('select * from productos where id_categoria=?',[req.params.id])
        res.send(result)
    } catch (error) {
        console.log('Error al listar: ',error);
        res.status(404).send('Error al listar los productos')
    }
})

router.post('/', async(req,res) => {
    
    const {nombre, descripcion, precio, stock, id_categoria, estado  } = req.body;


    try {
        //Validación si existe:
        const [existeProducto] = await pool.query('SELECT * FROM productos WHERE nombre = ?', [nombre]);

        if (existeProducto.length > 0){
            return res.status(400).json({
                status: 400,
                mensaje: 'Ya existe un producto con ese nombre.'
            })
        }

        //Query a SQL
        const query = `
            INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, estado) 
            VALUES (?, ?, ?, ? , ?, ?)
        `;
        const [result] = await pool.query(query, [nombre, descripcion, precio, stock, id_categoria, estado]);
        res.status(201).send({ id: result.insertId, nombre, descripcion, precio, stock, id_categoria, estado });
    } catch (error) {
        res.status(500).json({
            status: 500,
            mensaje: 'Error al crear la categoría',
            error: error.message
        });
    }

})


router.put('/:id', async (req,res) =>{
    const {id} = req.params;
    const {nombre, descripcion, precio, stock, id_categoria, estado} = req.body;

    try {
        //Si el producto existe
        const [existeProducto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

        if (existeProducto.length === 0) {
            return res.status(404).send('Producto no encontrado.');
        }

        // Validar si el nombre
        const [ProductoDuplicado] = await pool.query('SELECT * FROM productos WHERE nombre = ? AND id != ?', [nombre, id]);

        if (ProductoDuplicado.length > 0) {
            return res.status(400).send('El nombre del producto ya está en uso por otro producto.');
        }

        //Query para actualizar
        const query = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?,  id_categoria = ?, estado = ?
            WHERE id = ?
        `;
        await pool.query(query, [nombre, descripcion, precio, stock, id_categoria, estado, id]);

        res.send({ message: 'Producto actualizado correctamente.' });

    } catch (error) {
        console.log('Error al actualizar producto: ', error);
        res.status(500).send('Error al actualizar el producto.');
    }

});

router.delete('/:id', async (req,res) => {
    const {id} = req.params;

    try {
        //Verificar si existe
        const [existeProducto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

        if (existeProducto.length === 0){
            return res.status(404).send('Producto no encontrado');
        }

        //Query Eliminar
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);


        res.send({message: 'Producto eliminado correctamente.'});
    } catch (error) {
        console.log('Error al eliminar producto: ', error);
        res.status(500).send('Error al eliminar el producto.');
    }
});



export default router;