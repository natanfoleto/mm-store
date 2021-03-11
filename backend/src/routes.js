const { Router } = require('express');

const validation = require('./app/middlewares/validation');

const validationUser = require('./app/schema/validationUser');
const validationProfile = require('./app/schema/validationProfile');
const validationProduct = require('./app/schema/validationProduct');
const validationCategory = require('./app/schema/validationCategory');
const validationProvider = require('./app/schema/validationProvider');

const UserController = require('./app/controllers/user');
const ProfileController = require('./app/controllers/profile');
const ProductController = require('./app/controllers/product');
const CategoryController = require('./app/controllers/category');
const ProviderController = require('./app/controllers/provider');

const routes = new Router();

routes.route('/usuarios').get(UserController.list);
routes.route('/usuarios').post(validation(validationUser.userCreate, 'body'), UserController.create);
routes.route('/usuarios').put(validation(validationUser.userUpdate, 'body'), UserController.update);
routes.route('/usuarios').delete(validation(validationUser.userDelete, 'body'), UserController.delete);

routes.route('/perfis').get(ProfileController.list);
routes.route('/perfis').post(validation(validationProfile.profileCreate, 'body'), ProfileController.create);
routes.route('/perfis').put(validation(validationProfile.profileUpdate, 'body'), ProfileController.update);
routes.route('/perfis').delete(validation(validationProfile.profileDelete, 'body'), ProfileController.delete);

routes.route('/produtos').get(ProductController.list);
routes.route('/produtos').post(validation(validationProduct.productCreate, 'body'), ProductController.create);
routes.route('/produtos').put(validation(validationProduct.productUpdate, 'body'), ProductController.update);
routes.route('/produtos').delete(validation(validationProduct.productDelete, 'body'), ProductController.delete);

routes.route('/categorias').get(CategoryController.list);
routes.route('/categorias').post(validation(validationCategory.categoryCreate, 'body'), CategoryController.create);
routes.route('/categorias').put(validation(validationCategory.categoryUpdate, 'body'), CategoryController.update);
routes.route('/categorias').delete(validation(validationCategory.categoryDelete, 'body'), CategoryController.delete);

routes.route('/fornecedores').get(ProviderController.list);
routes.route('/fornecedores').post(validation(validationProvider.providerCreate, 'body'), ProviderController.create);
routes.route('/fornecedores').put(validation(validationProvider.providerUpdate, 'body'), ProviderController.update);
routes.route('/fornecedores').delete(validation(validationProvider.providerDelete, 'body'), ProviderController.delete);

module.exports = routes;
