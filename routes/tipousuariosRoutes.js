const express = require('express');
const router = express.Router();
const tipoUsuariosController = require('../controllers/tipousuariosController');

// Rutas para tipos de usuarios
router.post('/', tipoUsuariosController.crearTipoUsuarios);
router.get('/', tipoUsuariosController.obtenerTipoUsuarios);
router.put('/:id', tipoUsuariosController.actualizarTipoUsuarios);
router.delete('/:id', tipoUsuariosController.eliminarTipoUsuarios);

module.exports = router;
