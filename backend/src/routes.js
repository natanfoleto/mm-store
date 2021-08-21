import { Router } from 'express'

import auth from './app/middlewares/auth.js'
import { is } from './app/middlewares/permission.js'
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
import validationPermission from './app/schema/validationPermission.js'
import validationPermissions from './app/schema/validationPermissions.js'

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
import PermissionController from './app/controllers/permission.js'
import PermissionsController from './app/controllers/permissions.js'

const routes = new Router()

routes.route('/sessions').post(validation(validationSession.sessionCreate, 'body'), SessionController.create)

routes.use(auth)

routes.route('/users').post(validation(validationUser.userCreate, 'body'), UserController.create)
routes.route('/users').put(validation(validationUser.userUpdate, 'body'), UserController.update)
routes.route('/users').delete(validation(validationUser.userDelete, 'body'), UserController.remove)
routes.route('/users/search/:page/:limit').post(validation(validationUser.userSearch, 'body'), UserController.search)

routes.route('/profiles').post(validation(validationProfile.profileCreate, 'body'), ProfileController.create)
routes.route('/profiles').put(validation(validationProfile.profileUpdate, 'body'), ProfileController.update)
routes.route('/profiles').delete(validation(validationProfile.profileDelete, 'body'), ProfileController.remove)
routes.route('/profiles/search/:page/:limit').post(validation(validationProfile.profileSearch, 'body'), ProfileController.search)

routes.route('/products').get(ProductController.list)
routes.route('/products').post(validation(validationProduct.productCreate, 'body'), ProductController.create)
routes.route('/products').put(validation(validationProduct.productUpdate, 'body'), ProductController.update)
routes.route('/products').delete(validation(validationProduct.productDelete, 'body'), ProductController.remove)

routes.route('/photos').get(PhotoController.list)
routes.route('/photos').post(validation(validationPhoto.photoCreate, 'body'), PhotoController.create)
routes.route('/photos').delete(validation(validationPhoto.photoDelete, 'body'), PhotoController.remove)

routes.route('/categories').get(CategoryController.list)
routes.route('/categories').post(validation(validationCategory.categoryCreate, 'body'), CategoryController.create)
routes.route('/categories').put(validation(validationCategory.categoryUpdate, 'body'), CategoryController.update)
routes.route('/categories').delete(validation(validationCategory.categoryDelete, 'body'), CategoryController.remove)

routes.route('/providers').get(ProviderController.list)
routes.route('/providers').post(validation(validationProvider.providerCreate, 'body'), ProviderController.create)
routes.route('/providers').put(validation(validationProvider.providerUpdate, 'body'), ProviderController.update)
routes.route('/providers').delete(validation(validationProvider.providerDelete, 'body'), ProviderController.remove)

routes.route('/clients').get(ClientController.list)
routes.route('/clients').post(validation(validationClient.clientCreate, 'body'), ClientController.create)
routes.route('/clients').put(validation(validationClient.clientUpdate, 'body'), ClientController.update)
routes.route('/clients').delete(validation(validationClient.clientDelete, 'body'), ClientController.remove)

routes.route('/accounts').get(AccountController.list)

routes.route('/address').get(AddressController.list)
routes.route('/address').put(validation(validationAddress.addressUpdate, 'body'), AddressController.update)

routes.route('/wishs').get(WishController.list)
routes.route('/wishs').post(validation(validationWish.wishCreate, 'body'), WishController.create)
routes.route('/wishs').put(validation(validationWish.wishUpdate, 'body'), WishController.update)
routes.route('/wishs').delete(validation(validationWish.wishDelete, 'body'), WishController.remove)

routes.route('/permission/search/:page/:limit').post(is(['VIEW_PERMISSION']), validation(validationPermission.permissionSearch, 'body'), PermissionController.search)
routes.route('/permission').post(is(['CREATE_PERMISSION']), validation(validationPermission.permissionCreate, 'body'), PermissionController.create)
routes.route('/permission').put(is(['EDIT_PERMISSION']), validation(validationPermission.permissionUpdate, 'body'), PermissionController.update)
routes.route('/permission').delete(is(['DELETE_PERMISSION']), validation(validationPermission.permissionDelete, 'body'), PermissionController.remove)
routes.route('/permission/search/forprofile').post(validation(validationPermission.permissionSearchForProfile, 'body'), PermissionController.searchForProfile)

routes.route('/permissions').post(is(['CREATE_PERMISSIONS']), validation(validationPermissions.permissionsCreate, 'body'), PermissionsController.create)
routes.route('/permissions').delete(is(['DELETE_PERMISSIONS']), validation(validationPermissions.permissionsDelete, 'body'), PermissionsController.remove)
routes.route('/permissions/search/:perfil').get(validation(validationPermissions.permissionsSearch, 'body'), PermissionsController.search)

export default routes
