const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');

/**
 * @swagger
 * /api/disponibilidad:
 *   post:
 *     summary: Crea una nueva disponibilidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: integer
 *               dia:
 *                 type: string
 *               horaInicio:
 *                 type: string
 *               horaFin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Disponibilidad creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', disponibilidadController.crearDisponibilidad);

/**
 * @swagger
 * /api/disponibilidad:
 *   get:
 *     summary: Obtiene una lista de disponibilidades
 *     responses:
 *       200:
 *         description: Lista de disponibilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tutorId:
 *                     type: integer
 *                   dia:
 *                     type: string
 *                   horaInicio:
 *                     type: string
 *                   horaFin:
 *                     type: string
 */
router.get('/', disponibilidadController.obtenerDisponibilidad);

/**
 * @swagger
 * /api/disponibilidad/{id}:
 *   put:
 *     summary: Actualiza una disponibilidad existente
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
 *               tutorId:
 *                 type: integer
 *               dia:
 *                 type: string
 *               horaInicio:
 *                 type: string
 *               horaFin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disponibilidad actualizada exitosamente
 *       404:
 *         description: Disponibilidad no encontrada
 */
router.put('/:id', disponibilidadController.actualizarDisponibilidad);

/**
 * @swagger
 * /api/disponibilidad/{id}:
 *   delete:
 *     summary: Elimina una disponibilidad existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponibilidad eliminada exitosamente
 *       404:
 *         description: Disponibilidad no encontrada
 */
router.delete('/:id', disponibilidadController.eliminarDisponibilidad);

module.exports = router;
