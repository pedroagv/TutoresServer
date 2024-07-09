const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuariosRoutes');
const tipoUsuariosRoutes = require('./routes/tipousuariosRoutes');
const tutoresRoutes = require('./routes/tutoresRoutes');
const materiasRoutes = require('./routes/materiasRoutes');
const nivelesEducativosRoutes = require('./routes/nivelesEducativosRoutes');
const areasGeograficasRoutes = require('./routes/areasGeograficasRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');

app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tipousuarios', tipoUsuariosRoutes);
app.use('/api/tutores', tutoresRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/niveleseducativos', nivelesEducativosRoutes);
app.use('/api/areasgeograficas', areasGeograficasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
