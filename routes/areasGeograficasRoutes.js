const express = require('express');
const router = express.Router();
const areasGeograficasController = require('../controllers/areasGeograficasController');

/**
 * @swagger
 * /api/areasgeograficas:
 *   post:
 *     summary: Crea una nueva área geográfica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Área geográfica creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', areasGeograficasController.crearAreaGeografica);

/**
 * @swagger
 * /api/areasgeograficas:
 *   get:
 *     summary: Obtiene una lista de áreas geográficas
 *     responses:
 *       200:
 *         description: Lista de áreas geográficas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */
router.get('/', areasGeograficasController.obtenerAreasGeograficas);

/**
 * @swagger
 * /api/areasgeograficas/{id}:
 *   put:
 *     summary: Actualiza una área geográfica existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Área geográfica actualizada exitosamente
 *       404:
 *         description: Área geográfica no encontrada
 */
router.put('/:id', areasGeograficasController.actualizarAreaGeografica);

/**
 * @swagger
 * /api/areasgeograficas/{id}:
 *   delete:
 *     summary: Elimina una área geográfica existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Área geográfica eliminada exitosamente
 *       404:
 *         description: Área geográfica no encontrada
 */
router.delete('/:id', areasGeograficasController.eliminarAreaGeografica);

module.exports = router;
