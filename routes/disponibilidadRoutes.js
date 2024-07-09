const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');

// Rutas para disponibilidad
router.post('/', disponibilidadController.crearDisponibilidad);
router.get('/', disponibilidadController.obtenerDisponibilidad);
router.put('/:id', disponibilidadController.actualizarDisponibilidad);
router.delete('/:id', disponibilidadController.eliminarDisponibilidad);

module.exports = router;
