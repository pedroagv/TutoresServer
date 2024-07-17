const express = require('express');
const router = express.Router();
const nivelesEducativosController = require('../controllers/nivelesEducativosController');

/**
 * @swagger
 * /api/niveleseducativos:
 *   post:
 *     summary: Crea un nuevo nivel educativo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del nivel educativo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del nivel educativo
 *     responses:
 *       201:
 *         description: Nivel educativo creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', nivelesEducativosController.crearNivelEducativo);

/**
 * @swagger
 * /api/niveleseducativos:
 *   get:
 *     summary: Obtiene una lista de niveles educativos
 *     responses:
 *       200:
 *         description: Lista de niveles educativos
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
router.get('/', nivelesEducativosController.obtenerNivelesEducativos);

/**
 * @swagger
 * /api/niveleseducativos/{id}:
 *   put:
 *     summary: Actualiza un nivel educativo existente
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
 *                 description: Nombre del nivel educativo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del nivel educativo
 *     responses:
 *       200:
 *         description: Nivel educativo actualizado exitosamente
 *       404:
 *         description: Nivel educativo no encontrado
 */
router.put('/:id', nivelesEducativosController.actualizarNivelEducativo);

/**
 * @swagger
 * /api/niveleseducativos/{id}:
 *   delete:
 *     summary: Elimina un nivel educativo existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nivel educativo eliminado exitosamente
 *       404:
 *         description: Nivel educativo no encontrado
 */
router.delete('/:id', nivelesEducativosController.eliminarNivelEducativo);

module.exports = router;
