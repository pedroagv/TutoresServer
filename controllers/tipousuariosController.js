const { ejecutarCrudTipoUsuarios } = require('../models/crudTipoUsuariosModel');

async function crearTipoUsuarios(req, res) {
    const { tipousuario } = req.body;

    try {
        const resultado = await ejecutarCrudTipoUsuarios(null, tipousuario, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerTipoUsuarios(req, res) {
    try {
        const resultado = await ejecutarCrudTipoUsuarios(null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarTipoUsuarios(req, res) {
    const { id } = req.params;
    const { tipousuario } = req.body;

    try {
        await ejecutarCrudTipoUsuarios(id, tipousuario, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarTipoUsuarios(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudTipoUsuarios(id, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearTipoUsuarios,
    obtenerTipoUsuarios,
    actualizarTipoUsuarios,
    eliminarTipoUsuarios,
};
