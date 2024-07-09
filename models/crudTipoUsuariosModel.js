const { sql, poolPromise } = require('../config/dbConfig');

// Ejecutar el stored procedure crud_tutores
async function ejecutarCrudTipoUsuarios(id, tipousuario, accion) {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('tipousuario', sql.NVarChar(255), tipousuario)
            .input('accion', sql.VarChar(10), accion)
            .execute('crud_tipousuarios');

        return result.recordset;
    } catch (err) {
        throw new Error(`Error al ejecutar el stored procedure crud_tipousuarios: ${err.message}`);
    }
}

// Exportar la función para ser utilizada en otros módulos
module.exports = {
    ejecutarCrudTipoUsuarios,
};
