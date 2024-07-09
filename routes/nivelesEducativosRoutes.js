const express = require('express');
const router = express.Router();
const nivelesEducativosController = require('../controllers/nivelesEducativosController');

// Rutas para niveles educativos
router.post('/', nivelesEducativosController.crearNivelEducativo);
router.get('/', nivelesEducativosController.obtenerNivelesEducativos);
router.put('/:id', nivelesEducativosController.actualizarNivelEducativo);
router.delete('/:id', nivelesEducativosController.eliminarNivelEducativo);

module.exports = router;
