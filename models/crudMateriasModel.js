const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudMaterias(id, nombre, accion) {
    try {
        
        const pool = await poolPromise;
        const request = await pool.request()        
        
        if (id !== null) request.input('id', id);
        if (nombre !== null) request.input('nombre', nombre);
        request.input('accion', accion);

        const resultado = await request.execute('crud_materias');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudMaterias,
};
