import { Router } from 'express'

import auth from './app/middlewares/auth.js'
import validation from './app/middlewares/validation.js'

import validationSession from './app/schema/validationSession.js'
import validationUser from './app/schema/validationUser.js'
import validationProfile from './app/schema/validationProfile.js'
import validationProduct from './app/schema/validationProduct.js'
import validationPhoto from './app/schema/validationPhoto.js'
import validationCategory from './app/schema/validationCategory.js'
import validationProvider from './app/schema/validationProvider.js'
import validationClient from './app/schema/validationClient.js'
import validationAddress from './app/schema/validationAddress.js'
import validationWish from './app/schema/validationWish.js'

import SessionController from './app/controllers/session.js'
import UserController from './app/controllers/user.js'
import ProfileController from './app/controllers/profile.js'
import ProductController from './app/controllers/product.js'
import PhotoController from './app/controllers/photo.js'
import CategoryController from './app/controllers/category.js'
import ProviderController from './app/controllers/provider.js'
import ClientController from './app/controllers/client.js'
import AccountController from './app/controllers/account.js'
import AddressController from './app/controllers/address.js'
import WishController from './app/controllers/wish.js'

const routes = new Router();

routes.route('/sessions').post(validation(validationSession.sessionCreate, 'body'), SessionController.create);

//routes.use(auth);

routes.route('/usuarios/search/:page/:limit').post(validation(validationUser.userSearch, 'body'), UserController.search);
routes.route('/usuarios').post(validation(validationUser.userCreate, 'body'), UserController.create);
routes.route('/usuarios').put(validation(validationUser.userUpdate, 'body'), UserController.update);
routes.route('/usuarios').delete(validation(validationUser.userDelete, 'body'), UserController.remove);

routes.route('/perfis/search/:page/:limit').post(validation(validationProfile.profileSearch, 'body'), ProfileController.search);
routes.route('/perfis').post(validation(validationProfile.profileCreate, 'body'), ProfileController.create);
routes.route('/perfis').put(validation(validationProfile.profileUpdate, 'body'), ProfileController.update);
routes.route('/perfis').delete(validation(validationProfile.profileDelete, 'body'), ProfileController.remove);

routes.route('/produtos').get(ProductController.list);
routes.route('/produtos').post(validation(validationProduct.productCreate, 'body'), ProductController.create);
routes.route('/produtos').put(validation(validationProduct.productUpdate, 'body'), ProductController.update);
routes.route('/produtos').delete(validation(validationProduct.productDelete, 'body'), ProductController.remove);

routes.route('/fotos').get(PhotoController.list);
routes.route('/fotos').post(validation(validationPhoto.photoCreate, 'body'), PhotoController.create);
routes.route('/fotos').delete(validation(validationPhoto.photoDelete, 'body'), PhotoController.remove);

routes.route('/categorias').get(CategoryController.list);
routes.route('/categorias').post(validation(validationCategory.categoryCreate, 'body'), CategoryController.create);
routes.route('/categorias').put(validation(validationCategory.categoryUpdate, 'body'), CategoryController.update);
routes.route('/categorias').delete(validation(validationCategory.categoryDelete, 'body'), CategoryController.remove);

routes.route('/fornecedores').get(ProviderController.list);
routes.route('/fornecedores').post(validation(validationProvider.providerCreate, 'body'), ProviderController.create);
routes.route('/fornecedores').put(validation(validationProvider.providerUpdate, 'body'), ProviderController.update);
routes.route('/fornecedores').delete(validation(validationProvider.providerDelete, 'body'), ProviderController.remove);

routes.route('/clientes').get(ClientController.list);
routes.route('/clientes').post(validation(validationClient.clientCreate, 'body'), ClientController.create);
routes.route('/clientes').put(validation(validationClient.clientUpdate, 'body'), ClientController.update);
routes.route('/clientes').delete(validation(validationClient.clientDelete, 'body'), ClientController.remove);

routes.route('/contas').get(AccountController.list);

routes.route('/enderecos').get(AddressController.list);
routes.route('/enderecos').post(validation(validationAddress.addressCreate, 'body'), AddressController.create);
routes.route('/enderecos').put(validation(validationAddress.addressUpdate, 'body'), AddressController.update);
routes.route('/enderecos').delete(validation(validationAddress.addressDelete, 'body'), AddressController.remove);

routes.route('/pedidos').get(WishController.list);
routes.route('/pedidos').post(validation(validationWish.wishCreate, 'body'), WishController.create);
routes.route('/pedidos').put(validation(validationWish.wishUpdate, 'body'), WishController.update);
routes.route('/pedidos').delete(validation(validationWish.wishDelete, 'body'), WishController.remove);

export default routes;
