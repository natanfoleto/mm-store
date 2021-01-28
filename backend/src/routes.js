const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const ProfileController = require('./app/controllers/ProfileController');

const routes = new Router();

routes.route('/usuarios').get(UserController.list);
routes.route('/usuarios').post(UserController.create);
routes.route('/usuarios').put(UserController.update);
routes.route('/usuarios').delete(UserController.delete);

routes.route('/perfis').get(ProfileController.list);
routes.route('/perfis').post(ProfileController.create);
routes.route('/perfis').put(ProfileController.update);
routes.route('/perfis').delete(ProfileController.delete);

module.exports = routes;
