const { ejecutarCrudTutores } = require('../models/crudTutoresModel');

async function crearTutor(req, res) {
    const { id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad, id_materia } = req.body;

    try {
        const resultado = await ejecutarCrudTutores(null, id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad, id_materia, 'crear');
        const nuevoId = resultado[0].nuevoId;
        res.status(201).json({ message: 'creado correctamente', id: nuevoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerTutores(req, res) {
    try {
        const resultado = await ejecutarCrudTutores(null, null, null, null, null, null, 'leer');
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function actualizarTutor(req, res) {
    const { id } = req.params;
    const { id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad, id_materia } = req.body;

    try {
        await ejecutarCrudTutores(id, id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad, id_materia, 'actualizar');
        res.json({ message: 'actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarTutor(req, res) {
    const { id } = req.params;

    try {
        await ejecutarCrudTutores(id, null, null, null, null, null, 'eliminar');
        res.json({ message: 'eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    crearTutor,
    obtenerTutores,
    actualizarTutor,
    eliminarTutor,
};
