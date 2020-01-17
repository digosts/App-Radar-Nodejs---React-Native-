const express = require('express');
const routes = express.Router();
const prestadorController = require('../controllers/PrestadorController');

/** Rotas Prestadores */
routes.get('/:id', prestadorController.getFind);
routes.get('/', prestadorController.list);
routes.post('/', prestadorController.create);

module.exports = routes;