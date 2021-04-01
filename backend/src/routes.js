const { Router } = require('express');

const auth = require('./app/middlewares/auth');
const validation = require('./app/middlewares/validation');

const validationSession = require('./app/schema/validationSession');
const validationUser = require('./app/schema/validationUser');
const validationProfile = require('./app/schema/validationProfile');
const validationProduct = require('./app/schema/validationProduct');
const validationPhoto = require('./app/schema/validationPhoto');
const validationCategory = require('./app/schema/validationCategory');
const validationProvider = require('./app/schema/validationProvider');
const validationClient = require('./app/schema/validationClient');
const validationAddress = require('./app/schema/validationAddress');
const validationWish = require('./app/schema/validationWish');

const SessionController = require('./app/controllers/session');
const UserController = require('./app/controllers/user');
const ProfileController = require('./app/controllers/profile');
const ProductController = require('./app/controllers/product');
const PhotoController = require('./app/controllers/photo');
const CategoryController = require('./app/controllers/category');
const ProviderController = require('./app/controllers/provider');
const ClientController = require('./app/controllers/client');
const AccountController = require('./app/controllers/account');
const AddressController = require('./app/controllers/address');
const WishController = require('./app/controllers/wish');

const routes = new Router();

routes.route('/sessions').post(validation(validationSession.sessionCreate, 'body'), SessionController.create);

//routes.use(auth.authenticate);

routes.route('/usuarios').get(UserController.list);
routes.route('/usuarios').post(validation(validationUser.userCreate, 'body'), UserController.create);
routes.route('/usuarios').put(validation(validationUser.userUpdate, 'body'), UserController.update);
routes.route('/usuarios').delete(validation(validationUser.userDelete, 'body'), UserController.delete);

routes.route('/perfis/:page/:limit').get(ProfileController.list);
routes.route('/perfis').post(validation(validationProfile.profileCreate, 'body'), ProfileController.create);
routes.route('/perfis').put(validation(validationProfile.profileUpdate, 'body'), ProfileController.update);
routes.route('/perfis').delete(validation(validationProfile.profileDelete, 'body'), ProfileController.delete);

routes.route('/produtos').get(ProductController.list);
routes.route('/produtos').post(validation(validationProduct.productCreate, 'body'), ProductController.create);
routes.route('/produtos').put(validation(validationProduct.productUpdate, 'body'), ProductController.update);
routes.route('/produtos').delete(validation(validationProduct.productDelete, 'body'), ProductController.delete);

routes.route('/fotos').get(PhotoController.list);
routes.route('/fotos').post(validation(validationPhoto.photoCreate, 'body'), PhotoController.create);
routes.route('/fotos').delete(validation(validationPhoto.photoDelete, 'body'), PhotoController.delete);

routes.route('/categorias').get(CategoryController.list);
routes.route('/categorias').post(validation(validationCategory.categoryCreate, 'body'), CategoryController.create);
routes.route('/categorias').put(validation(validationCategory.categoryUpdate, 'body'), CategoryController.update);
routes.route('/categorias').delete(validation(validationCategory.categoryDelete, 'body'), CategoryController.delete);

routes.route('/fornecedores').get(ProviderController.list);
routes.route('/fornecedores').post(validation(validationProvider.providerCreate, 'body'), ProviderController.create);
routes.route('/fornecedores').put(validation(validationProvider.providerUpdate, 'body'), ProviderController.update);
routes.route('/fornecedores').delete(validation(validationProvider.providerDelete, 'body'), ProviderController.delete);

routes.route('/clientes').get(ClientController.list);
routes.route('/clientes').post(validation(validationClient.clientCreate, 'body'), ClientController.create);
routes.route('/clientes').put(validation(validationClient.clientUpdate, 'body'), ClientController.update);
routes.route('/clientes').delete(validation(validationClient.clientDelete, 'body'), ClientController.delete);

routes.route('/contas').get(AccountController.list);

routes.route('/enderecos').get(AddressController.list);
routes.route('/enderecos').post(validation(validationAddress.addressCreate, 'body'), AddressController.create);
routes.route('/enderecos').put(validation(validationAddress.addressUpdate, 'body'), AddressController.update);
routes.route('/enderecos').delete(validation(validationAddress.addressDelete, 'body'), AddressController.delete);

routes.route('/pedidos').get(WishController.list);
routes.route('/pedidos').post(validation(validationWish.wishCreate, 'body'), WishController.create);
routes.route('/pedidos').put(validation(validationWish.wishUpdate, 'body'), WishController.update);
routes.route('/pedidos').delete(validation(validationWish.wishDelete, 'body'), WishController.delete);

module.exports = routes;
