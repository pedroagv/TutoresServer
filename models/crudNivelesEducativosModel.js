const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudNivelesEducativos(id, nivel, accion) {
    try {
        const pool = await poolPromise;
        const request = await pool.request()
        
        if (id !== null) request.input('id', id);
        if (nivel !== null) request.input('nivel', nivel);
        request.input('accion', accion);

        const resultado = await request.execute('crud_niveles_educativos');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudNivelesEducativos,
};
