const { ejecutarCrudAreasGeograficas } = require('../models/crudAreasGeograficasModel');

async function crearAreaGeografica(req, res) {
    const { area } = req.body;

    try {
        const resultado = await ejecutarCrudAreasGeograficas(null, area, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerAreasGeograficas(req, res) {
    try {
        const resultado = await ejecutarCrudAreasGeograficas(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarAreaGeografica(req, res) {
    const { id } = req.params;
    const { area } = req.body;

    try {
        await ejecutarCrudAreasGeograficas(id, area, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarAreaGeografica(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudAreasGeograficas(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearAreaGeografica,
    obtenerAreasGeograficas,
    actualizarAreaGeografica,
    eliminarAreaGeografica,
};
