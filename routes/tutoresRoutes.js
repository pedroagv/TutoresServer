const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutoresController');

/**
 * @swagger
 * /api/tutores:
 *   post:
 *     summary: Crea un nuevo tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tutor
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del tutor
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tutor
 *     responses:
 *       201:
 *         description: Tutor creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', tutoresController.crearTutor);

/**
 * @swagger
 * /api/tutores:
 *   get:
 *     summary: Obtiene una lista de tutores
 *     responses:
 *       200:
 *         description: Lista de tutores
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
 *                   especialidad:
 *                     type: string
 *                   descripcion:
 *                     type: string
 */
router.get('/', tutoresController.obtenerTutores);

/**
 * @swagger
 * /api/tutores/{id}:
 *   put:
 *     summary: Actualiza un tutor existente
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
 *                 description: Nombre del tutor
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del tutor
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tutor
 *     responses:
 *       200:
 *         description: Tutor actualizado exitosamente
 *       404:
 *         description: Tutor no encontrado
 */
router.put('/:id', tutoresController.actualizarTutor);

/**
 * @swagger
 * /api/tutores/{id}:
 *   delete:
 *     summary: Elimina un tutor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tutor eliminado exitosamente
 *       404:
 *         description: Tutor no encontrado
 */
router.delete('/:id', tutoresController.eliminarTutor);

module.exports = router;
