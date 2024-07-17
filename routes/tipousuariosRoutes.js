const express = require('express');
const router = express.Router();
const tipoUsuariosController = require('../controllers/tipousuariosController');

/**
 * @swagger
 * /api/tipousuarios:
 *   post:
 *     summary: Crea un nuevo tipo de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tipo de usuario
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tipo de usuario
 *     responses:
 *       201:
 *         description: Tipo de usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', tipoUsuariosController.crearTipoUsuarios);

/**
 * @swagger
 * /api/tipousuarios:
 *   get:
 *     summary: Obtiene una lista de tipos de usuarios
 *     responses:
 *       200:
 *         description: Lista de tipos de usuarios
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
router.get('/', tipoUsuariosController.obtenerTipoUsuarios);

/**
 * @swagger
 * /api/tipousuarios/{id}:
 *   put:
 *     summary: Actualiza un tipo de usuario existente
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
 *                 description: Nombre del tipo de usuario
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tipo de usuario
 *     responses:
 *       200:
 *         description: Tipo de usuario actualizado exitosamente
 *       404:
 *         description: Tipo de usuario no encontrado
 */
router.put('/:id', tipoUsuariosController.actualizarTipoUsuarios);

/**
 * @swagger
 * /api/tipousuarios/{id}:
 *   delete:
 *     summary: Elimina un tipo de usuario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de usuario eliminado exitosamente
 *       404:
 *         description: Tipo de usuario no encontrado
 */
router.delete('/:id', tipoUsuariosController.eliminarTipoUsuarios);

module.exports = router;
