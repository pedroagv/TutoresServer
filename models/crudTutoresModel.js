const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudTutores(id, id_usuario, id_nivel_educativo, id_area_geografica, id_disponibilidad, id_materia, accion) {
    try {
        const pool = await poolPromise;
        const request = await pool.request()
        
        if (id !== null) request.input('id', id);
        if (id_usuario !== null) request.input('id_usuario', id_usuario);
        if (id_nivel_educativo !== null) request.input('id_nivel_educativo', id_nivel_educativo);
        if (id_area_geografica !== null) request.input('id_area_geografica', id_area_geografica);
        if (id_disponibilidad !== null) request.input('id_disponibilidad', id_disponibilidad);
        if (id_materia !== null) request.input('id_materia', id_materia);
        request.input('accion', accion);

        const resultado = await request.execute('crud_tutores');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudTutores,
};
