const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materiasController');

/**
 * @swagger
 * /api/materias:
 *   post:
 *     summary: Crea una nueva materia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la materia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la materia
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', materiasController.crearMateria);

/**
 * @swagger
 * /api/materias:
 *   get:
 *     summary: Obtiene una lista de materias
 *     responses:
 *       200:
 *         description: Lista de materias
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
 *                   descripcion:
 *                     type: string
 */
router.get('/', materiasController.obtenerMaterias);

/**
 * @swagger
 * /api/materias/{id}:
 *   put:
 *     summary: Actualiza una materia existente
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
 *                 description: Nombre de la materia
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la materia
 *     responses:
 *       200:
 *         description: Materia actualizada exitosamente
 *       404:
 *         description: Materia no encontrada
 */
router.put('/:id', materiasController.actualizarMateria);

/**
 * @swagger
 * /api/materias/{id}:
 *   delete:
 *     summary: Elimina una materia existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Materia eliminada exitosamente
 *       404:
 *         description: Materia no encontrada
 */
router.delete('/:id', materiasController.eliminarMateria);

module.exports = router;
