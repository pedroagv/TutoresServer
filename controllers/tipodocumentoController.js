const { ejecutarcrudTipoDocumento } = require('../models/crudTipoDocumentoModel');

async function crearTipoDocumento(req, res) {
    const { area } = req.body;

    try {
        const resultado = await ejecutarcrudTipoDocumento(null, tipodocumento, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerTipoDocumento(req, res) {
    try {
        const resultado = await ejecutarcrudTipoDocumento(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarTipoDocumento(req, res) {
    const { id } = req.params;
    const { tipodocumento } = req.body;

    try {
        await ejecutarcrudTipoDocumento(id, tipodocumento, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarTipoDocumento(req, res) {
    const { id } = req.params;

    try {
        await ejecutarcrudTipoDocumento(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearTipoDocumento,
    obtenerTipoDocumento,
    actualizarTipoDocumento,
    eliminarTipoDocumento,
};
