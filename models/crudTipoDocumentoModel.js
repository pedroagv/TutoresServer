const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarcrudTipoDocumento(id, tipodocumento, accion) {
    try {

        const pool = await poolPromise;
        const request = await pool.request()
        
        if (id !== null) request.input('id', id);
        if (tipodocumento !== null) request.input('tipodocumento', tipodocumento);
        request.input('accion', accion);

        const resultado = await request.execute('crud_tipodocumentos');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarcrudTipoDocumento,
};
