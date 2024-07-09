const { ejecutarCrudUsuarios } = require('../models/crudUsuariosModel');

async function crearUsuario(req, res) {
    const { nombres, apellidos, codtipodocumento, identificacion, login, password, codtipousuario } = req.body;

    try {
        const resultado = await ejecutarCrudUsuarios(null, nombres, apellidos, codtipodocumento, identificacion, login, password, codtipousuario, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const resultado = await ejecutarCrudUsuarios(null, null, null, null, null, null, null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarUsuario(req, res) {
    const { id } = req.params;
    const { nombres, apellidos, codtipodocumento, identificacion, login, password, codtipousuario } = req.body;

    try {
        await ejecutarCrudUsuarios(id, nombres, apellidos, codtipodocumento, identificacion, login, password, codtipousuario, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarUsuario(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudUsuarios(id, null, null, null, null, null, null, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario,
};
