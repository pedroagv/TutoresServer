const express = require('express');
const router = express.Router();
const areasGeograficasController = require('../controllers/areasGeograficasController');

// Rutas para áreas geográficas
router.post('/', areasGeograficasController.crearAreaGeografica);
router.get('/', areasGeograficasController.obtenerAreasGeograficas);
router.put('/:id', areasGeograficasController.actualizarAreaGeografica);
router.delete('/:id', areasGeograficasController.eliminarAreaGeografica);

module.exports = router;
