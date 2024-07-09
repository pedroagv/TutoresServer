const { ejecutarCrudDisponibilidad } = require('../models/crudDisponibilidadModel');

async function crearDisponibilidad(req, res) {
    const { disponibilidad } = req.body;

    try {
        const resultado = await ejecutarCrudDisponibilidad(null, disponibilidad, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerDisponibilidad(req, res) {
    try {
        const resultado = await ejecutarCrudDisponibilidad(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarDisponibilidad(req, res) {
    const { id } = req.params;
    const { disponibilidad } = req.body;

    try {
        await ejecutarCrudDisponibilidad(id, disponibilidad, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarDisponibilidad(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudDisponibilidad(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearDisponibilidad,
    obtenerDisponibilidad,
    actualizarDisponibilidad,
    eliminarDisponibilidad,
};
