const express = require('express');
const router = express.Router();
const tipodocumentoController = require('../controllers/tipodocumentoController');

/**
 * @swagger
 * /api/tipodocumento:
 *   post:
 *     summary: Crea un nuevo tipo de documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tipo de documento
 *     responses:
 *       201:
 *         description: Tipo de documento creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', tipodocumentoController.crearTipoDocumento);

/**
 * @swagger
 * /api/tipodocumento:
 *   get:
 *     summary: Obtiene una lista de tipos de documento
 *     responses:
 *       200:
 *         description: Lista de tipos de documento
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
router.get('/', tipodocumentoController.obtenerTipoDocumento);

/**
 * @swagger
 * /api/tipodocumento/{id}:
 *   put:
 *     summary: Actualiza un tipo de documento existente
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
 *                 description: Nombre del tipo de documento
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado exitosamente
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.put('/:id', tipodocumentoController.actualizarTipoDocumento);

/**
 * @swagger
 * /api/tipodocumento/{id}:
 *   delete:
 *     summary: Elimina un tipo de documento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado exitosamente
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.delete('/:id', tipodocumentoController.eliminarTipoDocumento);

module.exports = router;
