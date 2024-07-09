const { ejecutarCrudNivelesEducativos } = require('../models/crudNivelesEducativosModel');

async function crearNivelEducativo(req, res) {
    const { nivel } = req.body;

    try {
        const resultado = await ejecutarCrudNivelesEducativos(null, nivel, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerNivelesEducativos(req, res) {
    try {
        const resultado = await ejecutarCrudNivelesEducativos(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarNivelEducativo(req, res) {
    const { id } = req.params;
    const { nivel } = req.body;

    try {
        await ejecutarCrudNivelesEducativos(id, nivel, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarNivelEducativo(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudNivelesEducativos(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearNivelEducativo,
    obtenerNivelesEducativos,
    actualizarNivelEducativo,
    eliminarNivelEducativo,
};
