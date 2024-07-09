const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutoresController');

// Rutas para tutores
router.post('/', tutoresController.crearTutor);
router.get('/', tutoresController.obtenerTutores);
router.put('/:id', tutoresController.actualizarTutor);
router.delete('/:id', tutoresController.eliminarTutor);

module.exports = router;
