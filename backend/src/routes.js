import { Router } from 'express'

import auth from './app/middlewares/auth.js'
import audit from './app/middlewares/audit.js'
import { is } from './app/middlewares/permission.js'
import validation from './app/middlewares/validation.js'

import validationSession from './app/schema/validationSession.js'
import validationUser from './app/schema/validationUser.js'
import validationProfile from './app/schema/validationProfile.js'
import validationProduct from './app/schema/validationProduct.js'
import validationCategory from './app/schema/validationCategory.js'
import validationProvider from './app/schema/validationProvider.js'
import validationClient from './app/schema/validationClient.js'
import validationAccount from './app/schema/validationAccount.js'
import validationAddress from './app/schema/validationAddress.js'
import validationWish from './app/schema/validationWish.js'
import validationPermission from './app/schema/validationPermission.js'
import validationPermissions from './app/schema/validationPermissions.js'

import SessionController from './app/controllers/session.js'
import UserController from './app/controllers/user.js'
import ProfileController from './app/controllers/profile.js'
import ProductController from './app/controllers/product.js'
import CategoryController from './app/controllers/category.js'
import ProviderController from './app/controllers/provider.js'
import ClientController from './app/controllers/client.js'
import AccountController from './app/controllers/account.js'
import AddressController from './app/controllers/address.js'
import WishController from './app/controllers/wish.js'
import PermissionController from './app/controllers/permission.js'
import PermissionsController from './app/controllers/permissions.js'

const routes = new Router()

routes.route('/sessions').post(validation(validationSession.sessionCreate), SessionController.create)

routes.use(auth)

routes.route('/permission/search/forprofile').post(validation(validationPermission.permissionSearchForProfile), PermissionController.searchForProfile)
routes.route('/permissions/search/:perfil').get(validation(validationPermissions.permissionsSearch), PermissionsController.search)
routes.route('/users/search/:page/:limit').post(is(['VIEW_USERS']), validation(validationUser.userSearch), UserController.search)
routes.route('/profiles/search/:page/:limit').post(is(['VIEW_PROFILES']), validation(validationProfile.profileSearch), ProfileController.search)
routes.route('/permission/search/:page/:limit').post(is(['VIEW_PERMISSION']), validation(validationPermission.permissionSearch), PermissionController.search)
routes.route('/categories/search/:page/:limit').post(is(['VIEW_CATEGORIES']), validation(validationCategory.categorySearch), CategoryController.search)
routes.route('/products/search/:page/:limit').post(is(['VIEW_PRODUCTS']), validation(validationProduct.productSearch), ProductController.search)
routes.route('/providers/search/:page/:limit').post(is(['VIEW_PROVIDERS']), validation(validationProvider.providerSearch), ProviderController.search)
routes.route('/clients/search/:page/:limit').post(is(['VIEW_CLIENTS']), validation(validationClient.clientSearch), ClientController.search)
routes.route('/accounts/search/:page/:limit').post(is(['VIEW_ACCOUNTS']), validation(validationAccount.accountSearch), AccountController.search)
routes.route('/address/search/:page/:limit').post(is(['VIEW_ADDRESS']), validation(validationAddress.addressSearch), AddressController.search)
routes.route('/wishs/search/:page/:limit').post(is(['VIEW_WISHS']), validation(validationWish.wishSearch), WishController.search)

routes.use(audit)

routes.route('/users').post(is(['CREATE_USERS']), validation(validationUser.userCreate), UserController.create)
routes.route('/users').put(is(['EDIT_USERS']), validation(validationUser.userUpdate), UserController.update)
routes.route('/users').delete(is(['DELETE_USERS']), validation(validationUser.userDelete), UserController.remove)

routes.route('/profiles').post(is(['CREATE_PROFILES']), validation(validationProfile.profileCreate), ProfileController.create)
routes.route('/profiles').put(is(['EDIT_PROFILES']), validation(validationProfile.profileUpdate), ProfileController.update)
routes.route('/profiles').delete(is(['DELETE_PROFILES']), validation(validationProfile.profileDelete), ProfileController.remove)

routes.route('/products').post(is(['CREATE_PRODUCTS']), validation(validationProduct.productCreate), ProductController.create)
routes.route('/products').put(is(['EDIT_PRODUCTS']), validation(validationProduct.productUpdate), ProductController.update)
routes.route('/products').delete(is(['DELETE_PRODUCTS']), validation(validationProduct.productDelete), ProductController.remove)

routes.route('/categories').post(is(['CREATE_CATEGORIES']), validation(validationCategory.categoryCreate), CategoryController.create)
routes.route('/categories').put(is(['EDIT_CATEGORIES']), validation(validationCategory.categoryUpdate), CategoryController.update)
routes.route('/categories').delete(is(['DELETE_CATEGORIES']), validation(validationCategory.categoryDelete), CategoryController.remove)

routes.route('/providers').post(is(['CREATE_PROVIDERS']), validation(validationProvider.providerCreate), ProviderController.create)
routes.route('/providers').put(is(['EDIT_PROVIDERS']), validation(validationProvider.providerUpdate), ProviderController.update)
routes.route('/providers').delete(is(['DELETE_PROVIDERS']), validation(validationProvider.providerDelete), ProviderController.remove)

routes.route('/clients').post(is(['CREATE_CLIENTS']), validation(validationClient.clientCreate), ClientController.create)
routes.route('/clients').put(is(['CREATE_CLIENTS']), validation(validationClient.clientUpdate), ClientController.update)
routes.route('/clients').delete(is(['CREATE_CLIENTS']), validation(validationClient.clientDelete), ClientController.remove)

routes.route('/accounts/searchOne').post(is(['VIEW_ACCOUNTS']), validation(validationAccount.accountSearchOne), AccountController.searchOne)

routes.route('/address').put(is(['EDIT_ADDRESS']), validation(validationAddress.addressUpdate), AddressController.update)
routes.route('/address/searchOne').post(is(['VIEW_ADDRESS']), validation(validationAddress.addressSearchOne), AddressController.searchOne)

routes.route('/wishs').post(is(['CREATE_WISHS']), validation(validationWish.wishCreate), WishController.create)
routes.route('/wishs').put(is(['EDIT_WISHS']), validation(validationWish.wishUpdate), WishController.update)
routes.route('/wishs').delete(is(['DELETE_WISHS']), validation(validationWish.wishDelete), WishController.remove)

routes.route('/permission').post(is(['CREATE_PERMISSION']), validation(validationPermission.permissionCreate), PermissionController.create)
routes.route('/permission').put(is(['EDIT_PERMISSION']), validation(validationPermission.permissionUpdate), PermissionController.update)
routes.route('/permission').delete(is(['DELETE_PERMISSION']), validation(validationPermission.permissionDelete), PermissionController.remove)

routes.route('/permissions').post(is(['CREATE_PERMISSIONS']), validation(validationPermissions.permissionsCreate), PermissionsController.create)
routes.route('/permissions').delete(is(['DELETE_PERMISSIONS']), validation(validationPermissions.permissionsDelete), PermissionsController.remove)

export default routes
