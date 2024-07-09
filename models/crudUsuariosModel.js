const { sql, poolPromise } = require('../config/dbConfig');

async function ejecutarCrudUsuarios(id, nombres, apellidos, codtipodocumento, identificacion, login, password, codtipousuario, accion) {
    try {
        // const request = pool.request();
        const pool = await poolPromise;
        const request = await pool.request()

        if (id !== null) request.input('id', id);
        if (nombres !== null) request.input('nombres', nombres);
        if (apellidos !== null) request.input('apellidos', apellidos);
        if (codtipodocumento !== null) request.input('codtipodocumento', codtipodocumento);
        if (identificacion !== null) request.input('identificacion', identificacion);
        if (login !== null) request.input('login', login);
        if (password !== null) request.input('password', password);
        if (codtipousuario !== null) request.input('codtipousuario', codtipousuario);
        request.input('accion', accion);

        const resultado = await request.execute('crud_usuarios');
        return resultado.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    ejecutarCrudUsuarios,
};