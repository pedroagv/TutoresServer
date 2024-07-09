const { ejecutarCrudMaterias } = require('../models/crudMateriasModel');

async function crearMateria(req, res) {
    const { nombre } = req.body;

    try {
        const resultado = await ejecutarCrudMaterias(null, nombre, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerMaterias(req, res) {
    try {
        const resultado = await ejecutarCrudMaterias(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarMateria(req, res) {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        await ejecutarCrudMaterias(id, nombre, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarMateria(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudMaterias(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearMateria,
    obtenerMaterias,
    actualizarMateria,
    eliminarMateria,
};
