const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudDisponibilidad(id, disponibilidad, accion) {
    try {

        const pool = await poolPromise;
        const request = await pool.request()
        
        if (id !== null) request.input('id', id);
        if (disponibilidad !== null) request.input('disponibilidad', disponibilidad);
        request.input('accion', accion);

        const resultado = await request.execute('crud_disponibilidad');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudDisponibilidad,
};
