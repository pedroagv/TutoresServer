const express = require('express');
const router = express.Router();
const tipodocumentoController = require('../controllers/tipodocumentoController');

// Rutas para áreas geográficas
router.post('/', tipodocumentoController.crearTipoDocumento);
router.get('/', tipodocumentoController.obtenerTipoDocumento);
router.put('/:id', tipodocumentoController.actualizarTipoDocumento);
router.delete('/:id', tipodocumentoController.eliminarTipoDocumento);

module.exports = router;
