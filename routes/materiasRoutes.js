const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materiasController');

// Rutas para materias
router.post('/', materiasController.crearMateria);
router.get('/', materiasController.obtenerMaterias);
router.put('/:id', materiasController.actualizarMateria);
router.delete('/:id', materiasController.eliminarMateria);

module.exports = router;
