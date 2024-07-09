const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudAreasGeograficas(id, area, accion) {
    try {

        const pool = await poolPromise;
        const request = await pool.request()
        
        if (id !== null) request.input('id', id);
        if (area !== null) request.input('area', area);
        request.input('accion', accion);

        const resultado = await request.execute('crud_areas_geograficas');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudAreasGeograficas,
};
