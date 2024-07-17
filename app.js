const express = require('express');
const cors = require('cors');
const setupSwagger = require('./swagger');

const app = express();

// Configura CORS
app.use(cors());

// Configura Swagger
setupSwagger(app);

const usuariosRoutes = require('./routes/usuariosRoutes');
const tipoUsuariosRoutes = require('./routes/tipousuariosRoutes');
const tutoresRoutes = require('./routes/tutoresRoutes');
const materiasRoutes = require('./routes/materiasRoutes');
const nivelesEducativosRoutes = require('./routes/nivelesEducativosRoutes');
const areasGeograficasRoutes = require('./routes/areasGeograficasRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
const tipodocumentoRoutes = require('./routes/tipodocumentoRoutes');

app.use(express.json());

// // Definir una ruta para el endpoint principal
// app.get('/', (req, res) => {
//     const textoHTML = `
// <h2>Bienvenido al API de Tutori-FLY Online.</h2>
// <p><strong>Nuestra API:</strong></p>
// <ul>
//     <li><a href="/api/usuarios">/api/usuarios</a></li>
//     <li><a href="/api/tipousuarios">/api/tipousuarios</a></li>
//     <li><a href="/api/tutores">/api/tutores</a></li>
//     <li><a href="/api/materias">/api/materias</a></li>
//     <li><a href="/api/niveleseducativos">/api/niveleseducativos</a></li>
//     <li><a href="/api/areasgeograficas">/api/areasgeograficas</a></li>
//     <li><a href="/api/disponibilidad">/api/disponibilidad</a></li>
//     <li><a href="/api/tipodocumento">/api/tipodocumento</a></li>
// </ul>
// <p><a href="/api-docs">Documentación de la API</a></p>
// `;
//     res.send(textoHTML);
// });

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tipousuarios', tipoUsuariosRoutes);
app.use('/api/tutores', tutoresRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/niveleseducativos', nivelesEducativosRoutes);
app.use('/api/areasgeograficas', areasGeograficasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);
app.use('/api/tipodocumento', tipodocumentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
