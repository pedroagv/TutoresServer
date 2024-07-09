const sql = require('mssql');

// Configuración de conexión a SQL Server
// se creo una cuenta gratuita en asp smarter, para esto. esta base de datos es publica por 60 dias. es de SQL server
const config = {
  user: 'db_aaacd8_tutorias_admin',
  password: 'Juliana07',
  server: 'sql8005.site4now.net',
  database: 'db_aaacd8_tutorias',
  options: {
    encrypt: true, // Para conexiones seguras
    trustServerCertificate: true, // Solo para pruebas locales, NO RECOMENDADO para producción
  },
};

// Crear un pool de conexiones
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error en la conexión de SQL Server:', err.message);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
